import React from "react";
import {SettingsContext} from "../../contexts/settings";
// this will be our personal page with links to everywhere needed.
// this lives on "/".
const HomePage = () => {
	const {store} = React.useContext(SettingsContext);
	return (
		<h1>Hello, {store.auth.user ? store.auth.user.displayName : ""}</h1>
	);
};

export default HomePage;
