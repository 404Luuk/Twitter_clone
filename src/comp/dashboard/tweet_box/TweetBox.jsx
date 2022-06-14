import React, {useState} from "react";
import { getAuth } from "firebase/auth";
import { db, getUserDetails } from "../../../firebase_config";
import { addDoc, collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";

const TweetBox = ({getTweets}) => {

   const dbRef = collection(db, 'tweets');
   // const userRef = collection(db, "users"); 

   const [tweet, setTweet] = useState('');
   const user = getAuth().currentUser;

   const HandleSubmit = (e) => {
      e.preventDefault();

      if(user != null) {
         if(tweet !== "") {
            Create();
            setTweet("");
            getTweets();
         }
         else {alert("msg cannot be NULL");}
      }else {alert("user cannot be NULL");}
   }

   const Create = async() => {  
      const username = user.email.split('@');

      try {

         //getUserdetails();

      }catch (e) {
         console.log(e);
         alert(e.message);
      }
   
      
      
      try {
         const time = new Date();
         await addDoc(dbRef, {
            message: tweet,
            tweet_uid: user.uid,
            tweet_user: username[0],
            created_at: time,
         });
         
      }
      catch(e) {
         alert(e.message);
         console.error(e);
      }
   }

   useEffect(()=> {
      getUserDetails("nDIuQI94i5gGvEohEbVtrFhNplR2");
   }, [])


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