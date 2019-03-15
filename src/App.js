import React, {useContext} from "react";
import {Button, ButtonGroup, Input, ButtonInput} from "./components";
import {Context} from "./store";

const App = () => {
	const {store, dispatch} = useContext(Context);

	return (
		<React.Fragment>
			<ButtonGroup>
				{["1", "2", "3", "4", "5"].map((text, index) => (
					<Button
						active={store.active === index}
						onClick={() => {
							dispatch({type: "SET_ACTIVE", value: index});
						}}
						key={index}>{text}
					</Button>
				))}
			</ButtonGroup>

			<Input
				placeholder="hello"
				value={store.text}
				onChange={e => {
					dispatch({type: "UPDATE_TEXT", value: e.target.value});
				}}
			/>
			<ButtonInput
				rightOnClick={() => dispatch({type: "INCREMENT"})}
				leftOnClick={() => dispatch({type: "DECREMENT"})}
			/>
		</React.Fragment>
	);
};

export default App;
