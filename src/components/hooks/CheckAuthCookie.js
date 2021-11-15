import { useContext } from "react";
import Cookie from "js-cookie";
import {AuthContext} from "../../context/AuthContext";
import jwtDecode from "jwt-decode";

function CheckAuthCookie() {
   const { dispatch } = useContext(AuthContext);

   function checkIfCookieExists() {
      const cookie = Cookie.get("jwt-cookie");
      if (cookie) {
         return true;
      } else {
         return null;
      }
   };

   function logUserIn() {
      let cookie = checkIfCookieExists();

      if(cookie) {
         const cookie = Cookie.get("jwt-cookie");
         const jwtDecodedToken = jwtDecode(cookie);
         // console.log(jwtDecodedToken)

         dispatch({
            type: "LOGIN",
            user: {
               email: jwtDecodedToken.email,
               username: jwtDecodedToken.username,
            },
         });
      }
   };

   return {
      checkIfCookieExists,
      logUserIn
   };

};

export default CheckAuthCookie;

