import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import style from "./input.css";

const Input = props => (
	<input
		disabled
		className={cx("ui", "input", style)}
		placeholder={props.placeholder}
		type={props.type}
		style={props.type === "number" ?
			{
				"text-align": "center",
			} :
			{}
		}
		{...props}
	/>
);

Input.propTypes = {
	placeholder: PropTypes.string,
	type: PropTypes.string,
};

Input.defaultProps = {
	placeholder: "",
	type: "text",
};

export default Input;
