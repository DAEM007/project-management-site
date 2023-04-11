// All firebase imports
import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyALR7disbm5321NF7D8IjTuWpfsjpDB1TQ",
  authDomain: "project-management-site-1888d.firebaseapp.com",
  projectId: "project-management-site-1888d",
  storageBucket: "project-management-site-1888d.appspot.com",
  messagingSenderId: "397237857730",
  appId: "1:397237857730:web:6be29b326a477147af3a5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database in firestore
const db = getFirestore(app);

// Initialize authentication
const auth = getAuth(app);

// Initialize storage
const storage = getStorage(app);

// Initialize timestamps
const timestamp = Timestamp;

export { db, auth, storage, timestamp };