import React , {useState} from "react";
import { sendPassReset } from "../../firebase_config";

const Reset = () => {

   const [email, setEmail] = useState("");


   const Reset = (e) => {
      e.preventDefault();

      sendPassReset(email)
   }

   return (
      <>
      <form onSubmit={(e)=>Reset(e)}>
         <input 
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
         />
         <button type="submit">Send reset link</button>
      </form>
      </>
   )
}

export default Reset;