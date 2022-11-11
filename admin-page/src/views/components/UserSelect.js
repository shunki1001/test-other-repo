import { MenuItem, Button, Menu } from "@mui/material";
import React, { useState, useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const UserSelect = () => {
  const { signout } = useContext(DataContext);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState();

  const handleClickSignout = () => {
    signout();
  };
  return (
    <>
      <Button
        onClick={(e) => {
          setOpen(true);
          setAnchorEl(e.currentTarget);
        }}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ color: "#000", textTransform: "none" }}
      >
        testuser@gmail.com
      </Button>
      <Menu open={open} onClose={() => setOpen(false)} anchorEl={anchorEl}>
        <MenuItem onClick={handleClickSignout} disableRipple>
          ログアウト
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserSelect;
