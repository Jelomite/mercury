import React from "react";
import cx from "classnames";
import * as Component from "../components";
import {MatchContext} from "../contexts/match";
import style from "./team-selector.css";
import * as TBA from "../TBA";

const Table = () => {
	const {store, dispatch} = React.useContext(MatchContext);
	React.useEffect(() => {
		TBA.fetchSingleMatchFromEvent("2019isde3_f1m1").then(r => {
			dispatch({type: "SET_BLUE", value: r.alliances.blue.team_keys.map(team => team.replace("frc", ""))});
			dispatch({type: "SET_RED", value: r.alliances.red.team_keys.map(team => team.replace("frc", ""))});
		});
	}, []);
	return (
		<React.Fragment>
			<h1>Qualifier #47</h1>
			<div className={cx("container", style)}>
				{
					store.teamID !== -1 ? (
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

export default Table;
