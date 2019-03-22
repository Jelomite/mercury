import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import * as Question from "../components";
import {FormContext} from "../contexts/form";
import style from "./form.css";

const Double = props => {
	const {section, index} = props;
	const {store, dispatch} = React.useContext(FormContext);

	const QuestionType = props => {
		const {question, questionIndex} = props;
		switch(question.type) {
		case "enum":
			return (
				<Question.Enum
					options={question.options}
					active={store[section][index].options[props.side][questionIndex].value}
					onClick={value => dispatch({
						type: "nested",
						path: `${index}#${section}#${props.side}#${questionIndex}`,
						value,
					})}
				/>
			);
		case "number":
			return (
				<Question.Number
					options={question.options}
					value={store[section][index].options[props.side][questionIndex].value}
					onClick={{
						right: () => dispatch({
							type: "nested",
							path: `${index}#${section}#${props.side}#${questionIndex}`,
							value: store[section][index].options[props.side][questionIndex].value + 1}),
						left: () => dispatch({
							type: "nested",
							path: `${index}#${section}#${props.side}#${questionIndex}`,
							value: Math.max(store[section][index].options[props.side][questionIndex].value - 1, 0),
						}),
					}}
				/>
			);
		default:
			return null;
		}
	};

	QuestionType.propTypes = {
		side: PropTypes.string,
		question: PropTypes.objectOf(
			PropTypes.number,
			PropTypes.string,
			PropTypes.func,
		),
		questionIndex: PropTypes.number,
	};

	return (
		<div className="double">
			<section className="right">
				{
					store[section][index].options.right.map((question, questionIndex) => {
						return (
							<React.Fragment key={questionIndex}>
								<h5>{question.name}</h5>
								<QuestionType
									side="right"
									question={question}
									questionIndex={questionIndex}/>
							</React.Fragment>
						);})
				}
			</section>
			<section className="seperator" />
			<section className="left">
				{
					store[section][index].options.left.map((question, questionIndex) => {
						return (
							<React.Fragment key={questionIndex}>
								<h5>{question.name}</h5>
								<QuestionType
									side="left"
									question={question}
									questionIndex={questionIndex}/>
							</React.Fragment>
						);})
				}
			</section>
		</div>
	);
};

Double.propTypes = {
	index: PropTypes.number,
	section: PropTypes.string,
};

const questionGen = (question, section, index, {store, dispatch}) => {
	switch (question.type) {
	case "enum":
		return <Question.Enum
			options={question.options}
			active={store[section][index].value}
			onClick={value => dispatch({type: "regular", path: `${index}#${section}`, value})}
		/>;
	case "boolean":
		return <Question.Enum
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
			options={question.options}
			active={store[section][index].value}
			onClick={target => dispatch({
				type: "regular",
				path: `${index}#${section}`,
				value: Object.assign([], store[section][index].value, {[target]: !store[section][index].value[target]}),
			})}
		/>;
	case "double":
		return <Double section={section} index={index}/>;
	default:
		return null;
	}
};

const Form = () => {
	const {store, dispatch} = React.useContext(FormContext);
	return (
		<div className={cx("form", style)}>
			{Object.entries(store).map((section, sectionIndex) => (
				<React.Fragment key={sectionIndex}>
					<section className={cx("section", style)}>
						<h2>{section[0]}</h2>
						{section[1].map((question, questionIndex) => (
							<div className="question" key={questionIndex}>
								<h4>{question.name} {question.type === "multiple" ? <span className="gray">(M)</span> : ""}</h4>
								{questionGen(question, section[0], questionIndex, {store, dispatch})}
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
