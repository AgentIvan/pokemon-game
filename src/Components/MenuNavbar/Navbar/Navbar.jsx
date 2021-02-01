import cn from 'classnames';

import Logo from '../../../assets/navbar/logo.png';

import s from './Navbar.module.css';

const Navbar = ({ isMenuActive, onMenuBtnClick }) => {
  const handleMenuBtnClick = (e) => {
    e.preventDefault();
    onMenuBtnClick();
  };

  return (
    <nav id={s.navbar} className={s.bgActive}>
      <div className={s.navWrapper}>
        <p className={s.brand}>
          <img src={Logo} alt="Pokemon Logo" />
        </p>
        <a
          href="/#"
          className={cn(s.menuButton, { [s.active]: isMenuActive })}
          onClick={handleMenuBtnClick}
        >
          <span />
        </a>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  isMenuActive: false,
  onMenuBtnClick: () => {},
};

export default Navbar;
