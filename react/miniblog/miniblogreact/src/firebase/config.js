import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDECeJBUc0gAFvSsFaFhneOruIkag_pXJA",
  authDomain: "miniblog-1e9cb.firebaseapp.com",
  projectId: "miniblog-1e9cb",
  storageBucket: "miniblog-1e9cb.appspot.com",
  messagingSenderId: "317993503713",
  appId: "1:317993503713:web:cb14d088917f08b505a0a0"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }