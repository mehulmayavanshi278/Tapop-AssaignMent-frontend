// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider as FirebaseGoogleAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAc8GBlB3CH3evZxLgoVfNcYXlAOXxs54",
  authDomain: "loginauth-a5054.firebaseapp.com",
  projectId: "loginauth-a5054",
  storageBucket: "loginauth-a5054.appspot.com",
  messagingSenderId: "973094268821",
  appId: "1:973094268821:web:a35d81599c7206980e909c",
  measurementId: "G-17VBWF2JE1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
auth.languageCode = "en";

export const GoogleAuthProvider = new FirebaseGoogleAuthProvider();

export default app;
