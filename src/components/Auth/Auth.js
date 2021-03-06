import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
   Grid,
   Button,
   TextField,
   CircularProgress,
   Snackbar
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import useChangeInputConfig from '../hooks/useInput';
import useFetchAPI from '../hooks/useFetchAPI';
import CheckAuthCookie from "../hooks/CheckAuthCookie";


const useStyles = makeStyles((theme) => ({
   root: {
      "& > *": {
         margin: theme.spacing(1),
         width: "25ch",
      }
   }
}));

function Auth(props) {
   // console.log(props.location.pathname)
   const classes = useStyles();

   let isLoginRoute =  props.location.pathname === "/login";
   let buttonTitle = isLoginRoute ? "Login" : "Sign up";
   // for axios request
   let apiURL = isLoginRoute ? "/users/login" : "/users/create-user";

   const { checkIfCookieExists } = CheckAuthCookie();

   const [
      {isLoading, response, error, setResponse},
      successMessageValue,
      isMessageOpen,
      handleAPICallButtonSubmit,
      ,
      handleMessageClose,
   ] = useFetchAPI(apiURL);

   // comes from our hooks
   const [
      email, 
      handleEmailChange, 
      isEmailError, 
      emailErrorMessage, 
      isEmailDisabled, 
      clearEmailInput
   ] = useChangeInputConfig("email");

   // comes from our hooks
   const [
      username, 
      handleUsernameChange, 
      isUsernameError, 
      usernameErrorMessage, 
      isUsernameDisabled, 
      clearUsernameInput
   ] = useChangeInputConfig("username");

   // comes from our hooks
   const [
      password, 
      handlePasswordChange, 
      isPasswordError, 
      passwordErrorMessage, 
      isPasswordDisabled, 
      clearPasswordInput
   ] = useChangeInputConfig("password");

   // create handleOnSubmit for form
   function handleOnSubmit(e) {
      e.preventDefault();

      //helps return given info for each page rather than a blank for login
      const user = isLoginRoute ? {email, password} : {email, username, password};

      handleAPICallButtonSubmit({
         method: "post",
         data: {
            ...user,
         },
      });
   };

   function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props}/>
   }

   function errorMessage() {
      return (
         <Snackbar 
            open={isMessageOpen} 
            autoHideDuration={6000} 
            onClose={handleMessageClose}
            
         >
            <Alert severity="error">{error}</Alert>
         </Snackbar>
      )
   };

   function successMessage() {
      return (
         <Snackbar 
            open={isMessageOpen} 
            autoHideDuration={6000} 
            onClose={handleMessageClose}
            
         >
            <Alert severity="success">{successMessageValue}</Alert>
         </Snackbar>
      )
   };

   if(isLoading) {
      return (
         <div style={{ textAlign: "center" }}>
            <CircularProgress />
         </div>
      )
   };

   if (response === "user created") {
      clearEmailInput();
      clearUsernameInput();
      clearPasswordInput();
      setResponse(null);
   };

   if (checkIfCookieExists()) {
      
      if(props.location.pathname === "/login" || props.location.pathname === "/sign-up"){
         props.history.push("/protected")
      } else {
         return props.location.pathname;
      };
   }

   return (
      <Grid container spacing={0} justifyContent="center">
         {successMessageValue && successMessage()}
         {error && errorMessage()}
         <form 
            className={classes.root}
            onSubmit={handleOnSubmit}
         >
            <Grid item m={6}>
               <TextField 
                  fullWidth 
                  label="Email" 
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  error={isEmailError}
                  helperText={emailErrorMessage}
               />
            </Grid>

            {
               !isLoginRoute && (
                  <Grid item m={6}>
                     <TextField 
                        fullWidth 
                        label="Username" 
                        name="username" 
                        value={username}
                        onChange={handleUsernameChange}
                        error={isUsernameError}
                        helperText={usernameErrorMessage}
                     />
                  </Grid>
               )
            }

            <Grid item m={6}>
               <TextField 
                  fullWidth 
                  label="Password" 
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={isPasswordError}
                  helperText={passwordErrorMessage}
               />
            </Grid>

            <Grid style={{textAlign: "center"}}>
               <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  style={{marginTop: 10}}
                  disabled={
                     isLoginRoute 
                        ? isEmailDisabled || isPasswordDisabled
                        : isEmailDisabled || isPasswordDisabled || isUsernameDisabled
                  }
               >
                  {buttonTitle}
               </Button>
            </Grid>

         </form>
      </Grid>
   )
}

export default Auth;
