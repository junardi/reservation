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
  deleteDoc,
  collectionGroup,
  where,
  onSnapshot
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

// export const getReservationByTransactionId = async(transactionId) => {
//   const reservation = query(collectionGroup(db, 'reservations'), where('transactionId', '==', transactionId));
//   const querySnapshot = await getDocs(reservation);
//   const reservationArray = [];
//   querySnapshot.forEach((doc) => {
//     const data = {
//       ...doc.data(),
//       reservationId: doc.id
//     };
//     reservationArray.push(data);
//   });
//   return reservationArray[0];
// };

export const getReservationByTransactionIdRealtime = (transactionId, callback) => {
  
  const q = query(collectionGroup(db, 'reservations'), where('transactionId', '==', transactionId));  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    
    const data = {
      ...snapshot.docChanges()[0].doc.data(),
      reservationId: snapshot.docChanges()[0].doc.id
      
    };
    callback(data);

  });

  return unsubscribe;

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
      price: data.price,
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

export const getAllReservations = async () => {
  try {
    // Step 1: Get all items
    const itemsSnapshot = await getDocs(collection(db, "items"));
    const reservations = [];

    // Step 2: Loop through each item and fetch its reservations
    for (const itemDoc of itemsSnapshot.docs) {
      const itemId = itemDoc.id; // Item ID
      const itemName = itemDoc.data().name;
      const reservationsRef = collection(db, `items/${itemId}/reservations`);
      const reservationsSnapshot = await getDocs(query(reservationsRef));

      // Step 3: Add each reservation to the combined array
      reservationsSnapshot.forEach(reservationDoc => {
        reservations.push({
          id: reservationDoc.id,
          ...reservationDoc.data(),
          itemName, // include item name also
          itemId, // Include item ID for context
        });
      });
    }

    //console.log("All Reservations:", reservations);
    return reservations;
  } catch (error) {
    console.error("Error fetching combined reservations:", error);
  }
};

