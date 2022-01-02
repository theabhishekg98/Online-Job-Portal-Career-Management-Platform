import React from "react";
import { Redirect, Route } from "react-router-dom";

function AdminProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = JSON.parse(sessionStorage.getItem('authenticateDetails'))?.authenticated
  const isAdmin= JSON.parse(sessionStorage.getItem('authenticateDetails'))?.type==="admin"
  console.log(restOfProps)
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? (isAdmin?<Component {...props} />:<Redirect to="/unauthorized" /> ): <Redirect to="/signin" />
      }
    />
  );
}

export default AdminProtectedRoute;