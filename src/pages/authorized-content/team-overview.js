import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {db} from "../../firebase";

const TeamOverview = props => {
	const [teamData, setTeamData] = useState([]);
	useEffect(() => {
		db.ref().child("teams/" + props.match.params.teamID).once("value", snap => {
			console.log(snap.val());
			setTeamData(snap.val());
		});

	}, [props.match.params.teamID]);

	return (
		<div>
			{JSON.stringify(teamData)}
		</div>
	);
};

TeamOverview.propTypes = {
	match: PropTypes.object,
};

export default TeamOverview;
