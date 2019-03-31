import React from "react";
import PropTypes from "prop-types";
import Form from "../views/form";
import Table from "../views/team-selector";
import Settings from "../views/settings/settings";
import {provideComponent} from "../contexts/form";
import {provideMatch} from "../contexts/match";
import {provideSettings} from "../contexts/settings";

const ScoutingForm = props => (
	<React.Fragment>
		<Settings />
		<Table match={props.match}/>
		<Form />
	</React.Fragment>
);

ScoutingForm.propTypes = {
	match: PropTypes.string,
};

export default provideSettings(provideComponent(provideMatch(ScoutingForm)));
