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
  doc,
  getDoc,
  updateDoc,
  deleteDoc
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

export const uploadFile = async (file, name) => {
  if(!name) {
    const storageRef = ref(storage, uuidv4());
    return await uploadBytes(storageRef, file);
  } else {
    const storageRef = ref(storage, name);
    return await uploadBytes(storageRef, file);
  }
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
  
  const itemMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  
    acc[docSnapshot.id] = docSnapshot.data();
    return acc;

  }, {});

  // Object.keys(itemMap).map(async(id) => {
  //   itemMap[id].reservations = await getItemReservations(id);
  // });

  return itemMap;

}; 

export const getItemReservations = async(id) => {

  const collectionRef = collection(db, "items", id, "reservations");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  
  const reservationsMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  
    acc[docSnapshot.id] = docSnapshot.data();
    return acc;

  }, {});

  return reservationsMap;
};


export const addReservation = async(id, data) => {
  data.dateCreated = Timestamp.now();
  data.dateUpdated = Timestamp.now();
  data.approved = false;
  const ref = collection(db, "items", id, "reservations");
  return await addDoc(ref, data);
};


export const getItemDataById = async(id) => {

  const docRef = doc(db, "items", id);
  const docSnap = await getDoc(docRef);

  const reservations = [];
  const reservationsQuerySnapshot = await getDocs(collection(db, "items", id, "reservations"));                                     
  reservationsQuerySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
    const data = doc.data();
    data['reservationId'] = doc.id;
    reservations.push(data);
  });

  const itemData = docSnap.data();
  itemData['reservations'] = reservations;

  return itemData;
};


export const approveReservation = async(itemId, reservationId) => {
  const ref = doc(db, 'items', itemId, 'reservations', reservationId);
  return await updateDoc(ref, { approved: true, dateUpdated: Timestamp.now() });
};

export const updateReservationItem = async(itemId, data) => {
  
  const ref = doc(db, 'items', itemId);
  return await updateDoc(ref, 
    { 
      name: data.name, 
      description: data.description, 
      dateUpdated: Timestamp.now(),
      file: [
        {
          name: data.fileName,
          downloadUrl: data.fileDownloadUrl
        }
      ]
    }
  );

};

export const deleteReservation = async(itemId, reservationId) => {
  return await deleteDoc(doc(db, 'items', itemId, 'reservations', reservationId));
}

export const deleteItem = async(itemId) => {
  return await deleteDoc(doc(db, 'items', itemId));
};



