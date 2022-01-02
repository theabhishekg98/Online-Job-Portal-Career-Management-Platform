import React from "react";
import { Redirect, Route } from "react-router-dom";

function CompanyProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = JSON.parse(sessionStorage.getItem('authenticateDetails'))?.authenticated
  const isEmployer= JSON.parse(sessionStorage.getItem('authenticateDetails'))?.type==="emp"
  console.log(restOfProps)
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? (isEmployer?<Component {...props} />:<Redirect to="/unauthorized" /> ): <Redirect to="/signin" />
      }
    />
  );
}

export default CompanyProtectedRoute;