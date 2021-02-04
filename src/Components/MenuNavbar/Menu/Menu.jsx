import { Link } from 'react-router-dom';
import cn from 'classnames';

import routes from '../../../configs/routes';

import s from './Menu.module.css';

const Menu = ({ isMenuActive, onMenuItemClick }) => {
  return (
    <div
      className={cn(s.menuContainer, {
        [s.deactive]: isMenuActive === false,
        [s.active]: isMenuActive === true,
      })}
    >
      <div className={s.overlay} />
      <div className={s.menuItems}>
        <ul>
          {routes.map(({ page, href }) => (
            <li key={page}>
              <Link to={href} onClick={onMenuItemClick}>
                {page}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Menu.defaultProps = {
  isMenuActive: false,
  onMenuItemClick: () => {},
};

export default Menu;
