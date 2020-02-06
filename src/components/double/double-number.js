import React from "react";
import PropTypes from "prop-types";
import {ButtonInput} from "../input";
import {Grid, Header} from "semantic-ui-react";

const Double = props => (
	// this component creates a split screen ButtonInput with a seperator in the middle.
	<Grid columns={2} divided>
		<Grid.Column>
			{props.left.map(question => (
				<Grid.Row key={question.name}>
					<Header as="h5">{question.name}</Header>
					<ButtonInput
						value={question.value}
						onClick={question.onClick}
					/>
				</Grid.Row>
			))}
		</Grid.Column>

		<Grid.Column>
			{props.right.map(question => (
				<Grid.Row key={question.name}>
					<Header as="h5">{question.name}</Header>
					<ButtonInput
						value={question.value}
						onClick={question.onClick}
					/>
				</Grid.Row>
			))}
		</Grid.Column>
	</Grid>
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
		}),
	),
	left: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			value: PropTypes.number,
			onClick: PropTypes.shape({
				right: PropTypes.func,
				left: PropTypes.func,
			}),
		}),
	),
};

export default Double;
