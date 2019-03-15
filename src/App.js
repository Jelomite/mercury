import React, {useContext} from "react";
import {Button, ButtonGroup, Input, ButtonInput} from "./components";
import {FormContext} from "./contexts/form";

const App = () => {
	const {store, dispatch} = useContext(FormContext);

	return (
		<React.Fragment>
			<h3> Rate me! </h3>
			<ButtonGroup>
				{["1", "2", "3", "4", "5"].map((text, index) => (
					<Button
						active={store.rating === index}
						onClick={() => {
							dispatch({type: "SET_RATING", value: index});
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
					dispatch({type: "SET_OPINION", value: e.target.value});
				}}
			/>
			<h3> Amount of balls... </h3>

			<ButtonInput
				value={store.amount}
				onClick={{
					right: () => dispatch({type: "INCREMENT"}),
					left: () => dispatch({type: "DECREMENT"}),
				}}
			/>
		</React.Fragment>
	);
};

export default App;
