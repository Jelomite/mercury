import React, {useContext} from "react";
import {Button, ButtonGroup, Input, ButtonInput} from "./components";
import {Context} from "./store";

const App = () => {
	const {store, dispatch} = useContext(Context);

	return (
		<React.Fragment>
			<h3> Rate me! </h3>
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
			<h3> Leave a comment </h3>

			<Input
				placeholder="hello"
				value={store.text}
				onChange={e => {
					dispatch({type: "UPDATE_TEXT", value: e.target.value});
				}}
			/>
			<h3> Amount of balls... </h3>

			<ButtonInput
				onClick={{
					right: () => dispatch({type: "INCREMENT"}),
					left: () => dispatch({type: "DECREMENT"}),
				}}
			/>
		</React.Fragment>
	);
};

export default App;
