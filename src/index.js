import React, {useReducer} from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style.css";
import {Context, initialState, reducer} from "./store";

const Index = () => {
	const [store, dispatch] = useReducer(reducer, initialState);
	return (
		<Context.Provider value={{store, dispatch}}>
			<App />
		</Context.Provider>
	);
};

ReactDOM.render(<Index />, document.getElementById("root"));
