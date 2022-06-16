import React, {useEffect, useState} from "react";
import { upload } from "../../firebase_config";
import { getAuth, updateProfile } from "firebase/auth";
import "./Profile.scss";
import { useNavigate, useNavigationType } from "react-router-dom";

const Profile = () => {

   const currentUser = getAuth().currentUser;
   const [photo, setPhoto] = useState(null);
   const [loading, setLoading] = useState(false);
   const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
 
   const nav = useNavigate();
   const [name, setName] = useState(currentUser?.displayName);

   const handleChange = (e) => {
     if (e.target.files[0]) {
       setPhoto(e.target.files[0])
     }
   }
 
   const handleClick = () => {
     upload(photo, currentUser, setLoading);
   }

   const updateName = async () => {
    if(!loading) {
      await updateProfile(currentUser, {displayName: name});
      nav("/profile");
    }
   }

   const toHome = () => {
    nav("/")
   }
 
   useEffect(() => {
     if (currentUser?.photoURL) {
       setPhotoURL(currentUser.photoURL);
     }
   }, [currentUser])
 
   return (
    <>
     <button className="return_btn" onClick={toHome}> Return</button>
     <div className="container">
      <div className="profile"> <br />
        <strong>Edit details</strong> <br /><br />
          <input
           type="text"
           value={name}
           onChange={(e)=>setName(e.target.value) }
          /> <br /><br />
          <button disabled={loading || name == currentUser?.displayName} onClick={updateName}>Change</button> <br /><br />
      </div>
      <div className="profile"> <br />
        <strong>Edit image</strong> <br /> <br />
            <input type="file" onChange={handleChange} />
            <button disabled={loading || !photo} onClick={handleClick}>Upload</button> <br /><br />
        <div className="img_preview">
            <img src={photoURL} alt="Avatar" className="avatar" />
        </div>
       </div>
     </div>
     </>
   );
}


export default Profile;