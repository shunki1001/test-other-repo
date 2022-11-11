import { Snackbar } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { DataContext } from "../contexts/DataContext";

const MainLayout = () => {
  const { errorSnackOpen, setErrorSnackOpen } = useContext(DataContext);

  return (
    <>
      <Outlet />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={errorSnackOpen.open}
        message={errorSnackOpen.message}
        autoHideDuration={6000}
        onClose={() => setErrorSnackOpen({ ...errorSnackOpen, open: false })}
      />
    </>
  );
};

export default MainLayout;
