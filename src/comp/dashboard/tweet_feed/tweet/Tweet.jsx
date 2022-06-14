import React from "react";
import { useEffect } from "react";

const Tweet = (tweet) => {
   
   return (
      <div className="tweet" key={tweet.id}> 
      <strong>{tweet.tweet.tweet_user}</strong>
      <p>{tweet.tweet.message}</p>
      </div>
   );
}

export default Tweet;