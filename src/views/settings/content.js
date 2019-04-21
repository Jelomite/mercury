import React, {useContext} from "react";
import {Button, Enum} from "../../components";
import {SettingsContext} from "../../contexts/settings";

// in the settings page, this is what it contains.
const SettingsPage = () => {
	const {store, dispatch} = useContext(SettingsContext);
	return (
		<>
			<h1>Preferences</h1>
			<h4>Theme</h4>
			<Enum
				options={["Light", "Dark"]}
				active={store.darkMode ? 1 : 0}
				onClick={value => {
					dispatch({type: value === 1 ? "SET_DARK" : "SET_LIGHT"});
					localStorage.setItem("darkMode", value === 1);
				}}/>
			<h4 />
			<Button onClick={store.auth.signOut}>Sign Out</Button>
		</>
	);
};

export default SettingsPage;
