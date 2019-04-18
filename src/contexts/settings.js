import generateContext from "./generate-context";

export const [SettingsContext, provideSettings] = generateContext({
	initialState: {
		darkMode: false,
		auth: {},
	},
	reducer: (state, action) => {
		switch(action.type) {
		case "SET_DARK":
			return {...state, darkMode: true};
		case "SET_LIGHT":
			return {...state, darkMode: false};
		case "SET_AUTH":
			return {...state, auth: action.data};
		default:
			return {...state};
		}
	},
});
