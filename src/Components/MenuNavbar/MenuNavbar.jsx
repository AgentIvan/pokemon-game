import { useState } from 'react';

import Menu from './Menu';
import Navbar from './Navbar';

const MenuNavbar = ({ isBgActive }) => {
  const [isMenuActive, setMenuActive] = useState(null);

  const handleMenuBtnClick = () => {
    setMenuActive((isMenuActive) => !isMenuActive);
  };

  const handleMenuItemClick = () => {
    setMenuActive(false);
  };

  return (
    <div>
      <Navbar
        isMenuActive={isMenuActive}
        isBgActive={isBgActive}
        onMenuBtnClick={handleMenuBtnClick}
      />
      <Menu isMenuActive={isMenuActive} onMenuItemClick={handleMenuItemClick} />
    </div>
  );
};

MenuNavbar.defaultProps = {
  isBgActive: false,
};

export default MenuNavbar;
