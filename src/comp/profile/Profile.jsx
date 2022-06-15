import React, {useState} from "react";
import { upload } from "../../firebase_config";

const Profile = () => {

    const user = useAuth().currentUser;
    const [photoURL, setPhotoURL] = useState("https://firebasestorage.googleapis.com/v0/b/twitter-clone-5b244.appspot.com/o/images%2F45km-auto-Canta-LX1.jpg?alt=media&token=26e0c4df-ac13-4f7e-a03b-4fd88c1694f3");

    const handleChange = (e) => {
        e.target.files[0];

        
    }

    return (
        <></>
    )
}


export default Profile;