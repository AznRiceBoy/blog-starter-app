// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0nw-FNM_XngCfEFVXj6ixynFPk4OtjzQ",
  authDomain: "blog-a0b1b.firebaseapp.com",
  projectId: "blog-a0b1b",
  storageBucket: "blog-a0b1b.appspot.com",
  messagingSenderId: "464958051896",
  appId: "1:464958051896:web:46204da649c0e0b2d078cd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
