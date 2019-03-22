import generateContext from "./generate-context";
import blueprint from "../blueprint.json";

export const [FormContext, provideComponent] = generateContext({
	initialState: {...blueprint},
	reducer: (state, action) => {
		if (action.type === "regular") {
			const [index, section] = action.path.split("#");
			state[section][index].value = action.value;
			return {...state};
		} else if (action.type === "nested") {
			const [index, section, side, innerIndex] = action.path.split("#");
			state[section][index].options[side][innerIndex].value = action.value;
			return {...state};
		}

	},
});
