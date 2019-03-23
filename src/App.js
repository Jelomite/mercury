import React from "react";
import Form from "./views/form";
import Table from "./views/team-selector";
import {provideComponent} from "./contexts/form";
import {provideMatch} from "./contexts/match";

const App = () => (
	<React.Fragment>
		<Table />
		<Form />
	</React.Fragment>
);

export default provideComponent(provideMatch(App));
