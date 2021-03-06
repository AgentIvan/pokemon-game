import { useRouteMatch, Switch, Route } from "react-router-dom";

import StartPage from "./StartPage";
import BoardPage from "./BoardPage";
import FinishPage from "./FinishPage";

const GamePage = () => {
	const match = useRouteMatch();

	return (
		<Switch>
			<Route exact path={`${match.path}/`} component={StartPage} />
			<Route path={`${match.path}/board`} component={BoardPage} />
			<Route path={`${match.path}/finish`} component={FinishPage} />
		</Switch>
	);
};

export default GamePage;
