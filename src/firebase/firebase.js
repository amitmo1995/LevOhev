// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth"
import {Database,DatabaseReference,getDatabase,ref,doc,setDoc} from "firebase/database"
import{getFirestore} from "firebase/firestore"
import { useEffect, useState } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfjtapW4OU_MUUw-tJeA_ANdLqFmDKfNg",
  authDomain: "lev-ohev-db.firebaseapp.com",
  projectId: "lev-ohev-db",
  storageBucket: "lev-ohev-db.appspot.com",
  messagingSenderId: "734000240943",
  appId: "1:734000240943:web:0405c4d375c2dfb3f1e9da"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const firestore=getFirestore(app)
const useFirebaseRef=(path)=>ref(db,path);
const auth=getAuth(app);
export {app as FirebaseApp, db, useFirebaseRef,auth,createUserWithEmailAndPassword,signOut,firestore,signInWithEmailAndPassword};

//costum hook
export function useAuth(){
  const [currentUser, setCurrentUser]=useState();

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth,user=>{setCurrentUser(user)});
    return unsub;
  },[])

  return currentUser;
}