import React from "react";
import { Route, Redirect } from "react-router-dom";
import { showToastNotification } from './../../functions/showToastNotification';

const ProtectedUserRoute = ({ auth,role, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const tokenData = localStorage.getItem("authToken")
        const roleData = localStorage.getItem("role")
        
        if ((auth.isAuth||tokenData) && (auth.role==="user" || roleData === "user")) return <Component {...props} />;
        if (!auth.isAuth){
          showToastNotification("Please login user account or create one to access the page.","warn")
          return (
            <Redirect to={{ path: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

export default ProtectedUserRoute;
