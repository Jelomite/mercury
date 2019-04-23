import React from "react";
import {SettingsContext} from "../../contexts/settings";
import {Button} from "../../components";
import {Link} from "react-router-dom";

// this will be our personal page with links to everywhere needed.
// this lives on "/".
const HomePage = () => {
	const {store} = React.useContext(SettingsContext);
	return (
		<>
		<h1>Hello, {store.auth.user ? store.auth.user.displayName : ""}</h1>
		<Link to="scouting">
			<Button> Start Scouting </Button>
		</Link>
		</>
	);
};

export default HomePage;
