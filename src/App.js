import React from "react";
import PropTypes from "prop-types";
import ScoutingForm from "./pages/scouting-form";
import SignPage from "./pages/sign-up";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase-config";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
	googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const App = props => {
	return props.user ? <ScoutingForm match="2019isde3_sf2m1" {...props}/> : <SignPage {...props} />;
};

App.propTypes = {
	user: PropTypes.object,
};

export default withFirebaseAuth({
	providers,
	firebaseAppAuth,
})(App);
