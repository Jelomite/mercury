import React, {useContext} from "react";
import {Enum, Input, Number} from "./components";
import {FormContext} from "./contexts/form";

const App = () => {
	const {store, dispatch} = useContext(FormContext);

	return (
		<React.Fragment>
			<h3> Rate me! </h3>
			<Enum
				active={store.rating}
				onClick={index => {
					dispatch({type: "SET_RATING", value: index});
				}}
			/>
			<h3> Leave a comment </h3>
			<Input
				value={store.text}
				onChange={e => {
					dispatch({type: "SET_OPINION", value: e.target.value});
				}}
			/>
			<h3> Amount of balls... </h3>
			<Number
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
