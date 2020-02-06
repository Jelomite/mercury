import React, {useState} from "react";
import gearIcon from "../../img/settings.svg";
import closeIcon from "../../img/close.svg";
import Content from "./content";
import {Image} from "semantic-ui-react";

const Gear = props => (
	<Image size="mini" src={gearIcon} alt="settings" {...props}/>
);

const Modal = props => (
	<div>
		<Image size="mini" src={closeIcon} alt="close" {...props}/>
		<Content />
	</div>
);

// responsible for viewing and hiding the settings page content.
const Settings = () => {
	const [visible, setVisible] = useState(false);
	return visible ? (
		<Modal onClick={() => setVisible(!visible)}/>
	) : (
		<Gear onClick={() => setVisible(!visible)}/>
	);
};

export default Settings;
