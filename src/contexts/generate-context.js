import React, {createContext, useReducer} from "react";

const generateContext = ({initialState = {}, reducer}) => {
	const Context = createContext(initialState);
	const provideComponent = Component => {
		const wrapper = () => {
			const [store, dispatch] = useReducer(reducer, initialState);
			return (
				<Context.Provider value={{store, dispatch}}>
					<Component />
				</Context.Provider>
			);
		};
		return wrapper;
	};
	return [Context, provideComponent];

};

export default generateContext;
