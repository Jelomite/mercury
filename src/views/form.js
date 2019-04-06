import React from "react";
import cx from "classnames";
import * as Question from "../components";
import {FormContext} from "../contexts/form";
import {MatchContext} from "../contexts/match";
import {SettingsContext} from "../contexts/settings";
import style from "./form.css";
import {compile} from "../validation-parser";

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

// custom useEffect for form validation.
const useValidation = store => {
	const [valid, setValid] = React.useState([]);
	React.useEffect(() => {
		let errors = [];
		for (const section in store) {
			for (const question of store[section]) {
				const test = question.validation ?
					compile(question.validation, {...question, parent: store[section]}) :
					true;
				errors.push({test, name: question.name, value: question.value, section});
			}
		}
		setValid(errors);
	}, [store]);
	return [valid, setValid];
};

const Form = () => {
	const {store, dispatch} = React.useContext(FormContext);
	const {store: matchStore} = React.useContext(MatchContext);
	const {store: settingStore, dispatch: settingsDispatch} = React.useContext(SettingsContext);
	const [valid] = useValidation(store);

	React.useEffect(() => {
		// here we check if the localStorage has a defined theme.
		const localTheme = localStorage.getItem("darkMode");
		// it can be only three options - "true", "false" & null (in case it's the first time the client has loaded the app).
		if (localTheme !== null && settingStore.darkMode.toString() !== localTheme) {
			// if it's not null ("true" or "false"), and the localStorage differs from our context, we must update the context.
			settingsDispatch({type: localTheme === "true" ? "SET_DARK" : "SET_LIGHT"});
		} else {
			//otherwise, if the localStorage is null (it can't be the other option because it will never happen), we update the localStorage.
			// this will happen only on the first time when the client has run the app.
			localStorage.setItem("darkMode", settingStore.darkMode);
		}
		// changing the context state is meaninless if we dont do anything about the theme itself.
		// changing the theme we must add or remove the "dark" class from the body tag.
		// we will set to dark theme only if the darkMode context is true. otherwise  - we will set it to light, which is the defualt state.
		settingStore.darkMode ?
			document.body.classList.add("dark") :
			document.body.classList.remove("dark");
	}, [settingStore.darkMode]); // this useEffect will only run if the darkMode has changed.
	return (
		<div className={cx("form", style)}>
			{Object.entries(store).map((section, sectionIndex) => (
				<React.Fragment key={sectionIndex}>
					<section className={cx("section", style)}>
						<h2>{section[0]}</h2>
						<section className="inner">
							{section[1].map((question, questionIndex) => (
								<div className="question" key={questionIndex}>
									<h4>{question.name} {question.type === "multiple" ? <span className="gray">(M)</span> : ""}</h4>
									{questionGen(question, section[0], questionIndex, {store, dispatch}, matchStore.alliance)}
								</div>
							))}
						</section>
					</section>
					<hr className="divider"/>
				</React.Fragment>

			))}
			<section className="section" id="validation">
				<h2>Submission</h2>
				<h3>fix the following values to submit form:</h3>
				<section className="inner">
					<pre className="validation">
						{valid.map(el => el.test || `${el.section} - ${el.name}\n`)}
					</pre>
					<Question.ButtonGroup>
						<Question.Button onClick={() => console.log({store})}>
						Submit
						</Question.Button>
					</Question.ButtonGroup>
				</section>
			</section>
		</div>
	);

};

export default Form;
