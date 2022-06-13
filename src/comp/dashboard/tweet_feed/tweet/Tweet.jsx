import React, {useState} from "react";

const Tweet = (tweet) => {


   return (
      <div className="tweet" key={tweet.id}> 
      <strong>{tweet.tweet_user}</strong>
      <p>{tweet.message}</p>
      </div>
   );
}

export default Tweet;