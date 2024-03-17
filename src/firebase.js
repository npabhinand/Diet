// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { setDoc, doc, getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
require('firebase/auth');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = firebase.initializeApp({
  apiKey: "AIzaSyD0nMiU5K7xp6DDSSs1MF0PVhaiuz4WrMo",
  authDomain: "diet-b5916.firebaseapp.com",
  projectId: "diet-b5916",
  storageBucket: "diet-b5916.appspot.com",
  messagingSenderId: "1039485109698",
  appId: "1:1039485109698:web:ffa5cb24bacce5a0e9825b",
  measurementId: "G-DGBVC9N9DP"
})

export default app;
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();