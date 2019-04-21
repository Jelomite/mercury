import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {Switch, Route} from "react-router-dom";

import Settings from "../views/settings/settings";
import ScoutingForm from "./authorized-content/scouting-form";
import {provideComponent} from "../contexts/form";
import {provideMatch} from "../contexts/match";
import {SettingsContext, provideSettings} from "../contexts/settings";

// this is our main container, every page that is authorized will be rendered from here.
// in the future, this will be using the react-router to serve different pages within the app.
// the container manages all of the states. anything above that is outside of the global state scope.
const Container = props => {
	const {store, dispatch} = useContext(SettingsContext);
	useEffect(() => {
		dispatch({type: "SET_AUTH", data: {
			user: props.user,
			signOut: props.signOut,
		}});
		console.log(store.auth);
	}, [store.auth.user]);
	// the container will return Settings and a page based on the route.
	return (
		<>
			<Settings />
			<Switch>
				<Route path="/scouting/:matchID" component={ScoutingForm} />
			</Switch>
		</>
	);
};

Container.propTypes = {
	match: PropTypes.string,
	user: PropTypes.object,
	signOut: PropTypes.func,
};
// here we provide all of the states. in future the pipeline operator will come in handy.
export default provideSettings(provideComponent(provideMatch(Container)));
