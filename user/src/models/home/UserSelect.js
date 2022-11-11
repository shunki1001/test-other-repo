import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import React, { useContext, useState } from "react";
import { DataContext } from "../../contexts/DataContext";

const UserSelect = () => {
  const { enterprise, signout } = useContext(DataContext);

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
        sx={{ color: "#ffffff", fontSize: "17px" }}
      >
        {enterprise}
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
