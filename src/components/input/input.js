import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import style from "./input.css";

const Input = props => (
	<input className={cx("ui", "input", style)} placeholder={props.placeholder}/>
);

Input.propTypes = {
	placeholder: PropTypes.string,
};

export default Input;
