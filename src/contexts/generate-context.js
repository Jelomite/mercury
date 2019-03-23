import React, {createContext, useReducer} from "react";

const generateContext = ({initialState = {}, reducer}) => {
	const Context = createContext(initialState);
	const provideComponent = Component => {
		const wrapper = props => {
			const [store, dispatch] = useReducer(reducer, initialState);
			return (
				<Context.Provider value={{store, dispatch}}>
					<Component {...props}/>
				</Context.Provider>
			);
		};
		return wrapper;
	};
	return [Context, provideComponent];

};

export default generateContext;
