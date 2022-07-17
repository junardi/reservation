import { v4 as uuidv4 } from 'uuid';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';                    
import { 
  getFirestore, 
  collection,
  Timestamp,
  addDoc,
  query,
  getDocs,
  doc
} from 'firebase/firestore';

import { 
  getStorage,
  uploadBytes,
  ref, 
  getDownloadURL,
  deleteObject
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAsu2vufaoCjm46hIdQ0OIfvDJaigt3b50",
  authDomain: "damiresreservation.firebaseapp.com",
  projectId: "damiresreservation",
  storageBucket: "damiresreservation.appspot.com",
  messagingSenderId: "277197188626",
  appId: "1:277197188626:web:397f6693a65bcd5b63b2cb"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


export const auth = getAuth();
export const db = getFirestore();


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  await signOut(auth);
}; 

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const uploadFile = async (file) => {
  const storageRef = ref(storage, uuidv4());
  return await uploadBytes(storageRef, file);
};

export const getDownloadUrl = async(filename) => {
  const storageRef = ref(storage, filename);
  return await getDownloadURL(storageRef);
};

export const deleteFile = async(filename) => {
  const storageRef = ref(storage, filename);
  return await deleteObject(storageRef);
};

export const addItem = async(data) => {
  data.dateCreated = Timestamp.now();
  data.dateUpdated = Timestamp.now();
  //const ref = doc(collection(db, "items"));
  //return await setDoc(ref, data);
  const ref = collection(db, "items");
  return await addDoc(ref, data);
}; 

export const getItems = async () => {
  const collectionRef = collection(db, 'items');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  //console.log(querySnapshot.docs);
  const itemMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    
    //console.log(acc);
    //console.log(docSnapshot.id);
    //console.log(docSnapshot.data());

    acc[docSnapshot.id] = docSnapshot.data();
    return acc;

  }, {});

  return itemMap;
  
}


export const addReservation = async(id, data) => {
  data.approved = false;
  const ref = collection(db, "items", id, "reservations");
  return await addDoc(ref, data);
};



