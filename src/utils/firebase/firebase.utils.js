import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';                    
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection,
  writeBatch, 
  query,
  getDocs
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAsu2vufaoCjm46hIdQ0OIfvDJaigt3b50",
  authDomain: "damiresreservation.firebaseapp.com",
  projectId: "damiresreservation",
  storageBucket: "damiresreservation.appspot.com",
  messagingSenderId: "277197188626",
  appId: "1:277197188626:web:397f6693a65bcd5b63b2cb"
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};


