import React, {useState, useEffect, createContext} from 'react'
import {
  RouterProvider,
} from "react-router-dom";

import router from "./routeConfig";

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';

export const CurrentUserContext = createContext();

function App() {
const [loading, setLoading] = useState(true);
const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();  
  
    setLoading(true);
    onAuthStateChanged(auth, async user => {
      if (user) {
        const snap = await getDoc(doc(db, 'users', user.uid));
        setCurrentUser(snap.data());
      } else {
        setCurrentUser(undefined);
      }
    });
  
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
   <CurrentUserContext.Provider value={{ currentUser, loading }}>
      <RouterProvider router={router} />
   </CurrentUserContext.Provider>
  );
}

export default App;
