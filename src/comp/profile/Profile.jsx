import React, {useEffect, useState} from "react";
import { upload } from "../../firebase_config";
import { getAuth } from "firebase/auth";
import "./Profile.scss";

const Profile = () => {

   const currentUser = getAuth().currentUser;
   const [photo, setPhoto] = useState(null);
   const [loading, setLoading] = useState(false);
   const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
 
   function handleChange(e) {
     if (e.target.files[0]) {
       setPhoto(e.target.files[0])
     }
   }
 
   function handleClick() {
     upload(photo, currentUser, setLoading);
   }
 
   useEffect(() => {
     if (currentUser?.photoURL) {
       setPhotoURL(currentUser.photoURL);
     }
   }, [currentUser])
 
   return (
     <div className="container">
      <div className="profile"> <br />
         <input type="file" onChange={handleChange} />
         <button disabled={loading || !photo} onClick={handleClick}>Upload</button> <br /><br />
         <img src={photoURL} alt="Avatar" className="avatar" />
       </div>
     </div>
   );
}


export default Profile;