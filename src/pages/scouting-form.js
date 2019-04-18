import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import Form from "../views/form";
import Table from "../views/team-selector";
import Settings from "../views/settings/settings";
import {provideComponent} from "../contexts/form";
import {provideMatch} from "../contexts/match";
import {SettingsContext, provideSettings} from "../contexts/settings";

const ScoutingForm = props => {
	const {store, dispatch} = useContext(SettingsContext);
	useEffect(() => {
		dispatch({type: "SET_AUTH", data: {
			user: props.user,
			signOut: props.signOut,
		}});
		console.log(store.auth);
	}, [store.auth.user]);
	return (
		<React.Fragment>
			<Settings />
			<Table match={props.match}/>
			<Form />
		</React.Fragment>
	);
};

ScoutingForm.propTypes = {
	match: PropTypes.string,
	user: PropTypes.object,
	signOut: PropTypes.func,
};

export default provideSettings(provideComponent(provideMatch(ScoutingForm)));
