import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedAdminRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuth && auth.role==="admin") return <Component {...props} />;
        if (!auth.isAuth)
          return (
            <Redirect to={{ path: "/", state: { from: props.location } }} />
          );
      }}
    />
  );
};

export default ProtectedAdminRoute;
