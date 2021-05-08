import eventlet
eventlet.monkey_patch()

from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
from eventlet.wsgi import server as Server
from shutil import rmtree, make_archive
from tweepy import OAuthHandler, API, Cursor, TweepError, RateLimitError
from textblob import TextBlob
from datetime import datetime
from math import isnan
import pandas as pd
import time
import os
import re
import json
import keys_token as key
# from geopy.geocoders import Nominatim
# import pycountry as pyc

# Initializing Flask and Socket-IO server
app = Flask(__name__)
sio = SocketIO(app, async_mode='eventlet', allow_upgrades=False, ping_interval=1800, ping_terminate=300, cors_allowed_origins=['http://localhost:3000', 'http://localhost:3001'])

class SentimentAnalysis:
    # static values for tweepy authentication
    tweepy_auth = OAuthHandler(key.CONSUMER_KEY, key.CONSUMER_SECRET_KEY)
    tweepy_auth.set_access_token(key.ACCESS_TOKEN, key.ACCESS_SECRET_TOKEN)
    tweepy_api = API(tweepy_auth, wait_on_rate_limit=False, wait_on_rate_limit_notify=False)

    # initializing instance variables
    def __init__(self, session_id):
        self.session_id = session_id
        self.polarity = {
            'positive': 0,
            'negative': 0,
            'neutral': 0
        }
        self.search_key = ''
        self.tweet_count = 0
        # self.geolocator =  Nominatim(user_agent='sentimental_analysis')
    
    # https://stackoverflow.com/questions/4770297/convert-utc-datetime-string-to-local-datetime
    # Converts date from utc to local zone
    def datetime_from_utc_to_local(self, utc_datetime):
        now_timestamp = time.time()
        offset = datetime.fromtimestamp(now_timestamp) - datetime.utcfromtimestamp(
            now_timestamp)
        return utc_datetime + offset
    
    # Create directories, later used for creating zip
    def create_directories(self):
        os.mkdir(f'./{self.session_id}')
        os.mkdir(f'./{self.session_id}/images')
        os.mkdir(f'./{self.session_id}/images/top_users')
        os.mkdir(f'./{self.session_id}/images/trends')
    
    # Save files, delete dir & create zip in archive dir
    def save_files(self, df):
        df = df.sort_values(by=['like_count', 'retweet_count', 'followers_count'], ascending=False)
        df.to_csv(path_or_buf=f'./{self.session_id}/{self.search_key}.csv')

        screen_name_df = pd.DataFrame(columns=['screen_name', 'no. of tweets'])
        screen_name_df = df['screen_name'].value_counts().rename_axis('screen_name').to_frame(name='no. of tweets')
        
        top_10_freq_users = screen_name_df.head(10)
        tweet_trend_df = df['tweet_date'].value_counts().rename_axis('date').to_frame(name='count').sort_values(by='date')
        
        screen_name_df.to_csv(path_or_buf=f'./{self.session_id}/screen_name_freq.csv')
        top_10_freq_users.plot(kind='pie', figsize=(30, 20), fontsize=26, y='no. of tweets').get_figure().savefig(f'./{self.session_id}/images/top_users/no_of_tweets.jpg')
        top_10_freq_users.plot(kind='pie', figsize=(30, 20), fontsize=26, y='no. of tweets').get_figure().savefig(f'./{self.session_id}/images/top_users/no_of_tweets.png')
        top_10_freq_users.plot(kind='pie', figsize=(30, 20), fontsize=26, y='no. of tweets').get_figure().savefig(f'./{self.session_id}/images/top_users/no_of_tweets.svg')
        top_10_freq_users.plot(kind='pie', figsize=(30, 20), fontsize=26, y='no. of tweets').get_figure().savefig(f'./{self.session_id}/images/top_users/no_of_tweets.pdf')

        tweet_trend_df.to_csv(path_or_buf=f'./{self.session_id}/trend.csv')
        tweet_trend_df.plot(kind='line', figsize=(70, 50), fontsize=26).get_figure().savefig(f'./{self.session_id}/images/trends/trend.jpg')
        tweet_trend_df.plot(kind='line', figsize=(70, 50), fontsize=26).get_figure().savefig(f'./{self.session_id}/images/trends/trend.png')
        tweet_trend_df.plot(kind='line', figsize=(70, 50), fontsize=26).get_figure().savefig(f'./{self.session_id}/images/trends/trend.svg')
        tweet_trend_df.plot(kind='line', figsize=(70, 50), fontsize=26).get_figure().savefig(f'./{self.session_id}/images/trends/trend.pdf')

        make_archive(base_name=f'./archive/{self.session_id}', format='zip', root_dir=f'./{self.session_id}')
        rmtree(f'./{self.session_id}')

    # Initialize search_key and tweet_count
    def process_requests(self, search_key, number):
        self.search_key = search_key
        self.tweet_count = number
        self.fetch_tweets()
    
    # Clean emoticons
    def emoticon_cleaning(self, text):
        text = text.decode('utf-8')
        regrex_pattern = re.compile(pattern = "["
            u"\U0001F600-\U0001F64F"  # emoticons
            u"\U0001F300-\U0001F5FF"  # symbols & pictographs
            u"\U0001F680-\U0001F6FF"  # transport & map symbols
            u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                            "]+", flags = re.UNICODE)
        cleaned_text = regrex_pattern.sub(r'', text)

        return cleaned_text

    # Text preprocessing (Tweet cleaning)
    def tweet_cleaning(self, text):
        regrex_pattern = re.compile(pattern = "["
            u"\U0001F600-\U0001F64F"  # emoticons
            u"\U0001F300-\U0001F5FF"  # symbols & pictographs
            u"\U0001F680-\U0001F6FF"  # transport & map symbols
            u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                            "]+", flags = re.UNICODE)
        clean_tweet = text.decode('utf-8')
        clean_tweet = re.sub(r'^RT[\s]+','', clean_tweet)
        clean_tweet = re.sub(r'https?:\/\/.*[\r\n]*', '', clean_tweet)
        clean_tweet = re.sub(r'#', '', clean_tweet)
        clean_tweet = re.sub(r'@[A-Za-z0–9]+', '', clean_tweet)
        clean_tweet = regrex_pattern.sub(r'', clean_tweet)
        clean_tweet = re.sub('\n',' ', clean_tweet)

        return clean_tweet

    # Decimal scaling of like and retweet count
    def scaling(self, arr):
        max_value = max(arr)
        j = len(str(max_value))
        
        normalized_like = arr[0] / 10 ** j
        normalized_retweet = arr[1] / 10 ** j

        return normalized_like, normalized_retweet

    # Calculate polarity score
    def calc_polarity(self, data):
        text = data['text'].encode('utf-8')
        like_count = data['like_count']
        retweet_count = data['retweet_count']

        clean_tweet = self.tweet_cleaning(text)
        like_count_normalized, retweet_count_normalized = self.scaling([like_count, retweet_count])

        polarity = ''
        polarity_score = round(1 + like_count_normalized + retweet_count_normalized, 2)
        analysis = TextBlob(clean_tweet)
        if(analysis.sentiment.polarity == 0):
            self.polarity['neutral'] += polarity_score
            polarity = 'neutral'
        elif(analysis.sentiment.polarity < 0):
            self.polarity['negative'] += polarity_score
            polarity = 'negative'
        elif(analysis.sentiment.polarity > 0):
            self.polarity['positive'] += polarity_score
            polarity = 'positive'

        return polarity, polarity_score
    
    # Send tweet infos back to client
    def send_response(self, tweet):
        data = {
            'header': {
                'type': 'GET_TWEETS'
            },
            'body': {
                'tweet': tweet,
                'total_polarity': self.polarity 
            }
        }
        emit('response', json.dumps(data), to=self.session_id)
        # sio.sleep(0)

    # def get_country_code(self, location):
    #     if location == None:
    #         return None
        
    #     location = self.geolocator.geocode(location, language='en')
    #     if location == None:
    #         return None
            
    #     location = str(location)
    #     places_arr = location.split(',')
    #     country_name = places_arr[len(places_arr) - 1]
    #     country_code = pyc.countries.get(name=country_name)

    #     if country_code == None:
    #         return country_code

    #     return country_code.alpha_2

    # Fetch tweets, Send response & save zip
    def fetch_tweets(self):
        cursor = Cursor(SentimentAnalysis.tweepy_api.search, q=f'#{self.search_key} -filter:retweets',
                    count=100, tweet_mode='extended', lang='en').items(self.tweet_count)

        df = pd.DataFrame()

        i = 1
        while True:
            print(f'Running... {i}\r', end='')
            try:
                tweet = cursor.next()
                row = {
                    'id': i,
                    'tweet_id': tweet.id,
                    'screen_name': tweet.user.screen_name,
                    'name': tweet.user.name,
                    'tweet_date': str(self.datetime_from_utc_to_local(tweet.created_at)),
                    'location': self.emoticon_cleaning(tweet.user.location.encode('utf-8')),
                    # 'country_code': self.get_country_code(tweet.user.location.split(',')[0]),
                    'retweet_count': tweet.retweet_count,
                    'like_count': tweet.favorite_count,
                    'followers_count': tweet.user.followers_count,
                    'following_count': tweet.user.friends_count,
                    'text': tweet.full_text or tweet.text,
                    'embed_url': f'https://twitter.com/{tweet.user.screen_name}/status/{tweet.id}'
                }
                if tweet.place != None:
                    row['country_code'] = tweet.place.country_code
                polarity, polarity_score = self.calc_polarity(row)
                row['polarity'], row['polarity_score'] = polarity, polarity_score
                new_rows = pd.DataFrame([row], index=[i])
                df = pd.concat([df, new_rows])
                self.send_response(row)
            except TweepError:
                break
            except RateLimitError:
                break
            except StopIteration:
                break
            i = i + 1
        
        print('\nCompleted')
        self.create_directories()
        self.save_files(df)

