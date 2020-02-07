import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {db} from "../../firebase";

const TeamOverview = props => {
	const [teamData, setTeamData] = useState([]);
	const [parsedData, setParsedData] = useState({});
	// fetch raw data about the team from the db
	useEffect(() => {
		db.ref().child("teams/" + props.match.params.teamID).once("value", snap => {
			console.log(snap.val());
			setTeamData(snap.val());
		});

	}, [props.match.params.teamID]);

	// each time the data changes we parse it again
	useEffect(() => {
		const gamesPlayed = Object.entries(teamData).length;
		const climbAmount = Object.values(teamData).reduce((acc, match) => {
			return acc + match.endgame["Climbed?"];
		}, 0);
		setParsedData({gamesPlayed, climbAmount});
	}, [teamData]);

	return (
		<div>
			{JSON.stringify(parsedData)}
		</div>
	);
};

TeamOverview.propTypes = {
	match: PropTypes.object,
};

export default TeamOverview;
