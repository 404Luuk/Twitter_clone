import React, {useState} from "react";
import { getAuth } from "firebase/auth";
import { db, getUserDetails } from "../../../firebase_config";
import { addDoc, collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard";

const TweetBox = () => {

   const dbRef = collection(db, 'tweets');
   const userRef = collection(db, "users"); 

   const [tweet, setTweet] = useState('');
   
   const user = getAuth().currentUser;

   const HandleSubmit = (e) => {
      console.log("handle submit");
      e.preventDefault();

      if(user != null) {
         if(tweet != "") {
            Create();
            setTweet("");
         }
         else {alert("msg cannot be NULL");}
      }else {alert("user cannot be NULL");}
   }

   const Create = async() => {  
          
      try {
         const time = new Date();
         await addDoc(dbRef, {
            message: tweet,
            tweet_uid: user.uid,
            // tweet_user: getUserDetails(user.uid),
            created_at: time,
         });
         
      }
      catch(e) {
         alert(e.message);
         console.error(e);
      }
   }


   return (
      <div className="tweet_box">
         <form onSubmit={(e)=>HandleSubmit(e)} >
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