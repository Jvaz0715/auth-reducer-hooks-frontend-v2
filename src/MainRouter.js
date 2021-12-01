import React from 'react';
import { 
   BrowserRouter as Router, 
   Route,
   Switch 
} from 'react-router-dom';
// import CheckAuthCookie from "../src/components/hooks/CheckAuthCookie";

import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
const Auth = React.lazy(() => import("./components/Auth/Auth"));
const Home = React.lazy(() => import("./components/Home/Home"));
const NotFound = React.lazy(() => import("./components/NotFound/NotFound"));
const Protected = React.lazy(() => import("./components/Protected/Protected"));


function MainRouter(props) {
   return (
      <Router>
         <Navbar />
         <Switch>
            <Route 
               exact 
               path="/" 
               component={Home} 
            />

            <Route 
               exact 
               path="/sign-up" 
               component={Auth}
            />

            <Route 
               exact 
               path="/login" 
               // component={Auth} 
               render={(routerProps) => <Auth {...routerProps} handleUserLogin={props.handleUserLogin}/>}
            />

            <PrivateRoute 
               exact
               path="/protected"
               component={Protected}
            />

            <Route path="*" exact component={NotFound} />
      </Switch>
      </Router>
   )
};

export default MainRouter
