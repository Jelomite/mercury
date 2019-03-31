import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import style from "./button-group.css";

const Group = props => (
	<div
		className={cx("ui", "btn-group", style)}>
		{	// set the color prop for all children if props.color is present
			props.color ? (
				props.children.map(child => React.cloneElement(child, {color: props.color}))
			) : (
				props.children
			)}
	</div>
);

Group.propTypes = {
	children: PropTypes.node,
	color: PropTypes.string,
};

export default Group;
