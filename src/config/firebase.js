import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "blog-app-262df.firebaseapp.com",
  projectId: "blog-app-262df",
  storageBucket: "blog-app-262df.appspot.com",
  messagingSenderId: "382088866965",
  appId: "1:382088866965:web:1707977b286cb6fb56ff9c",
};

firebase.initializeApp(firebaseConfig); // inicjalizacja Firebase

export const auth = firebase.auth(); // autentykacja Firebase
export const db = firebase.firestore(); // Firestore Firebase
