import React, {useEffect, useState} from "react";

const Tweet = (tweet) => {
   
   return (
      <div className="tweet" key={tweet.id}> 
      <strong>{tweet.tweet.tweet_user}</strong>
      <p>{tweet.tweet.message}</p>
      <span></span>
      </div>
   );
}

export default Tweet;