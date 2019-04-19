import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import "./button.css";

const Button = props => (
	<button
		className={cx("btn ui",{"active": props.active, "tinted": props.tinted}, props.color)}
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
