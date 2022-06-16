import React, {useState} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../firebase_config";
import { addDoc, collection, getDoc, getDocs, query, where, doc } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Tweet_box.scss"

const TweetBox = ({getTweets}) => {

   const dbRef = collection(db, 'tweets');
   const userRef = collection(db, "users"); 

   const [tweet, setTweet] = useState('');
   // const [userRec, setUserRec] = useState([]);

   const [loading, setLoading] = useState(false);
   const auth = getAuth();
   const user = auth.currentUser;

   //Fetch user details when user obj is loaded
   // onAuthStateChanged(auth, (user)=> {
   //    if(user) {
   //       if(userRec.length == 0 ) {
   //          getUserDetails(user.uid);
   //          console.log("Fetched user details");
   //       }
   //    }
   // })

   // const getUserDetails = async(uid) => {
   //    try {
   //       const q = query(userRef, where("uid", "==", uid));
   //       const res = await getDocs(q);
   //       const userDoc = doc(userRef, res.docs[0].id);
   //       const docSnap = await getDoc(userDoc);

   //       setUserRec(docSnap.data());
         
   //    }catch(e) {
   //       console.log(e)
   //    }
   // }

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
      // const username = user.email.split('@');
    
      try {
         const time = new Date();
         await addDoc(dbRef, {
            message: tweet,
            tweet_uid: user.uid,
            tweet_user: user.displayName,
            user_img: user.photoURL,
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
            <strong htmlFor="tweet">Whats on your mind?</strong> <br /> <br />
            <textarea
               id="tweet"
               type=""
               value={tweet}
               onChange={(e)=>setTweet(e.target.value)}
               required
               rows="4" cols="40"
               placeholder="Enter tweet.."
            />  <br /> <br />
            <button type="submit">Tweet!</button> 
         </form>
      </div>
   )
}

export default TweetBox;