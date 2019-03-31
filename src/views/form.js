import React from "react";
import cx from "classnames";
import * as Question from "../components";
import {FormContext} from "../contexts/form";
import {MatchContext} from "../contexts/match";
import style from "./form.css";

// this function generates a serve-ready component with everything in place.
const questionGen = (question, section, index, {store, dispatch}, color) => {
	switch (question.type) {
	case "enum":
		return <Question.Enum
			color={color}
			options={question.options}
			active={store[section][index].value}
			onClick={value => dispatch({type: "regular", path: `${index}#${section}`, value})}
		/>;
	case "boolean":
		return <Question.Enum
			color={color}
			active={store[section][index].value}
			onClick={value => dispatch({type: "regular", path: `${index}#${section}`, value})}
		/>;
	case "number":
		return <Question.Number
			value={store[section][index].value}
			onClick={{
				right: () => dispatch({
					type: "regular",
					path: `${index}#${section}`,
					value: store[section][index].value + 1,
				}),
				left: () => dispatch({
					type: "regular",
					path: `${index}#${section}`,
					value: Math.max(store[section][index].value - 1, 0),
				}),
			}}
		/>;
	case "text":
		return <Question.Input
			value={store[section][index].value}
			onChange={e => dispatch({type: "regular", path: `${index}#${section}`, value: e.target.value})}
		/>;
	case "multiple":
		return <Question.MultipleChoice
			color={color}
			options={question.options}
			active={store[section][index].value}
			onClick={target => dispatch({
				type: "regular",
				path: `${index}#${section}`,
				// the value should be an array of booleans. i.e. [true, false, false].
				// here we create a new array which merges the previous state with the toggle of the clicked button.
				// example - we had [true, false, false] and we clicked the last button (index of 2), so we get a new array which containes [true, false, true].
				value: Object.assign([], store[section][index].value, {[target]: !store[section][index].value[target]}),
			})}
		/>;
	case "double":
		return <Question.DoubleNumber
			right={store[section][index].options.right.map((question, questionIndex) => (
				{...question, onClick: {
					right: () => dispatch({
						type: "nested",
						path: `${index}#${section}#right#${questionIndex}`,
						value: store[section][index].options.right[questionIndex].value + 1,
					}),
					left: () => dispatch({
						type: "nested",
						path: `${index}#${section}#right#${questionIndex}`,
						// set the value's lower boundry to 0.
						value: Math.max(store[section][index].options.right[questionIndex].value - 1, 0),
					}),
				}}
			))}
			left={store[section][index].options.left.map((question, questionIndex) => (
				{...question, onClick: {
					right: () => dispatch({
						type: "nested",
						path: `${index}#${section}#left#${questionIndex}`,
						value: store[section][index].options.left[questionIndex].value + 1,
					}),
					left: () => dispatch({
						type: "nested",
						path: `${index}#${section}#left#${questionIndex}`,
						// set the value's lower boundry to 0.
						value: Math.max(store[section][index].options.left[questionIndex].value - 1, 0),
					}),
				}}
			))}/>;
	default:
		return null;
	}
};

const Form = () => {
	const {store, dispatch} = React.useContext(FormContext);
	const {store: matchStore} = React.useContext(MatchContext);
	return (
		<div className={cx("form", style)}>
			{Object.entries(store).map((section, sectionIndex) => (
				<React.Fragment key={sectionIndex}>
					<section className={cx("section", style)}>
						<h2>{section[0]}</h2>
						{section[1].map((question, questionIndex) => (
							<div className="question" key={questionIndex}>
								<h4>{question.name} {question.type === "multiple" ? <span className="gray">(M)</span> : ""}</h4>
								{questionGen(question, section[0], questionIndex, {store, dispatch}, matchStore.alliance)}
							</div>
						))}
					</section>
					<hr className="divider"/>
				</React.Fragment>

			))}
		</div>
	);

};

export default Form;
