import React from "react";
import PropTypes from "prop-types";
import {Button as SemanticButton} from "semantic-ui-react";

const Button = ({color, active, tinted = false, ...props}) => (
	<SemanticButton
		fluid
		size="big"
		basic={!active}
		color={color && (active || tinted) ? color : "black"}
		active={active === "true"}
		{...props}
	>
		{props.children}
	</SemanticButton>
);

Button.propTypes = {
	active: PropTypes.string,
	children: PropTypes.node,
	color: PropTypes.string,
	tinted: PropTypes.string,
};

export default Button;
