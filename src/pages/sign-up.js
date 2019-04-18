import React from "react";
import PropTypes from "prop-types";
import {Button} from "../components";

const SignPage = props => {
	const {signInWithGoogle} = props;
	return (
		<div className="App">
			<header className="App-header">
				<p>Please sign in.</p>
				<Button onClick={signInWithGoogle}>Sign in with Google</Button>
			</header>
		</div>
	);
};

SignPage.propTypes = {
	signInWithGoogle: PropTypes.func,
};

export default SignPage;
