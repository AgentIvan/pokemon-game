import { useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import cn from "classnames";

import { FirebaseContext } from "../../../context/firebaseContext";
import { usePlayersCards } from "../../../context/playersCardsContext";
import { useGameResult } from "../../../context/gameResultContext";

import PokemonCard from "../../../Components/PokemonCard";

import s from "./FinishPage.module.css";

const FinishPage = () => {
	const history = useHistory();

	const { addPokemon } = useContext(FirebaseContext);
	const { playersCards } = usePlayersCards();
	const { gameResult } = useGameResult();

	const [chosenOpponentCard, setChosenOpponentCard] = useState(null);

	if (!playersCards) {
		return <Redirect to="/game/" />;
	}

	const { playerOne, playerTwo } = playersCards;

	const handleOpponentCardClick = (card) => {
		setChosenOpponentCard(card);
	};

	const handleEndGameBtn = () => {
		if (gameResult === "win") {
			if (!chosenOpponentCard) {
				alert("You must pick one of the opponent`s card!");
				return;
			}
			addPokemon(chosenOpponentCard);
		}

		history.replace("/game/");
	};

	const notification =
		gameResult === "win"
			? 'Congratulations!. Now pick one of the opponent`s pokemon and then press "End Game" to continue'
			: 'The game is over. Better luck next time! Press "End Game" to continue';

	return (
		<div className={s.root}>
			<div className={s.title}>
				<h2>{notification}</h2>
				<span className={s.separator}></span>
			</div>

			<div className={s.playerCards}>
				{playerOne.map((card) => (
					<PokemonCard
						key={card.id}
						className={s.card}
						id={card.id}
						name={card.name}
						type={card.type}
						img={card.img}
						values={card.values}
					/>
				))}
			</div>

			<div className={s.endGame}>
				<button className={s.endGameBtn} onClick={handleEndGameBtn}>
					End game
				</button>
			</div>

			<div className={cn(s.playerCards, s.opponentCards)}>
				{playerTwo.map((card) => (
					<PokemonCard
						key={card.id}
						className={cn(s.card, {
							[s.chosen]: card.id === chosenOpponentCard?.id,
							[s.pickable]: gameResult === "win",
						})}
						id={card.id}
						name={card.name}
						type={card.type}
						img={card.img}
						values={card.values}
						onCardClick={() => handleOpponentCardClick(card)}
					/>
				))}
			</div>
		</div>
	);
};

export default FinishPage;
