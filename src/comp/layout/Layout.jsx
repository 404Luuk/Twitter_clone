import { Outlet , Link } from "react-router-dom";
import { logOut } from "../../firebase_config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './Layout.scss'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled , {css}from "styled-components";

const Layout = () => {

   const nav = useNavigate();
   const user = getAuth().currentUser;

   const Button = styled.button`
      padding: 10px 8px;
      border 1px solid black;
      background-color: rgb(0,0,0,00);
      font-size: 18px;
      text-decoration: none;
   `

   const SignOut = () => {

      logOut();  
      nav('/');
   }
 
   return (
      <>
         <nav>
            <h1>Twitter_clone</h1>
            
            <div className="auth_tab">
               { user ? (
                  <>
                     <Button onClick={()=>SignOut()}>Sign out</Button>
                  </>
               ):(
                  <>
                     <Button><Link to="register">Register</Link></Button>
                     <Button><Link to="login">Login</Link></Button>
                  </>
               )}
            </div>

            <div className="cur_user">
               { user ? (
                  <>
                    <span>Loggedin as:<br/> <strong>{user.email}</strong></span><br />
                  </>
               ):(<strong>Not logged in</strong>)}
            </div>
         </nav>


         <Outlet />

         <footer>
            <p>Hiking app by Luuk</p>
         </footer>
      </>
   )
}

export default Layout;