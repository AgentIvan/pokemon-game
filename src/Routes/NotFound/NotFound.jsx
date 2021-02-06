import { useHistory } from 'react-router-dom';

import s from './NotFound.module.css';

const NotFound = () => {
  const history = useHistory();

  const handleBtnClick = () => {
    history.push('/');
  };

  return (
    <div className={s.root}>
      <button className={s.btn} onClick={handleBtnClick}>
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
