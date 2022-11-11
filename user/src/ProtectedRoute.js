import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { DataContext } from "./contexts/DataContext";

const ProtectedRoute = () => {
  const { isAuth } = useContext(DataContext);
  //   if (localStorage.getItem("user")) {
  //     return <Outlet />;
  //   } else {
  //     return <Navigate to="/signin" replace />;
  //   }
  // if (isAuth === true) {
  //   return <Navigate to="/signin" replace />;
  // }
  return <Outlet />;
};

export default ProtectedRoute;
