import React from "react";
import PropTypes from "prop-types";
import Form from "../../views/form";
import Table from "../../views/team-selector";

const ScoutingForm = props => (
	<>
	<Table match={props.match}/>
	<Form />
	</>
);

ScoutingForm.propTypes = {
	match: PropTypes.string,
};

export default ScoutingForm;
