import React from "react";
import PropTypes from "prop-types";
import {Button} from "../button";
import Input from "./input";
import "./input-with-buttons.css";

const ButtonInput = props => {
	return (
		<div className="ui btn-input">
			<Button
				onClick={props.onClick.left}>
				{props.left}
			</Button>
			<Input disabled type={props.type} value={props.value}/>
			<Button	onClick={props.onClick.right}>
				{props.right}
			</Button>
		</div>
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
	value: PropTypes.string,
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
