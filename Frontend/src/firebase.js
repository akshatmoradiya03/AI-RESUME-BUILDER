// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0ViyxoSxUP_lksGOKOZYz7DRysrNjd0k",
  authDomain: "resumebuilder-7ddb6.firebaseapp.com",
  projectId: "resumebuilder-7ddb6",
  storageBucket: "resumebuilder-7ddb6.appspot.com",
  messagingSenderId: "770632847447",
  appId: "1:770632847447:web:587d0030452a699395d312",
  measurementId: "G-P9SZGMDSN7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 