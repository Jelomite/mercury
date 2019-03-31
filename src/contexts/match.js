import generateContext from "./generate-context";

export const [MatchContext, provideMatch] = generateContext({
	// this context stores the meta data of the form - everything that's not the data inside of the questions.
	initialState: {
		matchKey: "",
		match: "", // the match of the form
		teamID: -1,
		alliance: "", // which alliance the team is playing in.
		red: [], // list of  teams in the red alliance
		blue: [], //same but in blue
	},
	reducer: (state, action) => {
		switch(action.type) {
		case "SET_MATCHKEY":
			return {...state, matchKey: action.value};
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
