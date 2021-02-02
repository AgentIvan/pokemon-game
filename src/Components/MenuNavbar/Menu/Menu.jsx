import cn from 'classnames';

import s from './Menu.module.css';

const Menu = ({ isMenuActive, onChangePage }) => {
  const handleMenuItemClick = (e) => {
    e.preventDefault();
    const page = e.target.getAttribute('href').slice(1);
    onChangePage(page);
  };

  return (
    <div
      className={cn(s.menuContainer, {
        [s.deactive]: !isMenuActive,
        [s.active]: isMenuActive,
      })}
    >
      <div className={s.overlay} />
      <div className={s.menuItems}>
        <ul>
          <li>
            <a href="#welcome" onClick={handleMenuItemClick}>
              HOME
            </a>
          </li>
          <li>
            <a href="#game" onClick={handleMenuItemClick}>
              GAME
            </a>
          </li>
          <li>
            <a href="#about" onClick={handleMenuItemClick}>
              ABOUT
            </a>
          </li>
          <li>
            <a href="#contact" onClick={handleMenuItemClick}>
              CONTACT
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

Menu.defaultProps = {
  isMenuActive: false,
  onChangePage: () => {},
};

export default Menu;
