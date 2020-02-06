import React, {useEffect, useState, useContext} from "react";
import {Input, Button, Spacer} from "../../components";
import * as TBA from "../../TBA";
import {Link} from "react-router-dom";
import {SettingsContext} from "../../contexts/settings";
import {Header} from "semantic-ui-react";

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
				callback(upcoming ? upcoming.key : event + "_");
			}
		};
		getNextMatch(store.event, upcoming => setMatch(upcoming));
		return () => {cancel = true;};
	}, [store.event]);

	return (
		<div>
			<Header as="h1">Scouting</Header>
			<Header as="h4">choose match</Header>
			<Input value={match} onChange={e => setMatch(e.target.value)}/>
			<Spacer />
			<Link to={"scouting/" + match}>
				<Button disabled={!matchList.includes(match)}>Scout!</Button>
			</Link>
		</div>
	);
};

export default MatchList;
