import React, { useState, useEffect } from 'react';

import Layout from '../../Components/Layout';
import PokemonCard from '../../Components/PokemonCard';

import layoutBG2 from '../../assets/layout/bg_layout_2.jpg';

import s from './GamePage.module.css';

const GamePage = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch('/firstPokemons.json')
      .then((response) => response.json())
      .then(setPokemons);
  }, []);

  const handleCardClick = (id) => {
    setPokemons((pokemons) =>
      pokemons.map((card) =>
        card.id !== id ? card : { ...card, isActive: true },
      ),
    );
  };

  return (
    <Layout id="game-cards" urlBg={layoutBG2}>
      <h2>Here the heroes!</h2>

      <div className={s.flex}>
        {pokemons.map((card) => (
          <PokemonCard
            key={card.id}
            id={card.id}
            name={card.name}
            type={card.type}
            img={card.img}
            values={card.values}
            isActive={card.isActive}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
    </Layout>
  );
};

export default GamePage;
