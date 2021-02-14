import { useRouteMatch, Switch, Route } from "react-router-dom";

import { PokemonProvider } from "../../context/pokemonContext";
import { PlayerCardsProvider } from "../../context/playersCardsContext";
import { GameResultProvider } from "../../context/gameResultContext";

import StartPage from "./StartPage";
import BoardPage from "./BoardPage";
import FinishPage from "./FinishPage";

const GamePage = () => {
	const match = useRouteMatch();

	return (
		<PokemonProvider>
			<PlayerCardsProvider>
				<GameResultProvider>
					<Switch>
						<Route exact path={`${match.path}/`} component={StartPage} />
						<Route path={`${match.path}/board`} component={BoardPage} />
						<Route path={`${match.path}/finish`} component={FinishPage} />
					</Switch>
				</GameResultProvider>
			</PlayerCardsProvider>
		</PokemonProvider>
	);
};

export default GamePage;
