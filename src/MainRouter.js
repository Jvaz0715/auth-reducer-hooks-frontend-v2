import React from 'react';
import { 
   BrowserRouter as Router, 
   Route, 
} from 'react-router-dom';
import CheckAuthCookie from "../src/components/hooks/CheckAuthCookie";

import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
const Auth = React.lazy(() => import("./components/Auth/Auth"));
const Home = React.lazy(() => import("./components/Home/Home"));
const NotFound = React.lazy(() => import("./components/NotFound/NotFound"));
const Protected = React.lazy(() => import("./components/Protected/Protected"));


function MainRouter(props) {
   const { checkIfCookieExists } = CheckAuthCookie();
   return (
      <Router>
         <Navbar />
         <>
            <Route 
               exact 
               path="/sign-up" 
               component={Auth}
            />

            <Route 
               exact 
               path="/login" 
               component={Auth} 
            />

            <Route exact path="/" component={Home} />
            <Route
               exact
               path="/protected"
               element={
                  <PrivateRoute>
                     <Protected />
                  </PrivateRoute>
               }
            />

            {/* <Route path="*" component={NotFound} /> */}
      </>
      </Router>
   )
};

export default MainRouter
