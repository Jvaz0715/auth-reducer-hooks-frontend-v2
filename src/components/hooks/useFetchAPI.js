import {useState, useEffect, useContext} from "react";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";

function useFetchAPI(url) {
   const baseURL = 
      process.env.NODE_ENV === "development" 
         ? "http://localhost:3001/api"
         : "DEPLOYED LOCATION";

   const [isLoading, setIsLoading] = useState(false);
   const [response, setResponse] = useState(null);
   const [error, setError] = useState(null);
   const [options, setOptions] = useState({});

   const [isMessageOpen, setIsMessageOpen] = useState(false);

   function handleMessageOpen(){
      setIsMessageOpen(true);
   };

   function handleMessageClose(){
      setError(null);
      setResponse(null);
      setIsMessageOpen(false);
   };

   function handleAPICallButtonSubmit(options = {}) {
      setOptions(options);
      setIsLoading(true);
   };

   async function handleAPIFetchCall() {
      
      const requestOptionObj = {
         ...options,
         ...{
            headers: {
               authorization: null,
            },
         },
      };

      try {
         let response = await axios(baseURL + url, requestOptionObj);
         // console.log(response);
         setIsLoading(false);
      } catch(e) {
         // console.log(e.response);
         setError(e.response.data.message)
         setIsLoading(false);
         handleMessageOpen();
      }
   };

   useEffect(() => {
      if (!isLoading) {
         return;
      }

      handleAPIFetchCall();
   }, [isLoading, url, options, baseURL]);

   return [
      {
         isLoading,
         response,
         error,
         setError,
         setResponse,
      },
      handleAPICallButtonSubmit,
      isMessageOpen,
      handleMessageOpen,
      handleMessageClose,
   ];
}

export default useFetchAPI;