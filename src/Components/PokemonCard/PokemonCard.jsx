import React, { useState } from 'react';

import s from './PokemonCard.module.css';

import cardBackBg from '../../assets/pokemonCard/card-back-side.jpg';

const PokemonCard = ({
  id = null,
  name = null,
  type = null,
  img = null,
  values = [],
}) => {
  const { top = null, right = null, bottom = null, left = null } = values;

  const [isActive, setActive] = useState(false);

  const handleCardClick = () => {
    setActive((isActive) => !isActive);
  };

  return (
    <div className={s.root} onClick={handleCardClick}>
      <div className={`${s.pokemonCard} ${isActive ? s.active : ''}`}>
        <div className={s.cardFront}>
          <div className={`${s.wrap} ${s.front}`}>
            <div className={`${s.pokemon} ${s[type]}`}>
              <div className={s.values}>
                <div className={`${s.count} ${s.top}`}>{top}</div>
                <div className={`${s.count} ${s.right}`}>{right}</div>
                <div className={`${s.count} ${s.bottom}`}>{bottom}</div>
                <div className={`${s.count} ${s.left}`}>{left}</div>
              </div>
              <div className={s.imgContainer}>
                <img src={img} alt={name} />
              </div>
              <div className={s.info}>
                <span className={s.number}># {id}</span>
                <h3 className={s.name}>{name}</h3>
                <small className={s.type}>
                  Type: <span>{type}</span>
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className={s.cardBack}>
          <div className={`${s.wrap} ${s.back}`}>
            <img src={cardBackBg} alt="Сard Backed" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
