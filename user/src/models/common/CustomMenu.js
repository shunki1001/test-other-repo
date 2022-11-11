import {
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";

import logoTop from "../../img/log-tp.png";

const menuOptions = [
  { label: "商談対応者設定", url: "/", external: false },
  { label: "アポイント管理", url: "/appointment", external: false },
  {
    label: "ヘルプ・お問い合わせ",
    url: "https://non-appoint.com/help.html",
    external: true,
  },
  {
    label: "利用規約",
    url: "https://non-appoint.com/terms.pdf",
    external: true,
  },
  {
    label: "プライバシーポリシー",
    url: "https://non-appoint.com/privacy.pdf",
    external: true,
  },
];

const CustomMenu = (props) => {
  const { menuOpen, setMenuOpen, variant, drawerWidth } = props;
  const { newNotice, selectedIndex } = useContext(DataContext);

  const navigate = useNavigate();

  const handleClickMenu = (menuItem, index) => {
    if (menuItem.external === true) {
      window.open(menuItem.url, "_blank");
      return null;
    } else {
      navigate(menuItem.url);
    }
  };

  return (
    <Drawer
      variant={variant}
      sx={{
        width: `${drawerWidth}px`,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: `${drawerWidth}px`,
          boxSizing: "border-box",
          backgroundColor: "#4357C9",
          overflowY: "hidden",
          height: "100vh",
        },
      }}
      open={menuOpen}
      onClose={() => setMenuOpen(false)}
    >
      <Box height="5vh"></Box>
      <Box height="5vh" width="100%" sx={{ pl: "2em" }}>
        <img src={logoTop} alt="logo" style={{ maxHeight: "100%" }} />
      </Box>
      <Box height="10vh"></Box>
      <List>
        {menuOptions.map((menuItem, index) => {
          return (
            <Box key={menuItem.label}>
              <ListItem disablePadding>
                <ListItemButton
                  selected={selectedIndex === index}
                  onClick={() => handleClickMenu(menuItem, index)}
                  sx={{
                    "&.Mui-selected": { backgroundColor: "#96A6FF" },
                  }}
                >
                  {index === 1 && newNotice === true ? (
                    <Badge badgeContent="new" color="error">
                      <ListItemText
                        primary={menuItem.label}
                        sx={{
                          color: "#ffffff",
                          ml: 4,
                          "& span": { fontSize: "0.85rem" },
                        }}
                      />
                    </Badge>
                  ) : (
                    <ListItemText
                      primary={menuItem.label}
                      sx={{
                        color: "#ffffff",
                        ml: 4,
                        "& span": { fontSize: "0.85rem" },
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
              {index === 1 && <Box height="53vh"></Box>}
            </Box>
          );
        })}
      </List>
    </Drawer>
  );
};

export default CustomMenu;
