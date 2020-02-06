import React from "react";
import {SettingsContext} from "../../contexts/settings";
import {Button} from "../../components";
import {Link} from "react-router-dom";
import {Header} from "semantic-ui-react";

// this will be our personal page with links to everywhere needed.
// this lives on "/".
const HomePage = () => {
	const {store} = React.useContext(SettingsContext);
	return (
		<>
		<Header as="h1">Hello, {store.auth.user ? store.auth.user.displayName : ""}</Header>
		<Link to="scouting">
			<Button> Start Scouting </Button>
		</Link>
		</>
	);
};

export default HomePage;
