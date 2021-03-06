import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isPrivate, ...restProps }) => {
  return (
    <Route
      {...restProps}
      render={(props) => {
        const idToken = localStorage.getItem("idToken");

        return idToken || !isPrivate ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

export default PrivateRoute;
