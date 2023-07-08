import { initializeApp, getApps, getApp } from 'firebase/app'

import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBuzkpYykUxM2VJL5-I2RdX0zl2K7lzglc",
  authDomain: "desafio-gamelist.firebaseapp.com",
  projectId: "desafio-gamelist",
  storageBucket: "desafio-gamelist.appspot.com",
  messagingSenderId: "225928626233",
  appId: "1:225928626233:web:fc8d6ceef61a75f9b24de8"
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(firebaseApp)
const firestoreDB = getFirestore(firebaseApp)

export {
	firebaseApp, auth, firestoreDB,
}