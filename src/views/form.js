import React from "react";
import cx from "classnames";
import * as Question from "../components";
import {FormContext} from "../contexts/form";
import style from "./form.css";

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
				right: () => dispatch({type: "regular", path: `${index}#${section}`, value: store[section][index].value + 1}),
				left: () => dispatch({type: "regular", path: `${index}#${section}`, value: Math.max(store[section][index].value - 1, 0)}),
			}}
		/>;
	case "text":
		return <Question.Input
			value={store[section][index].value}
			onChange={e => dispatch({type: "regular", path: `${index}#${section}`, value: e.target.value})}
		/>;
	case "double":
		return (
			<div className="double">
				<section className="right">
					{
						store[section][index].options.right.map((innerQuestion, innerIndex) => {
							switch (innerQuestion.type) {
							case "enum":
								return (
									<React.Fragment>
										<h5>{innerQuestion.name}</h5>
										<Question.Enum
											options={innerQuestion.options}
											active={store[section][index].options.right[innerIndex].value}
											onClick={value => dispatch({
												type: "nested",
												path: `${index}#${section}#right#${innerIndex}`,
												value,
											})}
										/>
									</React.Fragment>
								);
							case "number":
								return (
									<React.Fragment>
										<h5>{innerQuestion.name}</h5>
										<Question.Number
											options={innerQuestion.options}
											value={store[section][index].options.right[innerIndex].value}
											onClick={{
												right: () => dispatch({
													type: "nested",
													path: `${index}#${section}#right#${innerIndex}`,
													value: store[section][index].options.right[innerIndex].value + 1}),
												left: () => dispatch({
													type: "nested",
													path: `${index}#${section}#right#${innerIndex}`,
													value: Math.max(store[section][index].options.right[innerIndex].value - 1, 0),
												}),
											}}
										/>
									</React.Fragment>
								);
							}
						}
						)
					}
				</section>
				<section className="seperator"/>
				<section className="left">
					{
						store[section][index].options.left.map((innerQuestion, innerIndex) => {
							switch (innerQuestion.type) {
							case "enum":
								return (
									<React.Fragment>
										<h5>{innerQuestion.name}</h5>
										<Question.Enum
											options={innerQuestion.options}
											active={store[section][index].options.left[innerIndex].value}
											onClick={value => dispatch({
												type: "nested",
												path: `${index}#${section}#left#${innerIndex}`,
												value,
											})}
										/>
									</React.Fragment>
								);
							case "number":
								return (
									<React.Fragment>
										<h5>{innerQuestion.name}</h5>
										<Question.Number
											options={innerQuestion.options}
											value={store[section][index].options.left[innerIndex].value}
											onClick={{
												right: () => dispatch({
													type: "nested",
													path: `${index}#${section}#left#${innerIndex}`,
													value: store[section][index].options.left[innerIndex].value + 1}),
												left: () => dispatch({
													type: "nested",
													path: `${index}#${section}#left#${innerIndex}`,
													value: Math.max(store[section][index].options.left[innerIndex].value - 1, 0),
												}),
											}}
										/>
									</React.Fragment>
								);
							}
						}
						)
					}
				</section>
			</div>
		);
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
								<h4>{question.name}</h4>
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
