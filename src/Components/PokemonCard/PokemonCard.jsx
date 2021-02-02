import React, { useState } from 'react';
import cn from 'classnames';

import cardBackBg from '../../assets/pokemonCard/card-back-side.jpg';

import s from './PokemonCard.module.css';

const PokemonCard = (props) => {
  const { id, name, type, img, values } = props;
  const { top = null, right = null, bottom = null, left = null } = values;

  const [isActive, setActive] = useState(false);

  const handleCardClick = () => {
    setActive((isActive) => !isActive);
  };

  return (
    <div className={s.root} onClick={handleCardClick}>
      <div className={cn(s.pokemonCard, { [s.active]: isActive })}>
        <div className={s.cardFront}>
          <div className={cn(s.wrap, s.front)}>
            <div className={cn(s.pokemon, s[type])}>
              <div className={s.values}>
                <div className={cn(s.count, s.top)}>{top}</div>
                <div className={cn(s.count, s.right)}>{right}</div>
                <div className={cn(s.count, s.bottom)}>{bottom}</div>
                <div className={cn(s.count, s.left)}>{left}</div>
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
          <div className={cn(s.wrap, s.back)}>
            <img src={cardBackBg} alt="Card Backed" />
          </div>
        </div>
      </div>
    </div>
  );
};

PokemonCard.defaultProps = {
  id: null,
  nam: null,
  type: null,
  img: null,
  values: [],
};

export default PokemonCard;
