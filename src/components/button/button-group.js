import React from "react";
import PropTypes from "prop-types";
import {Button} from "semantic-ui-react";

const Group = props => (
	<Button.Group fluid widths={props.children.length}>
		{	// set the color prop for all children if props.color is present
			props.color ? (
				props.children.map(child => React.cloneElement(child, {color: props.color}))
			) : (
				props.children
			)}
	</Button.Group>
);

Group.propTypes = {
	children: PropTypes.node,
	color: PropTypes.string,
};

export default Group;
