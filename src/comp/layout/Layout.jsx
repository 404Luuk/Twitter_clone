import { Outlet , Link } from "react-router-dom";
import { auth, logOut } from "../../firebase_config";
import { getAuth, Auth } from "firebase/auth";
import { useAuthState} from "react-firebase-hooks/auth";
import './Layout.scss'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled , {css}from "styled-components";

const Layout = () => {

   const nav = useNavigate();

   const [user] = useAuthState(auth);

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

   useEffect(()=> {
      if(!user) {
         nav("/login");
      }
   },[user])
 
   return (
      <>
         <nav>
            <h1>Cursed_Twitter</h1>
            
            <div className="auth_tab">
               { user ? (
                  <>
                     <Button onClick={()=>SignOut()}>Sign out</Button>
                  </>
               ):(
                  <>
                     <Button><Link to="register">Register</Link></Button> <span></span>
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
            <p>Twitter_clone by Luuk</p>
         </footer>
      </>
   )
}

export default Layout;