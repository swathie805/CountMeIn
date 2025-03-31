import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDJn3eF2WyNJrLRYtTIKGg9Ru39LmOHwFc",
    authDomain: "countmein-3d854.firebaseapp.com",
    projectId: "countmein-3d854",
    storageBucket: "countmein-3d854.firebasestorage.app",
    messagingSenderId: "832366143364",
    appId: "1:832366143364:web:c9e8137fa6458199165fd1",
    measurementId: "G-RLZ92M04SM"
  };

  const config = initializeApp(firebaseConfig);
  export const auth = getAuth(config);
  export const firestore = getFirestore(config);