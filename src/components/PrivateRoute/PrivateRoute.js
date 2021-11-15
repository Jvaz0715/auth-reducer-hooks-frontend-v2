import React, {useContext} from "react";
import {  
   Navigate, 
} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import CheckAuthCookie from "../hooks/CheckAuthCookie";

function PrivateRoute({ children }) {
   const { state: user } = useContext(AuthContext);

   const { checkIfCookieExists } = CheckAuthCookie();

   return checkIfCookieExists() ? children : <Navigate to="/login" />;
}

export default PrivateRoute;

/*
   for react router updated:
   https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
*/