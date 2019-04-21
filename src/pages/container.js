import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {Switch, Route, withRouter} from "react-router-dom";

import Settings from "../views/settings/settings";
import ScoutingForm from "./authorized-content/scouting-form";
import HomePage from "./authorized-content/home-page";
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

	useEffect(() => {
		dispatch({type: "SET_HISTORY", data: props.history});
	}, []);

	useEffect(() => {
		// here we check if the localStorage has a defined theme.
		const localTheme = localStorage.getItem("darkMode");
		// it can be only three options - "true", "false" & null (in case it's the first time the client has loaded the app).
		if (localTheme !== null && store.darkMode.toString() !== localTheme) {
			// if it's not null ("true" or "false"), and the localStorage differs from our context, we must update the context.
			dispatch({type: localTheme === "true" ? "SET_DARK" : "SET_LIGHT"});
		} else {
			//otherwise, if the localStorage is null (it can't be the other option because it will never happen), we update the localStorage.
			// this will happen only on the first time when the client has run the app.
			localStorage.setItem("darkMode", store.darkMode);
		}
		// changing the context state is meaninless if we dont do anything about the theme itself.
		// changing the theme we must add or remove the "dark" class from the body tag.
		// we will set to dark theme only if the darkMode context is true. otherwise  - we will set it to light, which is the defualt state.
		store.darkMode ?
			document.body.classList.add("dark") :
			document.body.classList.remove("dark");
	}, [store.darkMode]); // this useEffect will only run if the darkMode has changed.
	// the container will return Settings and a page based on the route.
	return (
		<>
			<Settings />
			<Switch>
				<Route path="/scouting/:matchID" component={ScoutingForm} />
				<Route exact path="/" component={HomePage} />
			</Switch>
		</>
	);
};

Container.propTypes = {
	user: PropTypes.object,
	signOut: PropTypes.func,
	history: PropTypes.object,
};
// here we provide all of the states. in future the pipeline operator will come in handy.
export default provideSettings(provideComponent(provideMatch(withRouter(Container))));
