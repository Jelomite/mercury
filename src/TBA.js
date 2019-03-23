import axios from "axios";
const tbaAddress = "https://www.thebluealliance.com/api/v3";

axios.defaults.headers.common["X-TBA-Auth-Key"] = "QmlkONLXyyeuhXUjOymYQwWzaiGcksqtHpqqCJnR7GGiff1jMgHvUNdvWLMlHorG";

export async function checkStatus() {
	const statusResponse = await axios.get(`${tbaAddress}/status`);
	return statusResponse.status;
}

export async function fetchMatchesForEvent(eventKey) {
	return (await axios.get(`${tbaAddress}/event/${eventKey}/matches/simple`)).data;
}

export async function fetchSingleMatchFromEvent(matchKey) {
	const matches = await fetchMatchesForEvent(matchKey.split("_")[0]);
	const i = matches.findIndex(match => match.key === matchKey);
	return matches[i];
}

export async function fetchTeamsForEvent(eventKey) {
	return (await axios.get(`${tbaAddress}/event/${eventKey}/teams`)).data;
}
