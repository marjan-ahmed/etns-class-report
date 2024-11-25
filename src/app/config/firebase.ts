// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQFB3ZzVHkHaX9axIH49i-HAuY8buBkOw",
  authDomain: "etns-class-report.firebaseapp.com",
  projectId: "etns-class-report",
  storageBucket: "etns-class-report.firebasestorage.app",
  messagingSenderId: "397522267786",
  appId: "1:397522267786:web:c0b7ba57b874b4c2070773",
  measurementId: "G-6MYZGVDSYY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app)

export { auth, googleProvider, db }