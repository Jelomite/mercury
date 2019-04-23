import React, {useEffect, useState, useContext} from "react";
import {Input, Button, Spacer} from "../../components";
import * as TBA from "../../TBA";
import {Link} from "react-router-dom";
import {SettingsContext} from "../../contexts/settings";

const MatchList = () => {
	const [match, setMatch] = useState("");
	const {store} = useContext(SettingsContext);
	useEffect( () => {
		let cancel = false;
		// get the next match in event
		const getNextMatch = async (event, callback) => {
			const matches = await TBA.fetchMatchesForEvent(event);
			const lastMatch = matches[0]; // TODO: implement this...
			if (!cancel) {
				callback(lastMatch);
			}
		};
		getNextMatch(store.event, lastMatch => setMatch(lastMatch));
		return () => {cancel = true;};
	}, []);

	return (
		<div>
			<h1>Scouting</h1>
			<h4>choose match</h4>
			<Input value={match} onChange={e => setMatch(e.target.value)}/>
			<Spacer />
			<Link to={"scouting/" + match}>
				<Button>Scout!</Button>
			</Link>
		</div>
	);
};

export default MatchList;
