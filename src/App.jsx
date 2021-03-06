import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import cn from "classnames";
import { NotificationContainer } from "react-notifications";

import ROUTES from "./configs/routes";

import MenuNavbar from "./Components/MenuNavbar";
import Footer from "./Components/Footer";
import NotFound from "./Routes/NotFound";
import PrivateRoute from "./HOC/PrivateRoute";

import "react-notifications/lib/notifications.css";
import s from "./App.module.css";

const App = () => {
  const urlMatch = useRouteMatch("/");

  return (
    <>
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
                {ROUTES.map(({ page, href, component, isExact, isPrivate }) => (
                  <PrivateRoute
                    key={page}
                    path={href}
                    exact={isExact}
                    isPrivate={isPrivate}
                    component={component}
                  />
                ))}
                <Route render={() => <Redirect to="/404" />} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
      <NotificationContainer />
    </>
  );
};

export default App;
