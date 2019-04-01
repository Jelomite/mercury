import React, {useContext} from "react";
import {Enum} from "../../components";
import {SettingsContext} from "../../contexts/settings";

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
					if(value === 1) {
						document.body.classList.add("dark");
					} else {
						document.body.classList.remove("dark");
					}
				}}/>
		</>
	);
};

export default SettingsPage;