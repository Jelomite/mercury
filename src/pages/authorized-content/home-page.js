import React from "react";
import {SettingsContext} from "../../contexts/settings";
// combine the scoutingForm to be a single component.
const HomePage = () => {
	const {store} = React.useContext(SettingsContext);
	return (
		<h1>Hello, {store.auth.user ? store.auth.user.displayName : ""}</h1>
	);
};

export default HomePage;
