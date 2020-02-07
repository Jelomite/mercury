import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {Button} from "../components";
import logo from "../img/logo.png";
import style from "./sign-up.module.css";

const SignPage = props => {
	// set the theme to dark if localStorage has it defined.
	useEffect(() => {
		if(localStorage.getItem("darkMode") === "true") {
			document.body.classList.add("dark");
		}
	}, []);

	return (
		<div className={style.container}>
			<div className={style.content}>
				<img className={style.logo} src={logo} alt="Mercury's logo" />
				<Button onClick={() => {
					props.history.push("/");
					props.signInWithGoogle();
				}}>Sign in with Google</Button>
			</div>
		</div>
	);
};

SignPage.propTypes = {
	signInWithGoogle: PropTypes.func,
	history: PropTypes.object,
};

export default SignPage;
