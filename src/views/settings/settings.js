import React, {useState} from "react";
import cx from "classnames";
import style from "./settings.css";
import gearIcon from "../../img/settings.svg";
import closeIcon from "../../img/close.svg";
import Content from "./content";

const Gear = props => (
	<div className={cx("icon", style)}>
		<img src={gearIcon} alt="settings" {...props}/>
	</div>
);

const Modal = props => (
	<div id="root" className={cx("modal", style)}>
		<img className="close" src={closeIcon} alt="close" {...props}/>
		<div className="content">
			<Content />
		</div>
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
