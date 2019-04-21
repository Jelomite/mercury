import React from "react";
import PropTypes from "prop-types";
import Container from "./pages/container";
import SignPage from "./pages/sign-up";
import {BrowserRouter} from "react-router-dom";

// firebase imports
import withFirebaseAuth from "react-with-firebase-auth";
import {providers, firebaseApp} from "./firebase";

const firebaseAppAuth = firebaseApp.auth();
// if the user isn't signed in, we give him the sign-in page,
// otherwise we prompt him to the authorized content
const App = props => (
	<BrowserRouter>
		{props.user ?
			<Container {...props}/> :
			<SignPage {...props} />
		}
	</BrowserRouter>
);

App.propTypes = {
	user: PropTypes.object,
};
// withFirebaseAuth is an HOC which passes the App new props: user, signInWithGoogle, signOut.
export default withFirebaseAuth({
	providers,
	firebaseAppAuth,
})(App);
