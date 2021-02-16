import { useState } from "react";
import cn from "classnames";

import PokemonCard from "../../../../../Components/PokemonCard";

import s from "./PlayerBoard.module.css";

const PlayerBoard = ({ cards, player, currentPlayer, onChooseCard }) => {
	const [selectedCard, setSelectedCard] = useState(null);

	const handleCardClick = (card) => {
		setSelectedCard(card.id);
		onChooseCard({ ...card, player });
	};

	const isAbleToChoose = currentPlayer === player;

	return (
		<>
			{cards.map((card) => (
				<div
					key={card.id}
					className={cn(s.cardBoard, {
						[s.selected]: selectedCard === card.id,
						[s.playerOne]: player === "One",
						[s.playerTwo]: player === "Two",
						[s.forbidden]: !isAbleToChoose,
					})}
					onClick={() => isAbleToChoose && handleCardClick(card)}
				>
					<PokemonCard
						id={card.id}
						name={card.name}
						type={card.type}
						img={card.img}
						values={card.values}
						minimize
					/>
				</div>
			))}
		</>
	);
};

PlayerBoard.defaultProps = {
	cards: [],
	player: "",
	currentPlayer: "",
	onChooseCard: () => {},
};

export default PlayerBoard;
