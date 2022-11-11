import React from "react";

import HomeLayout from "../Layout/HomeLayout";
import { Box, Grid } from "@mui/material";
// import PersonSettings from "./components/PersonSettings";
import HelpSidebar from "../models/home/HelpSidebar";
import PersonSettings from "../models/home/PersonSettings";

const Home = () => {
  return (
    <HomeLayout title="商談対応者設定">
      <Grid container sx={{ bgcolor: "transparent" }}>
        <Grid item xs={12} sm={8.3}>
          <Box
            sx={{
              bgcolor: "#F0F2FA",
              borderRadius: "4px",
              border: "none",
              px: 3,
              py: 1,
            }}
          >
            <PersonSettings />
          </Box>
        </Grid>
        <Grid item xs={12} sm={0.2} sx={{ bgcolor: "transparent" }}></Grid>
        <Grid item xs={12} sm={3.5}>
          <Box
            sx={{
              bgcolor: "#ffffff",
              borderRadius: "4px",
              border: "none",
              boxShadow: "rgb(136 133 133 / 29%) 0px 3px 6px 0px",
              p: 3,
            }}
          >
            <HelpSidebar />
          </Box>
        </Grid>
      </Grid>
    </HomeLayout>
  );
};

export default Home;
