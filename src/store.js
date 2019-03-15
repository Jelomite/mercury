import React from "react";

export const initialState = {
	active: -1,
	text: "",
	count: 0,
};

export const reducer = (state, action) => {
	switch (action.type) {
	case "SET_ACTIVE":
		return {...state, active: action.value};
	case "UPDATE_TEXT":
		return {...state, text:action.value};
	case "INCREMENT":
		return {...state, count: state.count + 1};
	case "DECREMENT":
		return {...state, count: state.count > 0 ? state.count - 1 : 0};
	default:
		return state;
	}
};

export const Context = React.createContext();
