// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdR7NV0rn8oAqimFRaKdCNoIw8L0oEGQ0",
  authDomain: "frequencia-nodejs.firebaseapp.com",
  projectId: "frequencia-nodejs",
  storageBucket: "frequencia-nodejs.firebasestorage.app",
  messagingSenderId: "194976079273",
  appId: "1:194976079273:web:f3dbc6560cfeaafaedf8b8",
  measurementId: "G-PYX9YGYH0E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);