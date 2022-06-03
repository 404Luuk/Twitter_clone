import React, {useEffect, useState} from "react";
import { db } from "../../../firebase_config";
import { getDocs, collection } from "firebase/firestore";

const TweetFeed = () => {

   const tweetRef = collection(db, "tweets");
   const [Tweets, setTweets] = useState([]);


   const getTweets = async () => {
      try {
         const tweetCollection = await getDocs(tweetRef);
         console.log(tweetCollection);
         setTweets(tweetCollection.docs.map((doc)=>({ ...doc.data(), id: doc.id})));
      }
      catch(e) {
         alert(e.message);
         console.error(e);
      }
   }


   useEffect(()=> {
      getTweets();
   },[])


   return (

      Tweets?.map((tweet)=>{
         return (
            <div className="tweet" key={tweet.id}>
               <strong>{tweet.tweet_uid}</strong>
               <p>{tweet.message}</p>
            </div>
         )
      })
   )
}

export default TweetFeed;