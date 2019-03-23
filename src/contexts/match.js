import generateContext from "./generate-context";

export const [MatchContext, provideMatch] = generateContext({
	initialState: {
		match: "",
		teamID: -1,
		alliance: "",
		red: [],
		blue: [],
	},
	reducer: (state, action) => {
		switch(action.type) {
		case "RED_ALLIANCE":
			return {...state, alliance: "red"};
		case "BLUE_ALLIANCE":
			return {...state, alliance: "blue"};
		case "SET_TEAMID":
			return {...state, teamID: action.value};
		case "SET_MATCH":
			return {...state, match: action.value};
		case "SET_RED":
			return {...state, red: action.value};
		case "SET_BLUE":
			return {...state, blue: action.value};
		default:
			return {...state};
		}
	},
});
