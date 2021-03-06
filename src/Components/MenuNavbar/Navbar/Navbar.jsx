import { Link } from "react-router-dom";
import cn from "classnames";

import { ReactComponent as LoginIcon } from "./assets/login.svg";
import Logo from "./assets/logo.png";

import s from "./Navbar.module.css";

const Navbar = (props) => {
  const { isMenuActive, isBgActive, onMenuBtnClick, onLoginBtnClick } = props;

  return (
    <nav className={cn(s.navbar, { [s.bgActive]: isBgActive })}>
      <div className={s.navWrapper}>
        <div className={s.brand}>
          <Link to="/">
            <img src={Logo} alt="Pokemon Logo" />
          </Link>
        </div>
        <div className={s.loginAndMenu}>
          <div className={s.loginIcon} onClick={onLoginBtnClick}>
            <LoginIcon />
          </div>
          <div
            className={cn(s.menuButton, { [s.active]: isMenuActive })}
            onClick={onMenuBtnClick}
          >
            <span />
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  isMenuActive: false,
  isBgActive: false,
  onMenuBtnClick: () => {},
  onLoginBtnClick: () => {},
};

export default Navbar;
