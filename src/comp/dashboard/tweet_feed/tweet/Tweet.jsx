import React from "react";
import { useEffect } from "react";

const Tweet = (tweet) => {
   
   return (
      <div className="tweet" key={tweet.id}> 
      <div className="user_img">
         <img src={tweet.tweet.user_img} alt="user_img" />
      </div>
      <strong>{tweet.tweet.tweet_user}</strong>
      <p>{tweet.tweet.message}</p>
      </div>
   );
}

export default Tweet;