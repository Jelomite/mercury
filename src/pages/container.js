import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import Settings from "../views/settings/settings";
import ScoutingForm from "./authorized-content/scouting-form";
import {provideComponent} from "../contexts/form";
import {provideMatch} from "../contexts/match";
import {SettingsContext, provideSettings} from "../contexts/settings";

const Container = props => {
	const {store, dispatch} = useContext(SettingsContext);
	useEffect(() => {
		dispatch({type: "SET_AUTH", data: {
			user: props.user,
			signOut: props.signOut,
		}});
		console.log(store.auth);
	}, [store.auth.user]);
	return (
		<>
			<Settings />
			<ScoutingForm match={props.match}/>
		</>
	);
};

Container.propTypes = {
	match: PropTypes.string,
	user: PropTypes.object,
	signOut: PropTypes.func,
};

export default provideSettings(provideComponent(provideMatch(Container)));
