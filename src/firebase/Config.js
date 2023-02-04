// All firebase imports
import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCuP3VAd3uNeqUHfzbMKwAtODEbuP95_8c",
  authDomain: "project-management-site-14d20.firebaseapp.com",
  projectId: "project-management-site-14d20",
  storageBucket: "project-management-site-14d20.appspot.com",
  messagingSenderId: "803242140053",
  appId: "1:803242140053:web:60b0143d69cf85db53d69c",
  measurementId: "G-SL50ZGEL4C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database in firestore
const db = getFirestore(app);

// Initialize authentication
const auth = getAuth(app);

// Initialize timestamps
const timestamp = Timestamp;

export { db, auth, timestamp };