import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useContext, useEffect, useState } from "react";
import Menu from "../models/common/CustomMenu";
import UserSelect from "../models/home/UserSelect";
import SiteSelect from "../models/home/SiteSelect";
import RegistSiteDialog from "../models/home/dialog/RegistSiteDialog";
import { DataContext } from "../contexts/DataContext";

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
    query: "(min-width:1024px)",
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [siteOpen, setSiteOpen] = useState(false);

  const { userSite } = useContext(DataContext);

  return (
    <>
      {isWideScreen ? (
        // PCデザイン
        <>
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              zIndex: "-1",
              top: 0,
              height: "30vh",
              background:
                "linear-gradient(143.38deg, rgba(53, 68, 150, 0.81) 3.06%, rgba(82, 56, 168, 0.81) 118.21%)",
            }}
          ></Box>
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              zIndex: "-2",
              top: "0",
              minHeight: "calc(550px + 30vh)",
              height: "100vh",
              background: "#F8F9FA",
            }}
          ></Box>
          <Box sx={{ ml: `${drawerWidth}px` }}>
            <Box sx={{ display: "flex", height: "13vh" }}>
              <Box
                sx={{
                  flexGrow: 1,
                  textAlign: "right",
                  pr: 6,
                  pt: 4,
                  border: "none",
                }}
              >
                <UserSelect />
              </Box>
            </Box>
            <Menu variant="permanent" drawerWidth={drawerWidth} />
            {props.title === "商談対応者設定" ? (
              <Box
                sx={{
                  minHeight: "87vh",
                  height: "auto",
                  px: "2.5%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "7vh",
                    mb: "7px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      display: "inline-block",
                      fontSize: "24px",
                      fontWeight: "600",
                    }}
                  >
                    {props.title}
                  </Typography>
                  <Box sx={{ display: "inline-block", mx: 2 }}>
                    <SiteSelect setSiteOpen={setSiteOpen} />
                  </Box>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "transparent",
                    height: "calc(80vh- 7px)",
                  }}
                >
                  {props.children}
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  minHeight: "87vh",
                  height: "auto",
                  px: "2.5%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "7vh",
                    mb: "7px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      display: "inline-block",
                      fontSize: "24px",
                      fontWeight: "600",
                    }}
                  >
                    {props.title}
                  </Typography>
                  <Box sx={{ display: "inline-block", mx: 2 }}>
                    {props.title === "商談対応者設定" && (
                      <SiteSelect setSiteOpen={setSiteOpen} />
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "transparent",
                    height: "calc(80vh- 7px)",
                  }}
                >
                  {props.children}
                </Box>
              </Box>
            )}
          </Box>
          {siteOpen && (
            <RegistSiteDialog siteOpen={siteOpen} setSiteOpen={setSiteOpen} />
          )}
        </>
      ) : (
        // スマホデザイン
        <>
          <Box sx={{ display: "flex" }}>
            <AppBar
              position="fixed"
              sx={{
                width: "100%",
                background:
                  "linear-gradient(143.38deg, #354496 3.06%, #5238A8 118.21%)",
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
          <Box sx={{ mt: 10, bgcolor: "transparent" }}>
            <Typography
              sx={{
                fontSize: "2em",
                fontWeight: "600",
              }}
            >
              {props.title}
            </Typography>
            {props.title === "商談対応者設定" && <SiteSelect />}
            {props.children}
          </Box>
        </>
      )}
    </>
  );
};

export default HomeLayout;
