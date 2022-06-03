import { initializeApp } from "firebase/app";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyAn8D3rt6wdG5y9QomJ6-VVDirLqzB6pM4",
  authDomain: "hiking-api-e24fe.firebaseapp.com",
  projectId: "hiking-api-e24fe",
  storageBucket: "hiking-api-e24fe.appspot.com",
  messagingSenderId: "209960477137",
  appId: "1:209960477137:web:38e88624e02c1caf89c0f0",
  measurementId: "G-N1H0JB4CD2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const dbRef = collection(db, "users");
const googleProvider = new GoogleAuthProvider();


// FIREBASE AUTH FUNCTIONS BELOW //

const signInWithGoogle = async () => {
   try {
      //open google signin window
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const q = query(dbRef, where("uid", "==", user.uid));
      const docs = await getDocs(q);

      //create new google user if uid doenst exist
      if(docs.docs.length === 0) 
      {
         let date = new Date();
         await addDoc(dbRef, {
            signUpDate: date,
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email,
         });
      }
      
   } catch(err) {
      console.log(err);
      alert(err.message);
   }
}

const logInEmailPassword = async (email, password) => {
   try {
      //Try login with credentials
      await signInWithEmailAndPassword(auth, email, password);
   } catch(err) {
      console.log(err);
      alert(err.message);
   }
}

const registerEmailPassword = async (name, email, password) => {
   try {
      //creates new user & adds info to doc
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      let date = new Date();
      await addDoc(dbRef, {
         signUpDate: date,
         uid: user.uid,
         name,
         authProvider: "local",
         email,
      });
      
   } catch(err) {
      console.log(err);
      alert(err.message);
   }
}

const sendPassReset = async (email) => {
   try {
      await sendPasswordResetEmail(email);
      alert("If email exists link has been sent");
   } catch(err) {
      alert(err.message);
      console.error(err);
   }
}

const logOut = () => {
   signOut(auth);
}


export {
   auth,
   db,
   signInWithGoogle,
   logInEmailPassword,
   registerEmailPassword,
   sendPassReset,
   logOut,
};