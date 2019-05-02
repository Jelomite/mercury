import React from "react";
import PropTypes from "prop-types";
import {ButtonInput} from "../input";
import style from "./double-number.module.css";

const Double = props => (
	// this component creates a split screen ButtonInput with a seperator in the middle.
	<div className={style.double}>
		<section className={style.left}>
			{props.left.map(question => (
				<React.Fragment key={question.name}>
					<h5>{question.name}</h5>
					<ButtonInput
						value={question.value}
						onClick={question.onClick}
					/>
				</React.Fragment>
			))}
		</section>
		<section className={style.seperator}></section>
		<section className={style.right}>
			{props.right.map(question => (
				<React.Fragment key={question.name}>
					<h5>{question.name}</h5>
					<ButtonInput
						value={question.value}
						onClick={question.onClick}
					/>
				</React.Fragment>
			))}
		</section>
	</div>
);

Double.propTypes = {
	right: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			value: PropTypes.number,
			onClick: PropTypes.shape({
				right: PropTypes.func,
				left: PropTypes.func,
			}),
		})
	),
	left: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			value: PropTypes.number,
			onClick: PropTypes.shape({
				right: PropTypes.func,
				left: PropTypes.func,
			}),
		})
	),
};

export default Double;
