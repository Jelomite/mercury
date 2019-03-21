import generateContext from "./generate-context";
import blueprint from "../blueprint.json";

export const [FormContext, provideComponent] = generateContext({
	initialState: {...blueprint},
	reducer: (state, action) => {
		const [index, section] = action.type.split("#");
		state[section][index].value = action.value;
		return {...state};
	},
});
