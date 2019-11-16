import React from "react";
import { Route, Redirect } from "react-router-dom";

// the private route is a function that will return a Route component or Redirect.
// that expects a component, an user an other props.
// the other props will be set in ...rest (the most important one will be the path definition (the path we see in the browser's navigation))
const protectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      render={props => {
        //render is a function that checks if the user is passed a long. If not the private route will redirect to "/"
        if (user) {
          return <Component {...props} {...user} {...rest} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};
export default protectedRoute;
