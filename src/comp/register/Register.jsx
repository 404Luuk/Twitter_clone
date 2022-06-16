import { upload } from "@testing-library/user-event/dist/upload";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInEmailPassword,
  registerEmailPassword,
  signInWithGoogle,
} from "../../firebase_config";
import "./Register.scss";

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  
  const ValidatePass = () => {
   let isValid = true;
   if(password !== "" && confirm !== "")
   {
      if(password !== confirm)
      {
         isValid = false;
      }
   }
   return isValid;
   }

  const register = () => {
   if(ValidatePass()) 
   {
      if (!name) alert("Please enter name");
      registerEmailPassword(name, email, password, photo, setLoading)
      .then(() => {
          logInEmailPassword(email, password);
          nav('/');
      })  
   }
   else {alert("password does not match");}
    
  };
  
  useEffect(()=> {
    console.log(photo);
  }, [photo])
  
  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
         type="password"
         className="register__textBox"
         value={confirm}
         onChange={(e) => setConfirm(e.target.value)}
         placeholder="confirm password"
        />
        <span>Upload profile image</span> <br />
        <input 
          type="file" 
          className="register_textBox"
          onChange={(e) => setPhoto(e.target.files[0])}
        /> <br />
        <button className="register__btn" onClick={register}>
          Register
        </button>

        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}>
          Register with Google
        </button>

        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;
