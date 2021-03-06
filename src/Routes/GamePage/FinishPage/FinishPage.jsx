import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import cn from "classnames";

import Firebase from "../../../services/firebase";

import {
  selectPlayerOneCards,
  selectPlayerTwoCards,
  selectResult,
} from "../../../store/game";

import PokemonCard from "../../../Components/PokemonCard";

import s from "./FinishPage.module.css";

const FinishPage = () => {
  const history = useHistory();

  const playerOneCards = useSelector(selectPlayerOneCards);
  const playerTwoCards = useSelector(selectPlayerTwoCards);
  const gameResult = useSelector(selectResult);

  const [chosenOpponentCard, setChosenOpponentCard] = useState(null);

  if (!playerOneCards || !playerTwoCards) {
    return <Redirect to="/game/" />;
  }

  const handleOpponentCardClick = (card) => {
    if (!chosenOpponentCard) {
      setChosenOpponentCard(card);
    }
  };

  const handleEndGameBtn = () => {
    if (gameResult === "win") {
      if (!chosenOpponentCard) {
        alert("You must pick one of the opponent`s card!");
        return;
      }
      Firebase.addPokemon(chosenOpponentCard);
    }

    history.replace("/game/");
  };

  const notification =
    gameResult === "win"
      ? 'Congratulations!. Now pick one of the opponent`s pokemon and then press "End Game" to continue'
      : 'The game is over. Better luck next time! Press "End Game" to continue';

  const isAbleToChoose = !chosenOpponentCard && gameResult === "win";

  return (
    <div className={s.root}>
      <div className={s.title}>
        <h2>{notification}</h2>
        <span className={s.separator}></span>
      </div>

      <div className={s.playerCards}>
        {playerOneCards.map((card) => (
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
        {playerTwoCards.map((card) => (
          <PokemonCard
            key={card.id}
            id={card.id}
            name={card.name}
            type={card.type}
            img={card.img}
            values={card.values}
            isActive={false}
            className={cn(s.card, {
              [s.chosen]: card.id === chosenOpponentCard?.id,
              [s.pickable]: isAbleToChoose,
            })}
            onCardClick={() => isAbleToChoose && handleOpponentCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
};

export default FinishPage;
