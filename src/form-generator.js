import React from "react";
import blueprint from "./blueprint.json";
import * as Question from "./components";
import generateContext from "./generate-context";

const [FormContext, provideComponent] = generateContext({
	initialState: {...blueprint},
	reducer: (state, action) => {
		const [index, section] = action.type.split("#");
		state[section][index].value = action.value;
		return {...state};
	},
});

const questionGen = (question, section, index, {store, dispatch}) => {
	switch (question.type) {
	case "enum":
		return <Question.Enum
			options={question.options}
			active={store[section][index].value}
			onClick={value => dispatch({type: `${index}#${section}`, value})}
		/>;
	case "boolean":
		return <Question.Enum
			active={store[section][index].value}
			onClick={value => dispatch({type: `${index}#${section}`, value})}
		/>;
	case "number":
		return <Question.Number
			value={store[section][index].value}
			onClick={{
				right: () => dispatch({type: `${index}#${section}`, value: store[section][index].value + 1}),
				left: () => dispatch({type: `${index}#${section}`, value: Math.max(store[section][index].value - 1, 0)}),
			}}
		/>;
	case "text":
		return <Question.Input
			value={store[section][index].value}
			onChange={e => dispatch({type: `${index}#${section}`, value: e.target.value})}
		/>;
	default:
		return null;
	}
};

const Form = () => {
	const {store, dispatch} = React.useContext(FormContext);
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

export default provideComponent(Form);
