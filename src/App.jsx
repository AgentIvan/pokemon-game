import React, { useState, useEffect } from 'react';

import Header from './Components/Header';
import Layout from './Components/Layout';
import PokemonCard from './Components/PokemonCard';
import Footer from './Components/Footer';

import layoutBG1 from './assets/layout/bg_layout_1.jpg';
import layoutBG2 from './assets/layout/bg_layout_2.jpg';

import './App.css';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    fetch('/firstPokemons.json')
      .then((response) => response.json())
      .then(setPokemons);
  }, []);

  return (
    <>
      <Header>
        <h1>Pokemon Game!</h1>
        <p>Actually, my first game on JS</p>
      </Header>
      <Layout id="first-layout" urlBg={layoutBG1}>
        <h2>What is this game about?</h2>
        <p>
          In the game two players face off against one another, one side playing
          as "blue", the other as "red" on a 3x3 grid. Each player has five
          cards in a hand and the aim is to capture the opponent's cards by
          turning them into the player's own color of red or blue.
        </p>
      </Layout>
      <Layout id="middle-layout" colorBg="#2193ed">
        <h2>How to play?</h2>
        <p>
          To win, a majority of the total ten cards played (including the one
          card that is not placed on the board) must be of the player's card
          color. To do this, the player must capture cards by placing a card
          adjacent to an opponent's card whereupon the 'ranks' of the sides
          where the two cards touch will be compared. If the rank of the
          opponent's card is higher than the player's card, the player's card
          will be captured and turned into the opponent's color. If the player's
          rank is higher, the opponent's card will be captured and changed into
          the player's color instead.
        </p>
      </Layout>
      <Layout id="last-layout" urlBg={layoutBG2}>
        <h2>Here the heroes!</h2>
        <div className="flex">
          {pokemons.map((card) => (
            <PokemonCard
              key={card.id}
              id={card.id}
              name={card.name}
              type={card.type}
              img={card.img}
              values={card.values}
            />
          ))}
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default App;
