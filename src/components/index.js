import React from "react";
import PropTypes from "prop-types";
import {Button, ButtonGroup} from "./button/";
import {Input, ButtonInput} from "./input/";
import {DoubleNumber} from "./double";

const Enum = props => (
	<ButtonGroup>
		{props.options.map((text, index) => (
			<Button
				active={props.active === index ? "true" : undefined}
				key={index}
				onClick={() => props.onClick(index)}
				color={props.color}
			>
				{text}
			</Button>
		))}
	</ButtonGroup>
);

Enum.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.string,
	),
	active: PropTypes.number,
	onClick: PropTypes.func,
	color: PropTypes.string,
};

Enum.defaultProps = {
	options: ["No", "Yes"],
	active: -1,
	onClick: () => null,
};

const MultipleChoice = props => (
	<ButtonGroup>
		{
			props.options.map((text, index) => (
				<Button
					active={props.active[index] ? "true" : undefined}
					key={index}
					onClick={() => props.onClick(index)}
					color={props.color}
				>
					{text}
				</Button>
			))
		}
	</ButtonGroup>
);

MultipleChoice.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.string,
	),
	active: PropTypes.arrayOf(
		PropTypes.bool
	),
	onClick: PropTypes.func,
	color: PropTypes.string,
};

MultipleChoice.defaultProps = {
	onClick: () => null,
};

export {
	Enum,
	Button,
	ButtonGroup,
	Input,
	ButtonInput as Number,
	MultipleChoice,
	DoubleNumber,
};
