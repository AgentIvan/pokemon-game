import React from 'react';

import s from './Header.module.css';

const Header = ({ children }) => {
  if (React.Children.count(children) === 0) return null;

  return (
    <header className={s.root}>
      <div className={s.forest}></div>
      <div className={s.container}>{children}</div>
    </header>
  );
};

export default Header;
