import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBy7EAjWkzS4KPfAs9Cs0hWRB16-Fv0G2A",
  authDomain: "newskaro-abd41.firebaseapp.com",
  projectId: "newskaro-abd41",
  storageBucket: "newskaro-abd41.appspot.com",
  messagingSenderId: "875271279701",
  appId: "1:875271279701:web:ee1992b8501838160230dc",
  measurementId: "G-RHHTRC00GM"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
export default app;

