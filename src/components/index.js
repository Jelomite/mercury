import React from "react";
import PropTypes from "prop-types";
import {Button, ButtonGroup} from "./button/";
import {Input, ButtonInput} from "./input/";

const Enum = props => (
	<ButtonGroup>
		{props.options.map((text, index) => (
			<Button
				active={props.active === index}
				key={index}
				onClick={() => props.onClick(index)}
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
					active={props.active[index]}
					key={index}
					onClick={() => props.onClick(index)}
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
};

MultipleChoice.defaultProps = {
	onClick: () => null,
};

export {
	Enum,
	Button,
	Input,
	ButtonInput as Number,
	MultipleChoice,
};
