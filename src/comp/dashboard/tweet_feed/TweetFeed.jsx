import React from "react";
import Tweet from "./tweet/Tweet";
import './Tweet_feed.scss'


const TweetFeed = ({Tweets}) => {

   return (

      <div className="tweet_feed">

         {Tweets?.map((tweet)=>{

            return (
               <Tweet tweet={tweet} key={tweet.id}/>
            )

         })}

      </div>
   )
}

export default TweetFeed;