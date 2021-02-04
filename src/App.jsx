import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import cn from 'classnames';

import MenuNavbar from './Components/MenuNavbar';
import Footer from './Components/Footer';

import HomePage from './Routes/HomePage';
import GamePage from './Routes/GamePage';
import AboutPage from './Routes/AboutPage';
import ContactPage from './Routes/ContactPage';
import NotFound from './Routes/NotFound';

import s from './App.module.css';

const App = () => {
  const urlMatch = useRouteMatch('/');

  return (
    <Switch>
      <Route path="/404" component={NotFound} />
      <Route>
        <>
          <MenuNavbar isBgActive={!urlMatch.isExact} />
          <div
            className={cn(s.appContentWrapper, {
              [s.isHomePage]: urlMatch.isExact,
            })}
          >
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/home" component={HomePage} />
              <Route path="/game" component={GamePage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/contact" component={ContactPage} />
              <Route render={() => <Redirect to="/404" />} />
            </Switch>
          </div>
          <Footer />
        </>
      </Route>
    </Switch>
  );
};

export default App;
