import React from "react";
import PropTypes from "prop-types";
import {Button} from "../button";
import {Input} from "semantic-ui-react";

const ButtonInput = props => {
	return (
		<Input fluid disabled type={props.type} value={props.value}>
			<Button
				attached="left"
				onClick={props.onClick.left}>
				{props.left}
			</Button>
			<input style={{
				"textAlign": "center",
			}}/>
			<Button
				attached="right"
				onClick={props.onClick.right}>
				{props.right}
			</Button>
		</Input>
	);
};

ButtonInput.propTypes = {
	right: PropTypes.string,
	left: PropTypes.string,
	type: PropTypes.string,
	onClick: PropTypes.shape({
		right: PropTypes.func,
		left: PropTypes.func,
	}),
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
};

ButtonInput.defaultProps = {
	right: "+",
	left: "-",
	type: "number",
	onClick: {
		right: () => null,
		left: () => null,
	},
};

export default ButtonInput;
