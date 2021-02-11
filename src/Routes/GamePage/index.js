import { useState } from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import { PokemonContext } from '../../context/pokemonContext';

import StartPage from './StartPage';
import BoardPage from './BoardPage';
import FinishPage from './FinishPage';

const GamePage = () => {
  const match = useRouteMatch();

  const [selectedPokemons, setSelectedPokemons] = useState([]);

  const handleSelectedPokemons = (pokemon) => {
    const selectedCollection = pokemon.isSelected
      ? [...selectedPokemons, pokemon]
      : selectedPokemons.filter((item) => item.id !== pokemon.id);

    setSelectedPokemons(selectedCollection);
  };

  return (
    <PokemonContext.Provider
      value={{
        selectedPokemons,
        handleSelectedPokemons,
      }}
    >
      <Switch>
        <Route exact path={`${match.path}/`} component={StartPage} />
        <Route path={`${match.path}/board`} component={BoardPage} />
        <Route path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
    </PokemonContext.Provider>
  );
};

export default GamePage;
