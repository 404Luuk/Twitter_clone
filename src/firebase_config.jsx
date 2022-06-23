import { initializeApp } from "firebase/app";
import { getFirestore, query, getDocs, collection, where, addDoc, getDoc , doc} from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyCEKWjmNkv75rIVWxCxNl0KK_rdvvpmogY",
   authDomain: "twitter-clone-5b244.firebaseapp.com",
   projectId: "twitter-clone-5b244",
   storageBucket: "twitter-clone-5b244.appspot.com",
   messagingSenderId: "281041947016",
   appId: "1:281041947016:web:ae824f0df50cc040ed523d",
   measurementId: "G-3C9SRHEZRX"
};
 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage()

const dbRef = collection(db, "users");
const googleProvider = new GoogleAuthProvider();


// FIREBASE AUTH FUNCTIONS BELOW //

//Login with google, if user is null, create new record and user
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
            displayName: user.displayName,
            authProvider: "google",
            email: user.email,
         });
      }
      
   } catch(err) {
      console.log(err);
      alert(err.message);
   }
}

//Login with email, pass
const logInEmailPassword = async (email, password) => {
   try {
      //Try login with credentials
      await signInWithEmailAndPassword(auth, email, password);

   } catch(err) {
      console.log(err);
      alert(err.message);
   }
}

//register with email, pass && add user_img
const registerEmailPassword = async (name, email, password, photo, setLoading) => {
   try {
      //creates new user & adds info to doc
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      
      await upload(photo, user, setLoading);

      let date = new Date();

      await addDoc(dbRef, {
         signUpDate: date,
         uid: user.uid,
         displayName: name,
         authProvider: "local",
         email,
      }).then(()=> {
         updateProfile(user, {
            displayName: name,
         })
      })
      
   } catch(err) {
      console.log(err);
      alert(err.message);
   }
}

//send reset link to email
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

// STORAGE //

//upload user_img to fireStore && update user auth obj
const upload = async(file, currentUser, setLoading) => {

   const fileRef = ref(storage , "images/"+currentUser.uid);
   
   setLoading(true);

   await uploadBytes(fileRef, file);
   const photoURL = await getDownloadURL(fileRef);
  
   updateProfile(currentUser, {photoURL})

   setLoading(false);
}

export {
   auth,
   db,
   signInWithGoogle,
   logInEmailPassword,
   registerEmailPassword,
   sendPassReset,
   logOut,
   upload,
};