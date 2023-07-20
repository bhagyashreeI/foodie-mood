import React from 'react';
import { useRouteError, Link } from "react-router-dom";
const ErrorBoundary = () => {
      const error = useRouteError();
  console.error(error);
   return  <>
    <h1>{error.statusText}</h1>
    <div className="GenericError__description">
            {error.data}
            
           <br /><Link to="/">Go Back</Link>
    </div>
    </>
    
}

export default ErrorBoundary;