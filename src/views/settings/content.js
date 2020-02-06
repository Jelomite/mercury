import React, {useContext} from "react";
import {Button, Enum, Spacer} from "../../components";
import {SettingsContext} from "../../contexts/settings";
import {Header} from "semantic-ui-react";

// in the settings page, this is what it contains.
const SettingsPage = () => {
	const {store, dispatch} = useContext(SettingsContext);
	return (
		<>
			<Header as="h1" textAlign="center">Preferences</Header>
			<Header as="h4" textAlign="center">Theme</Header>
			<Enum
				options={["Light", "Dark"]}
				active={store.darkMode ? 1 : 0}
				onClick={value => {
					dispatch({type: value === 1 ? "SET_DARK" : "SET_LIGHT"});
					localStorage.setItem("darkMode", value === 1);
				}}/>
			<Spacer />
			<Button onClick={store.auth.signOut}>Sign Out</Button>
		</>
	);
};

export default SettingsPage;
