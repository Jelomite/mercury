import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {Button} from "../components";
import screw from "../img/screw.svg";
import style from "./sign-up.module.css";

const SignPage = props => {
	useEffect(() => {
		if(localStorage.getItem("darkMode") === "true") {
			document.body.classList.add("dark");
		}
	}, []);

	return (
		<div className={style.container}>
			<div className={style.content}>
				<img className={style.logo} src={screw} alt="Mercury's logo" />
				<h4 className={style.strapline}>welcome to:</h4>
				<h1 className={style.title}>Mercury</h1>
				<Button onClick={props.signInWithGoogle}>Sign in with Google</Button>
			</div>
		</div>
	);
};

SignPage.propTypes = {
	signInWithGoogle: PropTypes.func,
};

export default SignPage;
