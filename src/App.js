import React, {useState} from "react";
import {Button, ButtonGroup} from "./components/button";

const App = () => {
	const [active, setActive] = useState("-1");
	return (
		<ButtonGroup>
			<Button active={active === "0"} onClick={() => {setActive("0");}}> Option A</Button>
			<Button active={active === "1"} onClick={() => {setActive("1");}}> Option B</Button>
			<Button active={active === "2"} onClick={() => {setActive("2");}}> Option C </Button>
		</ButtonGroup>
	);
};

export default App;
