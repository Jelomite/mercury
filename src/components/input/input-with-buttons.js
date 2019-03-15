import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import {Button} from "../button";
import Input from "./input";
import style from "./input-with-buttons.css";

const ButtonInput = props => (
	<div className={cx("ui", "btn-input", style)}>
		<Button>{props.left}</Button>
		<Input type={props.type}/>
		<Button>{props.right}</Button>
	</div>
);

ButtonInput.propTypes = {
	right: PropTypes.string,
	left: PropTypes.string,
	type: PropTypes.string,
};

export default ButtonInput;
