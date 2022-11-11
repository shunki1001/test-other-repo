import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import Menu from "../views/components/Menu";
import UserSelect from "../views/components/UserSelect";

const drawerWidth = "240";

const HomeLayout = (props) => {
  // hydrationエラー解消のため必要
  // eslint-disable-next-line
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  // メディアクエリ
  const isWideScreen = useMediaQuery({
    query: "(min-width:768px)",
  });

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {isWideScreen ? (
        // PCデザイン
        <>
          <Box sx={{ display: "flex" }}>
            <AppBar
              position="fixed"
              sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`,
                backgroundColor: "#f5f5f5",
              }}
            >
              <Toolbar>
                <Box sx={{ flexGrow: 1, textAlign: "right" }}>
                  <UserSelect />
                </Box>
              </Toolbar>
            </AppBar>
          </Box>
          <Menu variant="permanent" drawerWidth={drawerWidth} />
          <Box
            sx={{
              ml: `${drawerWidth}px`,
              backgroundColor: "#f7f9fa",
              minHeight: "100vh",
              py: 15,
            }}
          >
            <Box sx={{ mx: "2.5%", backgroundColor: "#ffffff" }}>
              {props.children}
            </Box>
          </Box>
        </>
      ) : (
        // スマホデザイン
        <>
          <Box sx={{ display: "flex" }}>
            <AppBar
              position="fixed"
              sx={{
                width: "100%",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Toolbar>
                <IconButton edge="start" onClick={() => setMenuOpen(true)}>
                  <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1, textAlign: "right" }}>
                  <UserSelect />
                </Box>
              </Toolbar>
            </AppBar>
          </Box>
          <Menu
            variant="temporary"
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            drawerWidth={drawerWidth}
          />
          <Box sx={{ mt: 10 }}>{props.children}</Box>
        </>
      )}
    </>
  );
};

export default HomeLayout;
