import { useState } from 'react';

import HomePage from './Routes/HomePage';
import GamePage from './Routes/GamePage';

const App = () => {
  const [page, setPage] = useState('welcome');

  const handleChangePage = (pageName) => {
    setPage(pageName);
  };

  switch (page) {
    case 'welcome':
      return <HomePage onChangePage={handleChangePage} />;
    case 'game':
      return <GamePage onChangePage={handleChangePage} />;
    default:
      return <HomePage onChangePage={handleChangePage} />;
  }
};

export default App;
