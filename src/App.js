import React, {useState} from "react";
import {Button, ButtonGroup, Input} from "./components";

const App = () => {
	const [active, setActive] = useState("-1");
	return (
		<React.Fragment>
			<ButtonGroup>
				{["1", "2", "3", "4", "5"].map((text, index) => (
					<Button active={active === text} onClick={() => {setActive(text);}} key={index}>{text}</Button>
				))}
			</ButtonGroup>

			<Input placeholder="hello"> </Input>
		</React.Fragment>
	);
};

export default App;
