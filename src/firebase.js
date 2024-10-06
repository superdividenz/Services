import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase configuration
  apiKey: "AIzaSyBnQUOQxmYkQ2sW28QUpO7fxBqR9gFZkF0",
  authDomain: "test-9776f.firebaseapp.com",
  projectId: "test-9776f",
  storageBucket: "test-9776f.appspot.com",
  messagingSenderId: "744270644759",
  appId: "1:744270644759:web:41d97039cfe8e1eb493e52"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);