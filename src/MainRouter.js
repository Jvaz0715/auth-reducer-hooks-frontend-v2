import React from 'react';
import { 
   Route, 
   Routes, 
   Navigate, 
} from 'react-router-dom';

// import Navbar from "./components/Navbar/Navbar";
// import Auth from "./components/Auth/Auth";
// import Home from "./components/Home/Home";
// import NotFound from "./components/NotFound/NotFound";

const Navbar = React.lazy(() => import("./components/Navbar/Navbar"));
const Auth = React.lazy(() => import("./components/Auth/Auth"));
const Home = React.lazy(() => import("./components/Home/Home"));
const NotFound = React.lazy(() => import("./components/NotFound/NotFound"));

function MainRouter() {
   return (
      <>
         <Navbar />
         <Routes>
            <Route exact path="/sign-up" element={<Auth />} />

            <Route exact path="/login" element={<Auth />} />

            <Route exact path="/logout" render={() => <Navigate to="/login" />} />

            <Route exact path="/" element={<Home />} />

            <Route path="*" element={<NotFound />} />
      </Routes>
      </>
   )
};

export default MainRouter
