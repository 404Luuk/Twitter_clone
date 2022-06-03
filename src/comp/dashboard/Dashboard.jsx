import React , {useState, useEffect} from 'react';
import TweetBox from './tweet_box/TweetBox';
import TweetFeed from './tweet_feed/TweetFeed';
import './Dashboard.scss';

const Dashboard = () => {

   return (

      <section>
         <div className="col">
            <div className="row">
               <h2>Welcome </h2>
               <TweetBox />
               <TweetFeed/>
            </div>
         </div>
      </section>
   
   ); 

}

export default Dashboard;