import React, {useEffect, useState, useContext} from "react";
import {Dropdown, Button, Spacer} from "../../components";
import * as TBA from "../../TBA";
import {Link} from "react-router-dom";
import {SettingsContext} from "../../contexts/settings";

// parse the matchKey to readable format. this will later be stored in the store.match
const parseMatch = eventMatchKey => {
	const [, matchKey] = eventMatchKey.split("_");
	const tokens = matchKey.split(/\d+/);
	const parsedTokens = tokens.map(token => {
		switch(token) {
		case "qf":
			return "Quarter Final";
		case "sf":
			return "Semi Final";
		case "f":
			return "Final";
		case "qm":
			return "Qualifier";
		case "m":
			return "Match";
		default:
			return "";
		}
	});
	const numbers = matchKey.split(/[a-z]+/).slice(1, 3);
	const connected = parsedTokens.filter(word => word).map((word, i) => `${word} ${numbers[i]} `);
	return connected;
};

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
				const sorted = matches.sort((a, b) => a.time - b.time);
				setMatchList(matches.map(match => match.key));
				const upcoming = sorted.filter(match => !match.actual_time)[0];
				callback(upcoming ? upcoming.key : "");
			}
		};
		getNextMatch(store.event, upcoming => setMatch(upcoming));
		return () => {cancel = true;};
	}, [store.event]);

	const options = matchList.map(matchString => ({value: matchString, text: parseMatch(matchString)}));

	return (
		<div>
			<h1>Scouting</h1>
			<h4>choose match</h4>
			<Dropdown options={options} onChange={e => setMatch(e.target.value)} value={match}/>
			<Spacer />
			<Link to={"scouting/" + match}>
				<Button disabled={!matchList.includes(match)}>Scout!</Button>
			</Link>
		</div>
	);
};

export default MatchList;
