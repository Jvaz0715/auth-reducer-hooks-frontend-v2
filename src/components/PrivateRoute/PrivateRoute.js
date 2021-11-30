import React, {useContext} from "react";
import {Route, Redirect } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import CheckAuthCookie from "../hooks/CheckAuthCookie";

function PrivateRoute({ component: Component, ...rest }) {
   const { state: user } = useContext(AuthContext);

   const { checkIfCookieExists } = CheckAuthCookie();

   // return checkIfCookieExists() ? children : <Navigate to="/login" />;

   return (
      <Route
         {...rest}
         render={(routerProps) => (
            checkIfCookieExists()
               ? <Component {...routerProps}/>
               : <Redirect to="/login" />
         )}
      />
   )
}

export default PrivateRoute;

/*
   for react router updated:
   https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
*/