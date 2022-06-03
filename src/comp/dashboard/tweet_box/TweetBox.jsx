import React, {useState} from "react";
import { getAuth } from "firebase/auth";
import { db } from "../../../firebase_config";
import { addDoc, collection } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TweetBox = () => {

   const dbRef = collection(db, 'tweets');
   const [tweet, setTweet] = useState('');
   const auth = getAuth();
   const user = auth.currentUser;
   const nav = useNavigate();

   const Create = async(e) => {
      e.preventDefault();
      if(user !== null) {
         if(tweet !== '') {
            try {
               const time = new Date();
               await addDoc(dbRef, {
                  message: tweet,
                  tweet_uid: user.uid ,
                  created_at: time,
               });
               nav('/');
            }
            catch(e) {
               alert(e.message);
               console.error(e);
            }
         }
         else { alert('message cannot be NULL') }
         }
      else { alert('You need to be logged in'); }
   }


   return (
      <div className="tweet_box">
         <form onSubmit={(e)=>Create(e)} >
            <label htmlFor="tweet">Whats on your mind?</label> <br />
            <input
               id="tweet"
               type="text"
               value={tweet}
               onChange={(e)=>setTweet(e.target.value)}
               required
            />
            <button type="submit">Tweet!</button> 
         </form>
      </div>
   )
}

export default TweetBox;