// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseconfig = {
  apiKey: "AIzaSyC2kzje6vAERZTHyr-JCt9pkbNd7D8xbuM",
  authDomain: "mma-6810b.firebaseapp.com",
  projectId: "mma-6810b",
  storageBucket: "mma-6810b.firebasestorage.app",
  messagingSenderId: "868581469514",
  appId: "1:868581469514:web:5c44d336ce271bcfc125b3",
  measurementId: "G-BM3FS8VEPL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);
// const analytics = getAnalytics(app);

export { app, auth };
