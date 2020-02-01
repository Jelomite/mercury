import React, {createContext, useReducer} from "react";
/*
	This is a very simple boilerplate reducer.
	It allows us to create a global context which gets an initial state and a reducer. just like in redux.
	see example usage in the other files in this directory.
**/
const generateContext = ({initialState = {}, reducer}) => {
	// this will be our context, we can listen to it via useContext(Context).
	const Context = createContext(initialState);
	// provideComponent is a HOC, it allows us to subscribe to the context and access it anywhere inside of our app.
	const provideComponent = Component => {
		const Wrapper = props => {
			const [store, dispatch] = useReducer(reducer, initialState);
			return (
				<Context.Provider value={{store, dispatch}}>
					<Component {...props}/>
				</Context.Provider>
			);
		};
		return Wrapper;
	};

	return [Context, provideComponent];
};

export default generateContext;
