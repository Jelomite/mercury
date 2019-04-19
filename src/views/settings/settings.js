import React, {useState} from "react";
import style from "./settings.module.css";
import gearIcon from "../../img/settings.svg";
import closeIcon from "../../img/close.svg";
import Content from "./content";

const Gear = props => (
	<img className={style.icon} src={gearIcon} alt="settings" {...props}/>
);

const Modal = props => (
	<div id="root" className={style.modal}>
		<img className={style.icon} src={closeIcon} alt="close" {...props}/>
		<Content />
	</div>
);

const Settings = () => {
	const [visible, setVisible] = useState(false);
	return visible ? (
		<Modal onClick={() => setVisible(!visible)}/>
	) : (
		<Gear onClick={() => setVisible(!visible)}/>
	);
};

export default Settings;
