import { useContext } from 'react';

import { PokemonContext } from '../../../context/pokemonContext';

import PokemonCard from '../../../Components/PokemonCard';

import s from './BoardPage.module.css';

const BoardPage = () => {
  const { selectedPokemons } = useContext(PokemonContext);

  return (
    <div className={s.root}>
      <div className={s.playerOne}>
        {selectedPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            type={pokemon.type}
            img={pokemon.img}
            values={pokemon.values}
            className={s.card}
            minimize
          />
        ))}
      </div>
      <div className={s.board}>
        <div className={s.boardPlate}>1</div>
        <div className={s.boardPlate}>2</div>
        <div className={s.boardPlate}>3</div>
        <div className={s.boardPlate}>4</div>
        <div className={s.boardPlate}>5</div>
        <div className={s.boardPlate}>6</div>
        <div className={s.boardPlate}>7</div>
        <div className={s.boardPlate}>8</div>
        <div className={s.boardPlate}>9</div>
      </div>
    </div>
  );
};

export default BoardPage;
