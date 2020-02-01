import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
	apiKey: process.env.REACT_APP_APIKEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
	databaseURL: process.env.REACT_APP_DATABASEURL,
	projectId: process.env.REACT_APP_PROJECTID,
	storageBucket: process.env.REACT_APP_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
};

console.log(config);

// all of the firebase apps we need:
export const firebaseApp = firebase.initializeApp(config);
export const db = firebaseApp.database();
// our auth provide
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// signing functions
export const signOut = () => firebaseApp.auth().signOut();
export const signInWithGoogle = () => firebaseApp.auth().signInWithPopup(googleProvider);
