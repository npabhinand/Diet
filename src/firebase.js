// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

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
  apiKey: "AIzaSyCDQ6SX3NNQnV2fx94whl0fkF15-OZodOU",
  authDomain: "dietplan-c51dc.firebaseapp.com",
  projectId: "dietplan-c51dc",
  storageBucket: "dietplan-c51dc.appspot.com",
  messagingSenderId: "149096768931",
  appId: "1:149096768931:web:7bcf648934f35dbf7ca616"
})

export default app;
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();