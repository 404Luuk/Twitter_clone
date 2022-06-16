import { Outlet , Link } from "react-router-dom";
import { auth, logOut } from "../../firebase_config";
import { getAuth, Auth } from "firebase/auth";
import { useAuthState} from "react-firebase-hooks/auth";
import './Layout.scss'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Layout = () => {

   const nav = useNavigate();

   const [user] = useAuthState(auth);

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
            <h1>Cursed_twitter</h1>

            <div className="auth_tab">
               { user ? (
                  <>
                     <button><Link to="profile">Edit profile</Link></button>
                     <button onClick={()=>SignOut()}>Sign out</button>
                  </>
               ):(
                  <>
                     <button><Link to="register">Register</Link></button> 
                     <button><Link to="login">Login</Link></button>
                  </>
               )}
            </div>

            <div className="cur_user">
               { user ? (
                  <>
                  <div className="user_data">
                     <strong>{user.displayName}</strong> <br />
                     <span>{user.email}</span>
                  </div>
                  <div className="user_img">
                     <img src={user.photoURL} alt="user_img" />
                  </div>
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