import React from "react";
import PropTypes from "prop-types";
import Container from "./pages/container";
import SignPage from "./pages/sign-up";

// firebase imports
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase-config";

//https://medium.com/firebase-developers/how-to-setup-firebase-authentication-with-react-in-5-minutes-maybe-10-bb8bb53e8834
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
	googleProvider: new firebase.auth.GoogleAuthProvider(),
};
// if the user isn't signed in, we give him the sign-in page,
// otherwise we prompt him to the authorized content
const App = props => {
	return props.user ? <Container match="2019isde3_sf2m1" {...props}/> : <SignPage {...props} />;
};

App.propTypes = {
	user: PropTypes.object,
};
// withFirebaseAuth is an HOC which passes the App new props: user, signInWithGoogle, signOut.
export default withFirebaseAuth({
	providers,
	firebaseAppAuth,
})(App);
