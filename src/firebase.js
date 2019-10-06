import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
};

// all of the firebase apps we need:
export const firebaseApp = firebase.initializeApp(config);
export const db = firebaseApp.database();
// our auth provide
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// signing functions
export const signOut = () => firebaseApp.auth().signOut();
export const signInWithGoogle = () => firebaseApp.auth().signInWithPopup(googleProvider);
