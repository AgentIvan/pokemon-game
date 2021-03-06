import { Link } from 'react-router-dom';
import cn from 'classnames';

import Logo from './assets/logo.png';

import s from './Navbar.module.css';

const Navbar = ({ isMenuActive, isBgActive, onMenuBtnClick }) => {
  return (
    <nav className={cn(s.navbar, { [s.bgActive]: isBgActive })}>
      <div className={s.navWrapper}>
        <div className={s.brand}>
          <Link to="/">
            <img src={Logo} alt="Pokemon Logo" />
          </Link>
        </div>
        <div
          className={cn(s.menuButton, { [s.active]: isMenuActive })}
          onClick={onMenuBtnClick}
        >
          <span />
        </div>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  isMenuActive: false,
  isBgActive: false,
  onMenuBtnClick: () => {},
};

export default Navbar;
