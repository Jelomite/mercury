import React, {useState, useEffect, useContext} from "react";
import * as Question from "../components";
import {FormContext} from "../contexts/form";
import {MatchContext} from "../contexts/match";
import {SettingsContext} from "../contexts/settings";
import {compile} from "../validation-parser";
import {db} from "../firebase";
import {Header, Divider} from "semantic-ui-react";

// custom useEffect for form validation.
const useValidation = store => {
	const [valid, setValid] = useState([]);
	useEffect(() => {
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
	const {store, dispatch} = useContext(FormContext);
	const {store: matchStore} = useContext(MatchContext);
	const {store: settingStore} = useContext(SettingsContext);
	const [valid] = useValidation(store);

	// this function generates a serve-ready component with everything in place.
	const questionGen = (question, section, index) => {
		const color = matchStore.alliance;
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

	const handleSubmit = () => {
		// flatten the data from our state to include only the values.
		const flatData = Object.keys(store).reduce((obj, section) => {
			obj[section] = store[section].reduce((questions, question) => {
				questions[question.name] = question.type !== "double" ? question.value :
					// this part is for the "double" questions,
					//it will return all of the inner questions as one object.
					Object.keys(question.options).reduce((sides, side) => {
						sides = {...sides, ...question.options[side].reduce((sideQuestions, sideQuestion) => {
							sideQuestions[sideQuestion.name] = sideQuestion.value;
							return sideQuestions;
						}, {})};
						return sides;
					}, {});
				return questions;
			}, {});
			return obj;
		}, {});
		// upload the data to the db
		db.ref().child("matches/" + matchStore.matchKey).set({[matchStore.teamID]: flatData}, error => {
			if (error) {
				alert(error);
			} else {
				// if upload was successful, go back to homepage
				settingStore.history.push("/");
			}
		});

		// upload individual game data to team history
		db.ref().child("teams/" + matchStore.teamID).push().set({matchID: matchStore.matchKey, ...flatData});
	};

	return (
		<div>
			{Object.entries(store).map((section, sectionIndex) => (
				<React.Fragment key={sectionIndex}>
					<section>
						<Header as="h2" textAlign="center">{section[0]}</Header>
						<section>
							{section[1].map((question, questionIndex) => (
								<div key={questionIndex}>
									<Header as="h4" textAlign="center">{question.name} {question.type === "multiple" ? "(M)" : ""}</Header>
									{questionGen(question, section[0], questionIndex)}
								</div>
							))}
						</section>
					</section>
					<Divider />
				</React.Fragment>

			))}
			<section>
				<Header as="h2" textAlign="center">Submission</Header>
				<Header as="h3" textAlign="center">fix the following values to submit form:</Header>
				<section>
					<pre>
						{valid.map(el => el.test || `${el.section} - ${el.name}\n`)}
					</pre>
					<Question.Button disabled={valid.filter(el => !el.test).length !== 0} onClick={handleSubmit}>
						Submit
					</Question.Button>
				</section>
			</section>
		</div>
	);

};

export default Form;
