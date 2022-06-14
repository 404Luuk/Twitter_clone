import React, { useState } from "react";
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
//   const [user, loading, error] = useAuthState(auth);
  const nav = useNavigate();
//   const history = useHistory();
  
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
      registerEmailPassword(name, email, password)
      .then(() => {
         logInEmailPassword(email, password);
         nav('/');
      })  
   }
   else {alert("password does not match");}
    
  };
  
  
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
