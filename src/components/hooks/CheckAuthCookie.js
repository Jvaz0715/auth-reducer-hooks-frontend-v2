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
      let checkCookieExists = checkIfCookieExists();

      if(checkCookieExists) {
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

   function logUserOut() {
      Cookie.remove("jwt-cookie");

      dispatch({
         type: "LOG_OUT"
      })
   }

   return {
      checkIfCookieExists,
      logUserIn,
      logUserOut
   };

};

export default CheckAuthCookie;

