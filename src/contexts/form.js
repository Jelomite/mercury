import generateContext from "./generate-context";
import blueprint from "../blueprint.json";

// this will be our global state of the answers of our form. It has the structure of the form as well as the values assigned to each question.
export const [FormContext, provideComponent] = generateContext({
	// we will use a json file blueprint as our initial state - it has all the data needed.
	initialState: {...blueprint},
	reducer: (state, action) => {
		// the reducer is in charge of setting our values to the questions.
		// the design behind the reducer is as follows:
		// the action object has 3 attributes - type, path, value.
		// the type can be "regular" or "nested" - it will determine the way the path is being deconstructed.
		// the path is there to specify which question inside of our huge state needs to be changed.
		// and the value overwrites the current value of the state.
		if (action.type === "regular") {
			const [index, section] = action.path.split("#");
			state[section][index].value = action.value;
			return {...state};
		} else if (action.type === "nested") {
			const [index, section, side, innerIndex] = action.path.split("#");
			state[section][index].options[side][innerIndex].value = action.value;
			return {...state};
		} else if (action.type === "RESET") {
			return {...blueprint};
		}
	},
});
