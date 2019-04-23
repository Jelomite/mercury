import React, {useState, useEffect} from "react";
import Container from "./pages/container";
import SignPage from "./pages/sign-up";
import {BrowserRouter, withRouter} from "react-router-dom";
import {firebaseApp, signInWithGoogle, signOut} from "./firebase";

// create an auth
const useAuth = auth => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(state => {
			setUser(state);
		});
		return unsubscribe;
	}, [auth]);
	return user;
};

// if the user isn't signed in, we give him the sign-in page,
// otherwise we prompt him to the authorized content
const Bundler = props => {
	const user = useAuth(firebaseApp.auth());
	return (user ?
		<Container user={user} signOut={signOut} {...props}/> :
		<SignPage signInWithGoogle={signInWithGoogle} {...props}/>
	);
};

const BundlerWithRouter = withRouter(Bundler);
const App = () => <BrowserRouter><BundlerWithRouter/></BrowserRouter>;

export default App;
