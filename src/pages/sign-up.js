import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {Button} from "../components";
import logo from "../img/logo.png";
import {Header, Container, Image} from "semantic-ui-react";

const SignPage = props => {
	// set the theme to dark if localStorage has it defined.
	useEffect(() => {
		if(localStorage.getItem("darkMode") === "true") {
			document.body.classList.add("dark");
		}
	}, []);

	return (
		<Container textAlign="center" style={{
			"marginTop": "15%",
		}}>
			<Header as="h2">welcome to:</Header>
			<Image src={logo} alt="Mercury's logo" size="large" centered/>
			<Button onClick={() => {
				props.history.push("/");
				props.signInWithGoogle();
			}}>Sign in with Google</Button>
		</Container>
	);
};

SignPage.propTypes = {
	signInWithGoogle: PropTypes.func,
	history: PropTypes.object,
};

export default SignPage;
