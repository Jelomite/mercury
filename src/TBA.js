import axios from "axios";
const tbaAddress = "https://www.thebluealliance.com/api/v3";
// this is our TBA API which we will use to get data from TBA.

// set the default headers to contain the authentication key. this method is NOT recommended - the token is visible to everyone.
axios.defaults.headers.common["X-TBA-Auth-Key"] = "QmlkONLXyyeuhXUjOymYQwWzaiGcksqtHpqqCJnR7GGiff1jMgHvUNdvWLMlHorG";

// lets us to check the status of TBA.
export async function checkStatus() {
	const statusResponse = await axios.get(`${tbaAddress}/status`);
	return statusResponse.status;
}

// get all the matches data from specified event.
export async function fetchMatchesForEvent(eventKey) {
	return (await axios.get(`${tbaAddress}/event/${eventKey}/matches/simple`)).data;
}

// gets a single match from the specified event - simply filters the fetchMatchesForEvent method.
export async function fetchSingleMatchFromEvent(matchKey) {
	const matches = await fetchMatchesForEvent(matchKey.split("_")[0]);
	const i = matches.findIndex(match => match.key === matchKey);
	return matches[i];
}

// list of teams in event.
export async function fetchTeamsForEvent(eventKey) {
	return (await axios.get(`${tbaAddress}/event/${eventKey}/teams`)).data;
}
