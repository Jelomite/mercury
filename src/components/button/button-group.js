import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import style from "./button-group.css";

const Group = props => (
	<div
		className={cx("ui", "btn-group", style)}>
		{props.children}
	</div>
);

Group.propTypes = {
	children: PropTypes.node,
};

export default Group;
