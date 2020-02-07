import React from "react";
import PropTypes from "prop-types";
import style from "./dropdown.module.css";

const Dropdown = ({options, ...props}) => (
	<select className={style.select} {...props}>
		<option value="" disabled selected>--- Select match ---</option>
		{options.map(option => <option key={option.value} value={option.value}>{option.text}</option>)}
	</select>
);

Dropdown.propTypes = {
	options: PropTypes.array,
};

export default Dropdown;
