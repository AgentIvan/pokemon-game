import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { FirebaseContext } from '../../../context/firebaseContext';
import { PokemonContext } from '../../../context/pokemonContext';

import Layout from '../../../Components/Layout';
import PokemonCard from '../../../Components/PokemonCard';

import layoutBG2 from '../../../assets/layout/bg_layout_2.jpg';

import s from './StartPage.module.css';

const StartPage = () => {
  const history = useHistory();

  const [pokemons, setPokemons] = useState({});

  const { getPokemonsBySockets } = useContext(FirebaseContext);

  const { handleSelectedPokemons } = useContext(PokemonContext);

  useEffect(() => {
    getPokemonsBySockets((pokemons) => {
      setPokemons(pokemons);
    });
  }, []);

  const handleCardClick = (id) => {
    const [, pokemon] = Object.entries(pokemons).find(
      ([_, value]) => value.id === id,
    );

    const selectModifiedPokemon = {
      ...pokemon,
      isSelected: !pokemon.isSelected,
    };

    const modifiedPokemons = Object.entries(pokemons).reduce(
      (acc, [key, value]) => {
        return value.id === id
          ? { ...acc, [key]: selectModifiedPokemon }
          : { ...acc, [key]: value };
      },
      {},
    );

    setPokemons(modifiedPokemons);
    handleSelectedPokemons(selectModifiedPokemon);
  };

  const handleStartBtnClick = () => {
    history.push('board');
  };

  return (
    <Layout id="game-cards" urlBg={layoutBG2}>
      <h2>Here the heroes!</h2>

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
};

export default StartPage;
