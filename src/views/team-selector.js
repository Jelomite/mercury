import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import * as Component from "../components";
import {MatchContext} from "../contexts/match";
import style from "./team-selector.css";
import * as TBA from "../TBA";

// parse the matchKey to readable format. this will later be stored in the store.match
const parseMatch = matchKey => {
	const tokens = matchKey.split(/\d+/);
	const parsedTokens = tokens.map(token => {
		switch(token) {
		case "sf":
			return "Semi Final";
		case "f":
			return "Final";
		case "q":
			return "Qualifier";
		case "m":
			return "Match";
		default:
			return "";
		}
	});
	const numbers = matchKey.split(/[a-z]+/).slice(1, 3);
	const connected = parsedTokens.slice(0, 2).map((word, i) => `${word} ${numbers[i]} `);
	return connected;
};

const Table = props => {
	const {store, dispatch} = React.useContext(MatchContext);
	React.useEffect(() => {
		//TODO: this matchKey shouldn't be hardcoded.
		TBA.fetchSingleMatchFromEvent(props.match).then(r => {
			// setting initial state of MatchContext.
			dispatch({type: "SET_MATCHKEY", value: props.match});
			dispatch({type: "SET_BLUE", value: r.alliances.blue.team_keys.map(team => team.replace("frc", ""))});
			dispatch({type: "SET_RED", value: r.alliances.red.team_keys.map(team => team.replace("frc", ""))});
			dispatch({type: "SET_MATCH", value: parseMatch(props.match.split("_")[1])});
		});
	}, []);
	return (
		<React.Fragment>
			<h1>{store.match}</h1>
			<div className={cx("container", style)}>
				{
					// display the selection component. if the client chose a team, display its ID instead.
					store.teamID !== -1 ? ( // -1 is the defualt value of the ID.
						<h4 className="team">Team #{store.teamID}</h4>
					) : (
						<React.Fragment>
							{
								store.blue.map((team, index) => (
									<Component.ButtonGroup key={index}>
										<Component.Button tinted color="blue"
											onClick={() => {
												dispatch({
													type: "SET_TEAMID",
													value: team,
												});
												dispatch({type: "BLUE_ALLIANCE"});
											}}
										>
											{team}
										</Component.Button>
										<Component.Button tinted color="red"
											onClick={() => {
												dispatch({
													type: "SET_TEAMID",
													value: store.red[index],
												});
												dispatch({type: "RED_ALLIANCE"});
											}}
										>
											{store.red[index]}
										</Component.Button>
									</Component.ButtonGroup>
								))
							}
						</React.Fragment>
					)
				}
			</div>
		</React.Fragment>
	);
};

Table.propTypes = {
	match: PropTypes.string,
};

export default Table;
