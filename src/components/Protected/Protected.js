import React, { useContext, useEffect } from 'react';
import {AuthContext} from "../../context/AuthContext";

function Protected() {
   const {
      state: { user },
   } = useContext(AuthContext);

   console.log(user)
   return (
      <div>
         Protected!
      </div>
   )
}

export default Protected
