import React, {useEffect, useState} from "react";
import { db } from "../../../firebase_config";
import { getDocs, collection, where, query, getDoc } from "firebase/firestore";
import { auth } from "../../../firebase_config";
import Tweet from "./tweet/Tweet";
import './Tweet_feed.scss'


const TweetFeed = ({Tweets}) => {

   const tweetRef = collection(db, "tweets");
   const userRef  = collection(db, "users");

   // const [Tweets, setTweets] = useState([]);


   // const getTweets = async () => {
   //    try {
   //       const tweetCollection = await getDocs(tweetRef);
   //       setTweets(tweetCollection.docs.map((doc)=>({ ...doc.data(), id: doc.id})));
   //    }
   //    catch(e) {
   //       alert(e.message);
   //       console.error(e);
   //    }
   // }


   // useEffect(()=> {
   //    getTweets();
   // },[])


   return (

      Tweets?.map((tweet)=>{

         return (
            <Tweet tweet={tweet} />
         )

      })
   )
}

export default TweetFeed;