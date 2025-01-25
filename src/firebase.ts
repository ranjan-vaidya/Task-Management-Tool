import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_APP_FIREBASE_APP_ID

  apiKey: "AIzaSyD-IE4E01GKbCbYSWWmuCrKsM9ia2fPJj0",
  authDomain: "task-management-tool-b7088.firebaseapp.com",
  projectId: "task-management-tool-b7088",
  storageBucket: "task-management-tool-b7088.firebasestorage.app",
  messagingSenderId: "275859467827",
  appId: "1:275859467827:web:d3c3de5ed3fe934c013d46",
  measurementId: "G-YE22NX2T5X",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
