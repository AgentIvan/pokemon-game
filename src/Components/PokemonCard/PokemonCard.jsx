import cn from 'classnames';

import s from './PokemonCard.module.css';

const PokemonCard = (props) => {
  const {
    id,
    name,
    type,
    img,
    values,
    isActive,
    isSelected,
    minimize,
    className,
    onCardClick,
  } = props;

  const { top = null, right = null, bottom = null, left = null } = values;

  const handleCardClick = () => {
    onCardClick(id);
  };

  return (
    <div
      className={cn(s.pokemonCard, className, {
        [s.active]: isActive,
        [s.selected]: isSelected,
      })}
      onClick={handleCardClick}
    >
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
            {!minimize && (
              <div className={s.info}>
                <span className={s.number}>#{id}</span>
                <h3 className={s.name}>{name}</h3>
                <small className={s.type}>
                  Type: <span>{type}</span>
                </small>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={s.cardBack}>
        <div className={cn(s.wrap, s.back)} />
      </div>
    </div>
  );
};

PokemonCard.defaultProps = {
  id: null,
  name: null,
  type: null,
  img: null,
  values: [],
  className: null,
  isActive: true,
  isSelected: false,
  minimize: false,
  onCardClick: () => {},
};

export default PokemonCard;
