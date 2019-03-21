import React from "react";
import cx from "classnames";
import * as Question from "../components";
import blueprint from "../blueprint.json";
import {FormContext} from "../contexts/form";
import style from "./form.css";

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
		<div className={cx("form", style)}>
			{Object.entries(blueprint).map((section, sectionIndex) => (
				<section className={cx("section", style)} key={sectionIndex}>
					<h2>{section[0]}</h2>
					{section[1].map((question, questionIndex) => (
						<div className="question" key={questionIndex}>
							<h3>{question.name}</h3>
							{questionGen(question, section[0], questionIndex, {store, dispatch})}
						</div>
					))}
				</section>
			))}
		</div>
	);

};

export default Form;
