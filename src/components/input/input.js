import React from "react";
import PropTypes from "prop-types";
import {Input as SemanticInput} from "semantic-ui-react";

const Input = props => (
	<SemanticInput
		fluid
		size="large"
		placeholder={props.placeholder}
		type={props.type}
		style={props.type === "number" ?
			{
				"textAlign": "center",
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
