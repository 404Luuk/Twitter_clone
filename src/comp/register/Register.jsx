import React , { useState } from "react";
import {collection ,addDoc } from 'firebase/firestore'
import {db} from "../../firebase_config";
import "./Register.css";

const Register = () => {

   const [userName, setUsername] = useState('');

   const [userPass, setUserPass] = useState('');
   const [confirmPass, setConfirmPass] = useState('');

   const [error, setError] = useState('');

   const dbRef = collection(db, 'users');

   const ValidatePass = () => {
      let isValid = true;
      if(userPass !== "" && confirmPass !== "")
      {
         if(userPass !== confirmPass)
         {
            isValid = false;
            setError("Passwords do not match.");
         }
      }
      return isValid;
   }

   const RegisterUser = async (e) => {
      e.preventDefault();

      if(ValidatePass())  // TODO: finnish register;
      {
         let date = Date.now();
         try {
            await addDoc(dbRef, 
               {
                  signUpDate: date,
                  userData: {
                     username: userName,
                     password: userPass,
                  }
               })
            console.log('user created')   
         }
         catch (e) {
            console.log(e);
         }
      }
      
   }

   return (
      <div className="register_panel">
         <form className="register_form" onSubmit={(e)=>RegisterUser(e)}>
            <input 
               placeholder="Enter username"
               value={userName}
               onChange={(e)=>setUsername(e.target.value)}
            /> <br /><br />
            <input 
               placeholder="Enter password"
               value={userPass}
               onChange={(e)=>setUserPass(e.target.value)}
            /><br /><br />
            <input 
               placeholder="Confirm password"
               value={confirmPass}
               onChange={(e)=>setConfirmPass(e.target.value)}
            /><br /><br />
            <button type="submit"> Register </button>
         </form>
      </div>
   );

}

export default Register;