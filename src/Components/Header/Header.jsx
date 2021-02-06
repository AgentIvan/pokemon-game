import React from 'react';
import { useHistory } from 'react-router-dom';

import s from './Header.module.css';

const Header = ({ children }) => {
  const history = useHistory();

  if (React.Children.count(children) === 0) {
    return null;
  }

  const handlePlayBtnClick = () => {
    history.push('/game');
  };

  return (
    <header className={s.root}>
      <div className={s.forest} />
      <div className={s.silhouette} />
      <div className={s.moon} />
      <div className={s.container}>
        {children}
        <button className={s.btn} onClick={handlePlayBtnClick}>
          Start Game
        </button>
      </div>
    </header>
  );
};

export default Header;
