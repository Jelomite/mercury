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
				onClick={props.onClick.left}>
				{props.left}
			</Button>
			<Input type={props.type} value={store.count}/>
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
	onClick: PropTypes.objectOf(
		PropTypes.func
	),
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
