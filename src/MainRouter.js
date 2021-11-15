import React from 'react';
import { 
   Route, 
   Routes, 
   Navigate, 
} from 'react-router-dom';
import CheckAuthCookie from "../src/components/hooks/CheckAuthCookie";

import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
const Auth = React.lazy(() => import("./components/Auth/Auth"));
const Home = React.lazy(() => import("./components/Home/Home"));
const NotFound = React.lazy(() => import("./components/NotFound/NotFound"));
const Protected = React.lazy(() => import("./components/Protected/Protected"));


function MainRouter() {
   const { checkIfCookieExists } = CheckAuthCookie();
   return (
      <>
         <Navbar />
         <Routes>
            {/* <Route exact path="/sign-up" element={<Auth />} />
            <Route exact path="/login" element={<Auth />} /> */}
            <Route 
               exact 
               path="/sign-up" 
               element={checkIfCookieExists() ? (<PrivateRoute>
                  <Protected />
               </PrivateRoute>) : (<Auth />)} 
               />

            <Route 
               exact 
               path="/login" 
               element={checkIfCookieExists() ? (<PrivateRoute>
                  <Protected />
               </PrivateRoute>) : (<Auth />)}
            />

            <Route exact path="/logout" render={() => <Navigate to="/login" />} />
            <Route exact path="/" element={<Home />} />
            <Route
               exact
               path="/protected"
               element={
                  <PrivateRoute>
                     <Protected />
                  </PrivateRoute>
               }
            />

            <Route path="*" element={<NotFound />} />
      </Routes>
      </>
   )
};

export default MainRouter
