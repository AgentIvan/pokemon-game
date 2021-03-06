import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  selectIsFetching,
  selectPokemons,
  selectSelectedPokemons,
  setSelectedPokemons,
  clearSelectedPokemons,
  requestPokemons,
} from "../../../store/pokemons";
import { clearGameData } from "../../../store/game";

import Layout from "../../../Components/Layout";
import PokemonCard from "../../../Components/PokemonCard";
import Loader from "../../../Components/Loader";

import layoutBG2 from "../../../Components/Layout/assets/bg_layout_2.jpg";

import s from "./StartPage.module.css";

const StartPage = () => {
  const history = useHistory();

  const [pokemons, setPokemons] = useState({});

  const isFetching = useSelector(selectIsFetching);
  const requestedPokemons = useSelector(selectPokemons);
  const selectedPokemons = useSelector(selectSelectedPokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearSelectedPokemons());
    dispatch(clearGameData());
    dispatch(requestPokemons());
  }, []);

  useEffect(() => {
    setPokemons(requestedPokemons);
  }, [requestedPokemons]);

  const handleCardClick = (id) => {
    const [key, pokemon] = Object.entries(pokemons).find(
      ([_, value]) => value.id === id
    );

    const selectModifiedPokemon = {
      ...pokemon,
      isSelected: !pokemon.isSelected,
    };

    setPokemons((prevState) => {
      const newState = { ...prevState };
      newState[key] = selectModifiedPokemon;
      return newState;
    });
    dispatch(setSelectedPokemons({ key, selectModifiedPokemon }));
  };

  const handleStartBtnClick = () => {
    if (Object.keys(selectedPokemons).length === 5) {
      history.push("board");
    } else {
      alert("Choose five pokemons");
    }
  };

  const startPageContent = (
    <Layout id="game-cards" urlBg={layoutBG2}>
      <h2>Choose five of your best warriors </h2>

      <div className={s.start}>
        <button className={s.startBtn} onClick={handleStartBtnClick}>
          Start Game
        </button>
      </div>

      <div className={s.flex}>
        {Object.entries(pokemons).map(([key, value]) => (
          <PokemonCard
            key={key}
            id={value.id}
            name={value.name}
            type={value.type}
            img={value.img}
            values={value.values}
            isSelected={value.isSelected}
            className={s.card}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
    </Layout>
  );

  return isFetching ? <Loader /> : startPageContent;
};

export default StartPage;
