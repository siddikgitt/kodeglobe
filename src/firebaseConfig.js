// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmHDTcEAAo-EIfERghDtXE8_SpJpK7ER0",
  authDomain: "kodeglobe-d8abb.firebaseapp.com",
  projectId: "kodeglobe-d8abb",
  storageBucket: "kodeglobe-d8abb.appspot.com",
  messagingSenderId: "547330777090",
  appId: "1:547330777090:web:8de4a5a8bc9b1cb4d0471b",
  measurementId: "G-W3HPL3BFY6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
const analytics = getAnalytics(app);