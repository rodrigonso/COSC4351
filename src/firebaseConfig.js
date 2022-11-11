// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "cosc4351-d1b27.firebaseapp.com",
  projectId: "cosc4351-d1b27",
  storageBucket: "cosc4351-d1b27.appspot.com",
  messagingSenderId: "509761351438",
  appId: "1:509761351438:web:980af32c1827897b82b15f",
  measurementId: "G-X93MYWHTL0"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(FirebaseApp);
