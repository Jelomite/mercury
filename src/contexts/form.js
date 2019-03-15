import React, {createContext, useReducer} from "react";

const initialState = {
	rating: -1,
	opinion: "",
	amount: 0,
};

export const FormContext = createContext(initialState);

const reducer = (state, action) => {
	switch (action.type) {
	case "SET_RATING":
		return {...state, rating: action.value};
	case "SET_OPINION":
		return {...state, opinion: action.value};
	case "INCREMENT":
		return {...state, amount: state.amount + 1};
	case "DECREMENT":
		return {...state, amount: state.amount > 0 ? state.amount - 1 : 0};
	default:
		return state;
	}
};

export const FormContextProvider = props => {
	const [store, dispatch] = useReducer(reducer, initialState);

	return (
		<FormContext.Provider value={{store, dispatch}}>
			{props.children}
		</FormContext.Provider>
	);
};