# sio = socketio.Server(async_mode='eventlet', allow_upgrades=False, ping_interval=1800, ping_terminate=300, cors_allowed_origins=['http://localhost:3000', 'http://localhost:3001'], )
# app = socketio.WSGIApp(sio)

# Connect hanndler for socket
@sio.on('connect')
def connect():
    print(request.sid, 'CONNECTED')
    data = {
        'header': {
            'type': 'GET_SESSION'
        },
        'body': {
            'session_id': request.sid
        }
    }
    emit('response', json.dumps(data), to=request.sid)

# Disconnect hanndler for socket
@sio.on('disconnect')
def disconnect():
    print(request.sid, 'DISCONNECTED')
    os.remove(f'./archive/{request.sid}.zip')

# Request hanndler for socket
@sio.on('request') 
def request_func(data):
    data = json.loads(data)
    if data['header']['type'] == 'GET':
        search_key, tweet_count = data['body']['search_key'], data['body']['tweet_count']
        if not isnan(tweet_count) and tweet_count >= 200 and tweet_count <= 2000:
            senti_analysis = SentimentAnalysis(request.sid)
            senti_analysis.process_requests(search_key, tweet_count)
        else:
            data = {
                'header': {
                    'type': 'ERROR_INVALID_TWEET_COUNT',
                    'message': 'Error: Can\'t request less than 200 and more than 2000 tweets' 
                }
            }
            emit('response', json.dumps(data), to=request.sid)

if __name__ == '__main__':    
    # app = sio.Middleware(sio, app)
    # Start server
    Server(eventlet.listen(('localhost', 8000)), app)