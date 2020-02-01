import generateContext from "./generate-context";

export const [SettingsContext, provideSettings] = generateContext({
	initialState: {
		darkMode: false,
		auth: {},
		history: {},
		event: "2019tes",
	},
	reducer: (state, action) => {
		switch(action.type) {
		case "SET_DARK":
			return {...state, darkMode: true};
		case "SET_LIGHT":
			return {...state, darkMode: false};
		case "SET_AUTH":
			return {...state, auth: action.data};
		case "SET_HISTORY":
			return {...state, history: action.data};
		case "SET_EVENT":
			return {...state, event: action.data};
		default:
			return {...state};
		}
	},
});
