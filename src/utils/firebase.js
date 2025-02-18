// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2g6q4j4NWLsXfdJS3n7bToQIbkIqwxLc",
  authDomain: "netflix-gpt-a177c.firebaseapp.com",
  projectId: "netflix-gpt-a177c",
  storageBucket: "netflix-gpt-a177c.firebasestorage.app",
  messagingSenderId: "356679331084",
  appId: "1:356679331084:web:0fffa50a283f4448726d29",
  measurementId: "G-XP1XFP4QFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();