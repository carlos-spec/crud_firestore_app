import firebase  from 'firebase/app'
import 'firebase/firestore'
//import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBSKiV2YixuHeFuglrgq_nTzxghyMSKymg",
    authDomain: "fernando-react-87b5c.firebaseapp.com",
    projectId: "fernando-react-87b5c",
    storageBucket: "fernando-react-87b5c.appspot.com",
    messagingSenderId: "398601473186",
    appId: "1:398601473186:web:1f361052e7690037d39bfb"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
   export {firebase}

   