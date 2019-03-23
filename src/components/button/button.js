import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import style from "./button.css";

const Button = props => (
	<button
		className={cx(
			"btn",
			"ui",
			props.active ? "active" : "",
			props.color,
			props.tinted ? "tinted" : "",
			style
		)}
		{...props}>
		{props.children}
	</button>
);

Button.propTypes = {
	active: PropTypes.bool,
	children: PropTypes.node,
	color: PropTypes.string,
	tinted: PropTypes.bool,
};

export default Button;
