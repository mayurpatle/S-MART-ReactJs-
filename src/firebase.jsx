// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH6fzm-juKT6npSPuG8WaxfqJbbxxk6cQ",
  authDomain: "fir-mart-ae850.firebaseapp.com",
  projectId: "fir-mart-ae850",
  storageBucket: "fir-mart-ae850.appspot.com",
  messagingSenderId: "1083988996405",
  appId: "1:1083988996405:web:b4e37874290e590f11dc7c",
  measurementId: "G-C4SL6T8V06",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };


