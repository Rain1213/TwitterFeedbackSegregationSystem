import React, { Component, createRef } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import "./Search.css";
import Input from "../../components/Input/Input";
import Tweet from '../../components/Tweet/Tweet';
import ChartPie from "../../components/Chart/ChartPie";
import ChartLine from "../../components/Chart/ChartLine"
import { MinPriorityQueue } from '@datastructures-js/priority-queue';
import ReactLoading from "react-loading";
import Loader from '../../components/Loader/Loader';
import {countryCodeExists, isEnglish, getCCFromLang, getCCBasic, countryAbbrCount} from './country_codes';
import SearchPageSVG from "../../components/SearchPageSVG/SearchPageSVG";
import Map from '../../components/Map/Map'

const menus = [
  { text: "Home", link: "home" },
  { text: "Search", link: "search" },
  { text: "Team", link: "team" },
];

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ["Positive", "Neutral", "Negative"],
        datasets: [
          {
            label: "Tweets",
            backgroundColor: [
              "rgba(0, 191, 166, 1)",
              "rgba(87, 90, 137, 1)",
              "rgba(63, 61, 86, 1)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
          },
        ],
      },
      chartLineData :['50','20','80','45','90','150','60'],
      chartLineLabel :[],
      tweetInfo: [],
      loading: false,
      positiveTweetsInfo: [],
      negativeTweetsInfo: [],
      polarity: [],
      positive: 0 ,
      negative: 0,
      neutral: 0,
      tweetFetchCount : 0
    };

    this.refers = {
      searchKey: createRef(),
      tweetCount: createRef(),
      searchSVG: createRef(),
      getResult: createRef(),
      showPositiveNegativeTweets: createRef(),
    };

    this.top5PositiveTweets = new MinPriorityQueue();
    this.top5NegativeTweets = new MinPriorityQueue();
    this.countryCodeCount = countryAbbrCount;
    this.tweetCount = 0;
    this.currentDate = new Date();
    this.currentDateString = `${this.currentDate.getDate()}-${this.currentDate.getMonth() + 1}-${this.currentDate.getFullYear()}`;

    this.handleSearch = this.handleSearch.bind(this);
    this.hideSvg= this.hideSvg.bind(this);
    this.showResult= this.showResult.bind(this);
    this.hideResult= this.hideResult.bind(this);
    this.showPositiveNegativeTweets = this.showPositiveNegativeTweets.bind(this);
    this.getResponse = this.getResponse.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.manageHeaps = this.manageHeaps.bind(this);
    // this.getLineChartData = this.getLineChartData.bind(this);
    this.currentWeek = this.currentWeek.bind(this);
    this.getCountryCode = this.getCountryCode.bind(this);
  }

  async getCountryCode(location) {
    let countryCode = await getCCBasic(location);
    if (countryCode !== undefined) return countryCode;

    if (isEnglish(location)) {
      if (location.length === 2 && countryCodeExists(location)) {
        return location;
      }

      try {
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${location.split(',')[0]}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
        const response = await fetch(API);
        const data = await response.json();
        if (data['sys'] !== undefined) {
          countryCode = data['sys']['country'];
          return countryCode;
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    
    countryCode = getCCFromLang(location);
    return countryCode;
  }

  // getLineChartData(date) {
  //   date = new Date(date);
  //   let dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  //   let chartLineData = this.state.chartLineData;
  //   if (dateString === this.currentDateString) {
  //     dateString = `${date.getHours()}:${date.getMinutes()}`;
  //     if (Object.hasOwnProperty(dateString)) {
  //       chartLineData[dateString] += 1;
  //     } else {
  //       chartLineData[dateString] = 1;
  //     }
  //   } else {
  //     dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  //     if (Object.hasOwnProperty(dateString)) {
  //       chartLineData[dateString] += 1;
  //     } else {
  //       chartLineData[dateString] = 1;
  //     }
  //   }
  //   this.setState({chartLineData: chartLineData});
  // }

  currentWeek() {
    for (let i = 6; i >= 0; i--) {
      let curr = new Date();
      let first = curr.getDate() - i 
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
      this.state.chartLineLabel.push(day)
    }
    // console.log(this.state.chartLineLabel);
  }

  handleSearch(event) {
    this.currentWeek();
    this.hideResult();
    this.top5PositiveTweets.clear();
    this.top5NegativeTweets.clear();
    this.tweetCount = 0;
    this.totalTweets = 0;
    this.setState({
      chartLineData: {},
      tweetInfo: [],
      positiveTweetsInfo: [],
      negativeTweetsInfo: [],
      polarity: [],
      positive: 0,
      negative: 0,
      neutral: 0,
    });
    
    if (!this.refers.searchKey.current.value.trim()) {
      alert('Please Enter Keyword/Tag');
      return;
    }

    if (isNaN(this.refers.tweetCount.current.value)) {
      alert('No of tweets can only be number');
      return;
    }

    if (!this.refers.tweetCount.current.value) {
      alert('Please Enter No of Tweets');
      return;
    }

    this.totalTweets = parseInt(this.refers.tweetCount.current.value);
    this.hideSvg(event);
    this.setState({loading: true});
    const data = {
      header: {
        type: "GET",
      },
      body: {
        search_key: this.refers.searchKey.current.value,
        tweet_count: parseInt(this.refers.tweetCount.current.value),
      },
    };

    this.props.clientSocket.sendRequest(data);
  }

  async getResponse(data) {
    let tweetInfo = this.state.tweetInfo;
    let countryCode;
    this.tweetCount = data.body.tweet["id"];
    tweetInfo.push(data);
    // this.getLineChartData(data.body.tweet['tweet_date']);

    if (data.body.tweet['country_code'] === undefined) {
      const location = data.body.tweet['location'].trim();
      if (location !== '' && location !== undefined && location !== null) {
        countryCode = await this.getCountryCode(location);
      }
    } else {
      countryCode = data.body.tweet['country_code'];
    }
    
    if (countryCode !== undefined && countryCode !== '' && this.countryCodeCount.hasOwnProperty(countryCode)) {
      this.countryCodeCount[countryCode] += 1; 
    } else if (countryCode !== undefined && countryCode !== '') {
      this.countryCodeCount[countryCode] = 1;
    }
    
    this.manageHeaps({polarity: data.body.tweet['polarity'], polarityScore: data.body.tweet['polarity_score'], url: data.body.tweet['embed_url']});
    this.getChartData(data.body['total_polarity'], tweetInfo);
    this.setState({loading: false});
    this.showResult();
    this.showPositiveNegativeTweets();
  }

  componentDidMount() {
    this.props.clientSocket.setSearchCallback(this.getResponse);
  }

  manageHeaps({polarity, polarityScore, url}) {
    if (polarity === 'positive') {
      this.top5PositiveTweets.enqueue(url, polarityScore);
      if (this.top5PositiveTweets.size() > 5) {
        this.top5PositiveTweets.dequeue();
      }
    } else if (polarity === 'negative') {
      this.top5NegativeTweets.enqueue(url, polarityScore);
      if (this.top5NegativeTweets.size() > 5) {
        this.top5NegativeTweets.dequeue();
      }
    }
  }

  getChartData(polarity, tweetInfo) {
    const chartData = this.state.chartData;
    const sum = polarity.positive + polarity.neutral + polarity.negative;
    
    polarity = {
      positive: parseFloat(polarity.positive * 1.0 / sum).toFixed(2)  * 100,
      neutral: parseFloat(polarity.neutral * 1.0 / sum).toFixed(2)  * 100 ,
      negative: parseFloat(polarity.negative * 1.0 / sum).toFixed(2)  * 100 ,
    }
    
    this.setState({positive : polarity.positive});
    this.setState({neutral : polarity.neutral});
    this.setState({negative : polarity.negative});
    chartData.datasets[0].data = [polarity.positive, polarity.neutral, polarity.negative];
    this.setState({
      chartData: chartData,
      tweetInfo: tweetInfo
    });
  }

  render() {
    return (
      <>
        <Header menus={menus} />
        <section>
          <div className="row">
            <div className="column left">
              <div className="form-wrapper">
                <form className="form">
                  <Input
                    placeholder="Enter Keyword/Tag to search about"
                    icon="fas fa-search"
                    ref={this.refers.searchKey}
                  />
                  <Input
                    placeholder="Enter how many tweets to search"
                    icon="fas fa-hashtag"
                    ref={this.refers.tweetCount}
                  />
                </form>
              </div>
              <br></br>
              <div className="sensorBtn">
                <Button text="Search" onClick={this.handleSearch}></Button>
              </div>
            </div>
                  
            <div className="column right">
              { this.state.loading ? (
                  <>
                    <Loader/>
                    <ReactLoading className="loading" type={"bars"} color={"#00BFA6"} height={'8%'} width={'8%'} />
                    <div className="tweetFetch"><span className="tweetFetchCount">Tweets Fetched {this.tweetCount}/{this.totalTweets}</span>
                    </div>
                   </>
                  ) : (
                    <>
                    </>
                )
              }
              <SearchPageSVG ref={this.refers.searchSVG} />
                <div className="analysisResult" ref={this.refers.getResult}>
                  <div className="tweetFetch">
                    <span className="tweetFetchCount">Tweets Fetched {this.tweetCount}/{this.totalTweets}
                    </span>
                    <span>
                    {
                      this.tweetCount !== this.totalTweets ? 
                      (
                        <ReactLoading className="loading loadingCount" type={"cubes"} color={"#00BFA6"} height={'5%'} width={'8%'} />
                      ):
                      (
                        <>
                        </>
                      )
                    }
                    </span>
                  </div>
                    <div className="pieData">
                      <div className="pieChart">
                      <ChartPie 
                        chartData={this.state.chartData}
                        location="This Week"
                        legendPosition="bottom"
                      />
                      </div>
                      <div className="piePercentage">
                          <p><span>
                          <i className="fas fa-square positiveSquare"></i>
                            </span>Positive Tweets : {this.state.positive}%</p>
                          <p><span>
                          <i className="fas fa-square neutralSquare"></i>
                            </span>Neutral Tweets : {this.state.neutral}%</p>
                          <p><span>
                          <i className="fas fa-square negativeSquare"></i>
                            </span>Negative Tweets : {this.state.negative}%</p>
                          {

                              this.state.positive > this.state.neutral ?
                              (
                                this.state.positive > this.state.negative ?
                                (
                                  <p className="overallResult">Over all Analysis : 
                                    <span className="overallResultPositive"> Positive </span>
                                  </p>
                                )
                                :
                                (
                                  <p className="overallResult">Over all Analysis : 
                                    <span className="overallResultNegative"> Negative </span>
                                  </p>
                                )
                              )
                              :
                              (
                                this.state.neutral > this.state.negative ?
                                (
                                  <p className="overallResult">Over all Analysis : 
                                    <span className="overallResultNeutral"> Neutral </span>
                                  </p>
                                )
                                :
                                (
                                  <p className="overallResult">Over all Analysis : 
                                    <span className="overallResultNegative"> Negative </span>
                                  </p>
                                )
                              )
                          }
                      </div>
                        <div className="downloadreport">
                          <p>Download Analysis Report : 
                          <a className="reportlink" href={`http://localhost:5000/sentiment_analysis.py`} download='abc.zip'> click here...</a></p>
                        </div>
                    </div>
                    
                  {/* <ChartBar
                    chartData={this.state.chartData}
                    location="This Week"
                    legendPosition="bottom"
                  /> */}
                  <div className="chartLine"  >
                    <ChartLine chartLineData={this.state.chartLineData} chartLineLabel={this.state.chartLineLabel} />
                  </div>
                  
                </div>      
                  
            </div>
          </div>
          <div className="row">
            <div className="showPositiveNegativeTweets" ref={this.refers.showPositiveNegativeTweets}>
                  <p className="mapTweet"><span className="mapTitle">Map</span></p>
                  {
                          this.tweetCount !== this.totalTweets ? 
                          (
                            <ReactLoading className="loading loadingCount" type={"cubes"} color={"#00BFA6"} height={'8%'} width={'8%'} />
                          )
                          :
                          (
                            <Map mapData={this.countryCodeCount}></Map>
                          )
                  }
                  <div className="top5positivetweets">
                      <p className="top5PositiveTitle"><span className="leftborderpositivetitle">Top 5 positive tweets</span></p>
                      <div className="tweet-wrapper">
                      {
                        this.tweetCount !== this.totalTweets ? 
                        (
                          <ReactLoading className="loading" type={"bars"} color={"#00BFA6"} height={'8%'} width={'8%'} />
                        )
                        :
                        (
                          this.top5PositiveTweets.toArray().map((obj,index) => {
                            return <Tweet key={`tweet-${index}`} url={obj.element}/>
                          })
                        )
                      }
                      </div>
                  </div>
                                  
                  <div className="top5negativetweets">
                      <p className="top5NegativeTitle"><span className="leftbordernegativetitle">Top 5 Negative tweets</span></p>
                      <div className="tweet-wrapper">
                      {
                        this.tweetCount !== this.totalTweets ? 
                        (
                          <ReactLoading className="loading" type={"bars"} color={"#00BFA6"} height={'8%'} width={'8%'} />
                        )
                        :
                        (
                          this.top5NegativeTweets.toArray().map((obj,index) => {
                            return <Tweet key={`tweet-${index}`} url={obj.element}/>
                          })
                        )
                      }
                      </div>
                  </div>
                </div>
            </div>
        </section>
      </>
    );
  }

  hideSvg(event) {
    event.stopPropagation();
    this.refers.searchSVG.current.hideSvg();
  }

  showResult() {
    let varShow = this.refers.getResult;
    varShow.current.style.display = "block";
  }

  hideResult() {
    let varHide = this.refers.getResult;
    varHide.current.style.display = "none";
    let varHide2 = this.refers.showPositiveNegativeTweets;
    varHide2.current.style.display = "none";
  }

  showPositiveNegativeTweets() {
    let varShow = this.refers.showPositiveNegativeTweets;
    varShow.current.style.display = "block";
  }
}
