import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn8D3rt6wdG5y9QomJ6-VVDirLqzB6pM4",
  authDomain: "hiking-api-e24fe.firebaseapp.com",
  projectId: "hiking-api-e24fe",
  storageBucket: "hiking-api-e24fe.appspot.com",
  messagingSenderId: "209960477137",
  appId: "1:209960477137:web:38e88624e02c1caf89c0f0",
  measurementId: "G-N1H0JB4CD2"
};

// const googleProvider = new GoogleAuthProvider();
// const signInWithGoogle = async () => {
//    try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;
//    }
// }

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);