import React, {useEffect, useState, useContext} from "react";
import {Input, Button, Spacer} from "../../components";
import * as TBA from "../../TBA";
import {Link} from "react-router-dom";
import {SettingsContext} from "../../contexts/settings";

const MatchList = () => {
	const [match, setMatch] = useState("");
	const [matchList, setMatchList] = useState([]);
	const {store} = useContext(SettingsContext);
	useEffect( () => {
		let cancel = false;
		// get the next match in event
		const getNextMatch = async (event, callback) => {
			if (!cancel) {
				const matches = await TBA.fetchMatchesForEvent(event);
				setMatchList(matches.map(match => match.key));
				const sorted = matches.sort((a, b) => a.time - b.time);
				const upcoming = sorted.filter(match => !match.actual_time)[0];
				callback(upcoming.key);
			}
		};
		getNextMatch(store.event, upcoming => setMatch(upcoming));
		return () => {cancel = true;};
	}, []);

	return (
		<div>
			<h1>Scouting</h1>
			<h4>choose match</h4>
			<Input value={match} onChange={e => setMatch(e.target.value)}/>
			<Spacer />
			<Link to={"scouting/" + match}>
				<Button disabled={!matchList.includes(match)}>Scout!</Button>
			</Link>
		</div>
	);
};

export default MatchList;
