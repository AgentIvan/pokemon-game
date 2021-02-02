import { useState } from 'react';

import Menu from './Menu';
import Navbar from './Navbar';

const MenuNavbar = ({ onChangePage }) => {
  const [isMenuActive, setMenuActive] = useState(false);

  const handleMenuBtnClick = () => {
    setMenuActive((isMenuActive) => !isMenuActive);
  };

  return (
    <div>
      <Navbar isMenuActive={isMenuActive} onMenuBtnClick={handleMenuBtnClick} />
      <Menu isMenuActive={isMenuActive} onChangePage={onChangePage} />
    </div>
  );
};

MenuNavbar.defaultProps = {
  onChangePage: () => {},
};

export default MenuNavbar;
