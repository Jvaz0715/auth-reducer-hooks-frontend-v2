import React, { useContext, useEffect } from 'react';
import Cookie from "js-cookie";
import jwtDecode from 'jwt-decode';
import { makeStyles } from "@material-ui/core/styles";
import {
   AppBar,
   Toolbar,
   Typography,
   Button,
} from "@material-ui/core";
import {NavLink, Link } from "react-router-dom";

import { AuthContext } from '../../context/AuthContext';

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   title: {
      flexGrow: 1,
   },
}));

function Navbar() {
   const classes = useStyles();

   useEffect(() => {
      const cookie = Cookie.get("jwt-cookie");

      if (cookie) {
         const jwtDecodedToken = jwtDecode(cookie);
         console.log(jwtDecodedToken)

         dispatch({
            type: "LOGIN",
            user: {
               email: jwtDecodedToken.email,
               username: jwtDecodedToken.username,
            },
         });
      };

      
   }, [])

   const {
      state: { user },
      dispatch
   } = useContext(AuthContext);

   const isUserLoggedIn = user ? true : false;

   const navLinkTitleOne = isUserLoggedIn ? "/profile" : "/login";

   const navLinkDisplayOne = isUserLoggedIn ? `${user.email}` : "login";

   const navLinkTitleTwo = isUserLoggedIn ? "/logout" : "/sign-up";

   const navLinkDisplayTwo = isUserLoggedIn ? "Logout" : "Sign Up";

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Toolbar>
               <Typography variant="h6" className={classes.title}>
                  <Link to="/">
                     React Auth Hooks Fullstack
                  </Link>
               </Typography>
               <NavLink activestyle={{color: "red"}} exact="true" to={navLinkTitleOne}>
                  <Button color="inherit" style={{color: "white"}}>
                     {navLinkDisplayOne}
                  </Button>
               </NavLink>
               <NavLink activestyle={{color: "red"}} exact="true" to={navLinkTitleTwo}>
                  <Button color="inherit" style={{color: "white"}}>
                     {navLinkDisplayTwo}
                  </Button>
               </NavLink>
            </Toolbar>
         </AppBar>
         
      </div>
   )
}

export default Navbar;
