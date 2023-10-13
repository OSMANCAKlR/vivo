// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyU-A9DZufOpxr8OhAeHyL372lsWlIUNE",
    authDomain: "vivo-bv.firebaseapp.com",
    projectId: "vivo-bv",
    storageBucket: "vivo-bv.appspot.com",
    messagingSenderId: "706065524350",
    appId: "1:706065524350:web:3d7cda6ca8757802f7da2f",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();