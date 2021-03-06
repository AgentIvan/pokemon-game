import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectSelectedPokemons } from "../../../store/pokemons";
import * as gameStore from "../../../store/game";

import Loader from "../../../Components/Loader";
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

  const selectedPokemons = useSelector(selectSelectedPokemons);
  const isFetching = useSelector(gameStore.selectIsFetching);
  const board = useSelector(gameStore.selectBoard);
  const playerTwoCards = useSelector(gameStore.selectPlayerTwoCards);
  const chosenCard = useSelector(gameStore.selectChosenCard);
  const turn = useSelector(gameStore.selectTurn);
  const gameResult = useSelector(gameStore.selectResult);
  const currentPlayer = useSelector(gameStore.selectCurrentPlayer);
  const dispatch = useDispatch();

  const [currentPlayerOneCards, setCurrentPlayerOneCards] = useState([]);
  const [currentPlayerTwoCards, setCurrentPlayerTwoCards] = useState([]);

  useEffect(() => {
    if (Object.keys(selectedPokemons).length !== 0) {
      dispatch(gameStore.setupInitialData());
      dispatch(gameStore.setPlayerOneCards(Object.values(selectedPokemons)));

      const randomStartPlayer = randomizeCurrentPlayer();
      dispatch(gameStore.setCurrentPlayer(randomStartPlayer));

      const markedPlayerOneCards = Object.values(selectedPokemons).map(
        (card) => ({
          ...card,
          possession: "blue",
        })
      );
      setCurrentPlayerOneCards(markedPlayerOneCards);
    }
  }, []);

  useEffect(() => {
    if (playerTwoCards.length > 0) {
      const markedPlayerTwoCards = playerTwoCards.map((card) => ({
        ...card,
        possession: "red",
      }));
      setCurrentPlayerTwoCards(markedPlayerTwoCards);
    }
  }, [playerTwoCards]);

  useEffect(() => {
    let timerID;

    if (turn >= 9) {
      const [playerOneScore, playerTwoScore] = scoreCounter(
        board,
        currentPlayerOneCards,
        currentPlayerTwoCards
      );

      dispatch(gameStore.setCurrentPlayer(null));

      switch (Math.sign(playerOneScore - playerTwoScore)) {
        case 1:
          dispatch(gameStore.setResult("win"));
          break;
        case -1:
          dispatch(gameStore.setResult("lose"));
          break;
        default:
          dispatch(gameStore.setResult("draw"));
      }

      timerID = setTimeout(() => {
        history.replace("/game/finish");
      }, 3000);
    }

    return () => {
      clearTimeout(timerID);
    };
  }, [turn]);

  useEffect(() => {
    if (chosenCard) {
      if (chosenCard.player === "One") {
        const updatedCurrentPlayerOneCards = currentPlayerOneCards.filter(
          (card) => card.id !== chosenCard.id
        );
        setCurrentPlayerOneCards(updatedCurrentPlayerOneCards);
      }

      if (chosenCard.player === "Two") {
        const updatedCurrentPlayerTwoCards = currentPlayerTwoCards.filter(
          (card) => card.id !== chosenCard.id
        );
        setCurrentPlayerTwoCards(updatedCurrentPlayerTwoCards);
      }

      dispatch(gameStore.setTurn(turn + 1));

      const actualCurrentPlayer = currentPlayer === "One" ? "Two" : "One";
      dispatch(gameStore.setCurrentPlayer(actualCurrentPlayer));
    }
  }, [board]);

  const handleBoardClick = (position) => {
    if (chosenCard) {
      dispatch(
        gameStore.updateBoardData({ position, card: chosenCard, board })
      );
    }
  };

  const handleCardClick = (card) => {
    dispatch(gameStore.setChosenCard(card));
  };

  if (Object.keys(selectedPokemons).length === 0) {
    history.replace("/game/");
  }

  const isWaitForGameStart = board.length === 0 && isFetching;

  const boardPageContent = (
    <div className={s.root}>
      <div className={s.playerOne}>
        <PlayerBoard
          cards={currentPlayerOneCards}
          player="One"
          currentPlayer={currentPlayer}
          onChooseCard={(card) => handleCardClick(card)}
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
          cards={currentPlayerTwoCards}
          player="Two"
          currentPlayer={currentPlayer}
          onChooseCard={(card) => handleCardClick(card)}
        />
      </div>

      <ArrowChoice side={currentPlayer} />

      {gameResult && <Result type={gameResult} />}
    </div>
  );

  return isWaitForGameStart ? <Loader /> : boardPageContent;
};

export default BoardPage;
