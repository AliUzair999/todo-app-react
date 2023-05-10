// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth} from "firebase/auth"
import{getFirestore} from 'firebase/firestore'
import {getStorage, ref} from "firebase/storage"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6bPDPvEK677mEBQldQuo-_HAe0eLGvAM",
  authDomain: "assignment7-c7f1a.firebaseapp.com",
  projectId: "assignment7-c7f1a",
  storageBucket: "assignment7-c7f1a.appspot.com",
  messagingSenderId: "843077805126",
  appId: "1:843077805126:web:9e9e13b81774e18ebd9647"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
const storageRef = ref(storage)



// console.log(storage)
// console.log(storageRef)

export {auth, db, storage}

