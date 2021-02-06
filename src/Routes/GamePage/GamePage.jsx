import React, { useState, useEffect } from 'react';

import database from '../../services/firebase';

import Layout from '../../Components/Layout';
import PokemonCard from '../../Components/PokemonCard';

import layoutBG2 from '../../assets/layout/bg_layout_2.jpg';

import s from './GamePage.module.css';

const newPokemon = {
  abilities: ['limber', 'imposter'],
  stats: {
    hp: 63,
    attack: 34,
    defense: 46,
    'special-attack': 56,
    'special-defense': 53,
    speed: 66,
  },
  type: 'normal',
  img:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/55.png',
  name: 'ditto',
  base_experience: 101,
  height: 3,
  id: 99,
  values: {
    top: 'B',
    right: 5,
    bottom: 6,
    left: 4,
  },
};

const GamePage = () => {
  const [pokemons, setPokemons] = useState({});

  useEffect(() => {
    database.ref('pokemons').on('value', (snapshot) => {
      setPokemons(snapshot.val());
    });
  }, []);

  const handleCardClick = (id) => {
    const [dbID, pokemon] = Object.entries(pokemons).find(
      ([_, value]) => value.id === id,
    );
    const activeModifiedPokemon = { ...pokemon, isActive: !pokemon.isActive };

    database.ref(`pokemons/${dbID}`).set(activeModifiedPokemon);
  };

  const handleAddBtnClick = () => {
    const newDbID = database.ref().child('pokemons').push().key;
    database.ref(`pokemons/${newDbID}`).set(newPokemon);
  };

  return (
    <Layout id="game-cards" urlBg={layoutBG2}>
      <h2>Here the heroes!</h2>

      <div className={s.addPokemon}>
        <button className={s.addPokemonBtn} onClick={handleAddBtnClick}>
          Add Pokemon
        </button>
      </div>

      <div className={s.flex}>
        {Object.entries(pokemons).map(([key, poke]) => (
          <PokemonCard
            key={key}
            id={poke.id}
            name={poke.name}
            type={poke.type}
            img={poke.img}
            values={poke.values}
            isActive={poke.isActive}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
    </Layout>
  );
};

export default GamePage;
