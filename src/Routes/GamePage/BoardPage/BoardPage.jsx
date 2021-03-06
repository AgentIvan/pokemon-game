import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { usePokemons } from "../../../context/pokemonContext";
import { usePlayersCards } from "../../../context/playersCardsContext";
import { useGameResult } from "../../../context/gameResultContext";
import axios, { source } from "../../../services/axios";

import PokemonCard from "../../../Components/PokemonCard";
import PlayerBoard from "./Components/PlayerBoard";
import Result from "./Components/Result";
import ArrowChoice from "./Components/ArrowChoice";

import s from "./BoardPage.module.css";

const BoardPage = () => {
	const randomizeCurrentPlayer = () => {
		const playerNumber = Math.floor(Math.random() * 2) + 1;
		return playerNumber === 1 ? "One" : "Two";
	};

	const scoreCounter = (board, playerOne, playerTwo) => {
		let playerOneScore = playerOne.length;
		let playerTwoScore = playerTwo.length;

		board.forEach((cell) => {
			if (cell.card.possession === "blue") {
				playerOneScore += 1;
			}
			if (cell.card.possession === "red") {
				playerTwoScore += 1;
			}
		});
		return [playerOneScore, playerTwoScore];
	};

	const history = useHistory();

	const { handleSetPlayerCards } = usePlayersCards();
	const { selectedPokemons } = usePokemons();
	const { gameResult, handleSetGameResult } = useGameResult();

	const [playerOneCards, setPlayerOneCards] = useState(() => {
		return Object.values(selectedPokemons).map((card) => ({
			...card,
			possession: "blue",
		}));
	});
	const [board, setBoard] = useState([]);
	const [playerTwoCards, setPlayerTwoCards] = useState([]);
	const [chosenCard, setChosenCard] = useState(null);
	const [turn, setTurn] = useState(0);
	const [currentPlayer, setCurrentPlayer] = useState(() =>
		randomizeCurrentPlayer()
	);

	const setupInitialData = async () => {
		try {
			const [boardData, playerTwoCardsData] = await Promise.all([
				axios.get("board", { cancelToken: source.token }),
				axios.get("create-player", { cancelToken: source.token }),
			]);

			setBoard(boardData.data);

			const playerTwoCards = playerTwoCardsData.data.map((card) => ({
				...card,
				possession: "red",
			}));
			setPlayerTwoCards(playerTwoCards);

			handleSetPlayerCards(playerOneCards, playerTwoCards);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		setupInitialData();

		return () => {
			// source.cancel("Game aborted!");
		};
	}, []);

	const handleBoardClick = async (position) => {
		if (chosenCard) {
			const params = {
				position,
				card: chosenCard,
				board,
			};

			const gameTurnData = await axios.post("players-turn", params);

			if (chosenCard.player === "One") {
				setPlayerOneCards((prevState) =>
					prevState.filter((card) => card.id !== chosenCard.id)
				);
			}

			if (chosenCard.player === "Two") {
				setPlayerTwoCards((prevState) =>
					prevState.filter((card) => card.id !== chosenCard.id)
				);
			}

			setBoard(gameTurnData.data);

			setTurn((prevState) => prevState + 1);

			setCurrentPlayer((prevState) => {
				return prevState === "One" ? "Two" : "One";
			});
		}
	};

	useEffect(() => {
		let timerID;

		if (turn >= 9) {
			const [playerOneScore, playerTwoScore] = scoreCounter(
				board,
				playerOneCards,
				playerTwoCards
			);

			setCurrentPlayer(null);

			switch (Math.sign(playerOneScore - playerTwoScore)) {
				case 1:
					handleSetGameResult("win");
					break;
				case -1:
					handleSetGameResult("lose");
					break;
				default:
					handleSetGameResult("draw");
			}

			timerID = setTimeout(() => {
				history.replace("/game/finish");
			}, 3000);
		}

		return () => {
			clearTimeout(timerID);
		};
	}, [turn]);

	if (Object.keys(selectedPokemons).length === 0) {
		history.replace("/game/");
	}

	return (
		<div className={s.root}>
			<div className={s.playerOne}>
				<PlayerBoard
					cards={playerOneCards}
					player="One"
					currentPlayer={currentPlayer}
					onChooseCard={(card) => setChosenCard(card)}
				/>
			</div>

			<div className={s.board}>
				{board.map((cell) => (
					<div
						key={cell.position}
						className={s.boardPlate}
						onClick={() => {
							!cell.card && handleBoardClick(cell.position);
						}}
					>
						{cell.card && (
							<PokemonCard
								{...cell.card}
								minimize
								isActive
								isSelected={false}
							/>
						)}
					</div>
				))}
			</div>

			<div className={s.playerTwo}>
				<PlayerBoard
					cards={playerTwoCards}
					player="Two"
					currentPlayer={currentPlayer}
					onChooseCard={(card) => setChosenCard(card)}
				/>
			</div>

			<ArrowChoice side={currentPlayer} />

			{gameResult && <Result type={gameResult} />}
		</div>
	);
};

export default BoardPage;
