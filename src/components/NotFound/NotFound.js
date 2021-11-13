import React from 'react'
import { Link } from "react-router-dom";

function NotFound() {
   return (
      <div>
         Page does not exist. Please return to the{" "}
         <Link to="/">Home Page</Link>
      </div>
   )
}

export default NotFound;
