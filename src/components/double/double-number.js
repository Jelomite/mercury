import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import {ButtonInput} from "../input";
import style from "./double-number.css";

const Double = props => (
	<div className={cx("double", style)}>
		<section className="left">
			{props.left.map((question, index) => (
				<React.Fragment key={index}>
					<h5>{question.name}</h5>
					<ButtonInput
						value={question.value}
						onClick={question.onClick}
					/>
				</React.Fragment>
			))}
		</section>
		<section className="seperator"></section>
		<section className="right">
			{props.right.map((question, index) => (
				<React.Fragment key={index}>
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
		PropTypes.object
	),
	left: PropTypes.arrayOf(
		PropTypes.object
	),
};

export default Double;
