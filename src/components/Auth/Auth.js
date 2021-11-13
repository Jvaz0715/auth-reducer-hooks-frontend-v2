import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
   Grid,
   Button,
   TextField,
   CircularProgress,
   Snackbar
} from "@material-ui/core";
import { MuiAlert } from "@material-ui/lab/Alert";
import { useLocation } from 'react-router';

const useStyles = makeStyles((theme) => ({
   root: {
      "& > *": {
         margin: theme.spacing(1),
         width: "25ch",
      }
   }
}));

function Auth(children) {
   const classes = useStyles();

   let isLoginRoute = useLocation().pathname === "/login";
   let buttonTitle = isLoginRoute ? "Login" : "Sign up";

   return (
      <Grid container spacing={0} justifyContent="center">
         <form className={classes.root}>
            <Grid item m={6}>
               <TextField fullWidth label="Email" name="email" />
            </Grid>

            {
               !isLoginRoute && (
                  <Grid item m={6}>
                     <TextField fullWidth label="Username" name="username" />
                  </Grid>
               )
            }

            <Grid item m={6}>
               <TextField fullWidth label="Password" name="password" />
            </Grid>

            <Grid style={{textAlign: "center"}}>
               <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  style={{marginTop: 10}}
               >
                  {buttonTitle}
               </Button>
            </Grid>

         </form>
      </Grid>
   )
}

export default Auth
