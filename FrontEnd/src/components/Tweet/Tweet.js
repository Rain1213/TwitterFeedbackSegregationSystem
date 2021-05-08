import React from "react";
import TweetEmbed from 'react-tweet-embed'
import "./Tweet.css";

const Tweet = ({ url }) => {
  return (
    // <blockquote className="twitter-tweet" data-lang="en">
    //   <a href={url}>exe</a>
    // </blockquote>
    <TweetEmbed className="twitter-tweet" id={url.split("/")[5]} />
  );
};

export default Tweet;
