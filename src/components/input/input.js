import React from "react";
import PropTypes from "prop-types";
import "./input.css";

const Input = props => (
	<input
		className="ui input"
		placeholder={props.placeholder}
		type={props.type}
		style={props.type === "number" ?
			{
				"textAalign": "center",
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
