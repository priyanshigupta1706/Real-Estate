// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-c2196.firebaseapp.com",
  projectId: "real-estate-c2196",
  storageBucket: "real-estate-c2196.appspot.com",
  messagingSenderId: "17131306217",
  appId: "1:17131306217:web:a5df3d51fc2f3e64340478"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);