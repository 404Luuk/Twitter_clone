import React , {useState, useEffect} from 'react';
import TweetBox from './tweet_box/TweetBox';
import TweetFeed from './tweet_feed/TweetFeed';
import './Dashboard.scss';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase_config';

const Dashboard = () => {

   const tweetRef = collection(db, "tweets");
   const [tweets, setTweets] = useState([]); 

   const getTweets = async () => {
      try {
         const tweetCollection = await getDocs(tweetRef);
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

      <section>
         <div className="col">
            <div className="row">
               <h2>Welcome to Twitter2.0</h2>
               <TweetBox getTweets={getTweets} />
               <br />
               <TweetFeed Tweets={tweets} />
            </div>
         </div>
      </section>
   
   ); 

}

export default Dashboard;