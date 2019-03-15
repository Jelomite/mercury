import React, {useContext} from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import {Button} from "../button";
import Input from "./input";
import style from "./input-with-buttons.css";
import {Context} from "../../store";

const ButtonInput = props => {
	const {store} = useContext(Context);

	return (
		<div className={cx("ui", "btn-input", style)}>
			<Button
				onClick={props.leftOnClick}>
				{props.left}
			</Button>
			<Input type={props.type} value={store.count}/>
			<Button	onClick={props.rightOnClick}>
				{props.right}
			</Button>
		</div>
	);
};

ButtonInput.propTypes = {
	right: PropTypes.string,
	left: PropTypes.string,
	type: PropTypes.string,
	rightOnClick: PropTypes.func,
	leftOnClick: PropTypes.func,
};

ButtonInput.defaultProps = {
	right: "+",
	left: "-",
	type: "number",
	rightOnClick: () => null,
	leftOnClick: () => null,
};

export default ButtonInput;
