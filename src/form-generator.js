import React from "react";
import blueprint from "./blueprint.json";
import * as Question from "./components";

const initialState = {...blueprint};
const questionHash = (section, index) => `${index}#${section}`;
const reducer = (state, action) => {
	const [index, section] = action.type.split("#");
	state[section][index].value = action.value;
	return {...state};
};
const GeneratedFormContext = React.createContext(initialState);
const GeneratedFormContextProvider = props => {
	const [store, dispatch] = React.useReducer(reducer, initialState);
	return (
		<GeneratedFormContext.Provider value={{store, dispatch}}>
			{props.children}
		</GeneratedFormContext.Provider>
	);
};

const questionGen = (question, section, index, {store, dispatch}) => {
	switch (question.type) {
	case "enum":
		return <Question.Enum
			options={question.options}
			active={store[section][index].value}
			onClick={value => dispatch({type: questionHash(section, index), value})}
		/>;
	case "boolean":
		return <Question.Enum
			active={store[section][index].value}
			onClick={value => dispatch({type: questionHash(section, index), value})}
		/>;
	case "number":
		return <Question.Number
			value={store[section][index].value}
			onClick={{
				right: () => dispatch({type: questionHash(section, index), value: store[section][index].value + 1}),
				left: () => dispatch({type: questionHash(section, index), value: Math.max(store[section][index].value - 1, 0)}),
			}}
		/>;
	case "text":
		return <Question.Input
			value={store[section][index].value}
			onChange={e => dispatch({type: questionHash(section, index), value: e.target.value})}
		/>;
	default:
		return null;
	}
};

const Form = () => {
	const {store, dispatch} = React.useContext(GeneratedFormContext);
	return (
		<div className="form">
			{Object.entries(blueprint).map((section, sectionIndex) => (
				<div className="section" key={sectionIndex}>
					<h2>{section[0]}</h2>
					{section[1].map((question, questionIndex) => (
						<div className="question" key={questionIndex}>
							<h3>{question.name}</h3>
							{questionGen(question, section[0], questionIndex, {store, dispatch})}
						</div>
					))}
				</div>
			))}
		</div>
	);

};

const ProvidedForm = () => (
	<GeneratedFormContextProvider><Form /></GeneratedFormContextProvider>
);

export default ProvidedForm;
