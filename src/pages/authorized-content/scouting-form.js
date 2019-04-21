import React from "react";
import PropTypes from "prop-types";
import Form from "../../views/form";
import Table from "../../views/team-selector";

// combine the scoutingForm to be a single component.
const ScoutingForm = props => (
	<>
	<Table match={props.match.params.matchID}/>
	<Form />
	</>
);

ScoutingForm.propTypes = {
	match: PropTypes.string,
};

export default ScoutingForm;
