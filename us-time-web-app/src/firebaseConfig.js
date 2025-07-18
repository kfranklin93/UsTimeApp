// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjV93FEKpDLXN9gtdkPplbYShIZwg4E_4",
  authDomain: "us-time-app.firebaseapp.com",
  projectId: "us-time-app",
  storageBucket: "us-time-app.firebasestorage.app",
  messagingSenderId: "376418108747",
  appId: "1:376418108747:web:e0bc432ae19ccdffc554ce",
  measurementId: "G-K39HYW8KPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
// For Cloud Functions, specify the region if not default (e.g., 'us-central1')
const functions = getFunctions(app, 'us-central1'); // Replace with your function region

export { app, auth, db, functions };