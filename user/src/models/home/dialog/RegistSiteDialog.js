import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";

import { DataContext } from "../../../contexts/DataContext";
import registSite from "../../../functions/registSite";
import SiteRadio from "../SiteRadio";

const RegistSiteDialog = (props) => {
  const { siteOpen, setSiteOpen } = props;
  const { numberOfSite, userSiteList, setUserSiteList, userSite } =
    useContext(DataContext);
  const [addingSite, setAddingSite] = useState("");
  const [siteTitleList, setSiteTitleList] = useState([]);

  // const renderingRef = useRef(false);
  // useEffect(() => {
  //   if (renderingRef.current === false) {
  //     renderingRef.current = true;
  //   } else {
  //     if (userSite.length === 0) {
  //       setSiteOpen(true);
  //       console.log("koko?");
  //     } else {
  //       setSiteOpen(false);
  //       console.log("asoko?");
  //     }
  //   }
  // }, [userSite]);

  const handleAddClick = async () => {
    if (/https?/.test(addingSite)) {
      const httpIndex = addingSite.indexOf("://");
      const domainIndex = addingSite.indexOf("/", httpIndex + 3);
      if (domainIndex !== -1) {
        setUserSiteList([
          ...userSiteList,
          addingSite.slice(httpIndex + 3, domainIndex),
        ]);
      } else if (domainIndex === -1) {
        setUserSiteList([...userSiteList, addingSite.slice(httpIndex + 3)]);
      }
    } else {
      const domainIndex = addingSite.indexOf("/");
      if (domainIndex !== -1) {
        setUserSiteList([...userSiteList, addingSite.slice(0, domainIndex)]);
      } else if (domainIndex === -1) {
        setUserSiteList([...userSiteList, addingSite]);
      }
    }
  };
  const handleClickDialog = () => {
    registSite(userSiteList);
    setSiteOpen(false);
  };
  return (
    <Dialog
      open={siteOpen}
      maxWidth="md"
      fullWidth
      sx={{ "& .MuiDialog-paper": { background: "#F8F9FE" } }}
    >
      <DialogContent sx={{ mx: 10 }}>
        <Box sx={{ textAlign: "center", my: 4 }}>
          <Typography variant="h6">
            ノンアポを設置するサイトを追加してください
          </Typography>
          <Typography
            sx={{ fontSize: "12px", color: "#5E72E4", fontWeight: 700 }}
          >
            ※お客様のプランで登録できるサイトは{numberOfSite}つです
          </Typography>
        </Box>
        {userSiteList.length === 0 ? (
          <Typography sx={{ fontSize: "14px", color: "#CE1212", my: 5 }}>
            選択肢がありません。下記から設置するサイトのURLを入力してください。
          </Typography>
        ) : (
          <SiteRadio
            siteTitleList={siteTitleList}
            setSiteTitleList={setSiteTitleList}
          />
        )}
        <Divider sx={{ my: 4 }} />
        <Box sx={{ textAlign: "center" }}>
          <TextField
            autoFocus
            margin="dense"
            label="サイトURL"
            type="text"
            sx={{ width: "60%", "& input": { padding: "16px 14px" } }}
            value={addingSite}
            onChange={(e) => {
              setAddingSite(e.target.value);
            }}
          />
          <Button
            variant="contained"
            sx={{ mt: 1, ml: 3, py: 2 }}
            onClick={handleAddClick}
            disabled={
              numberOfSite < userSiteList.length + 1 || addingSite === ""
            }
          >
            追加
          </Button>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", mt: 3, mb: 8 }}>
        <Button
          onClick={() => handleClickDialog()}
          disabled={userSite === ""}
          variant="outlined"
          sx={{ mx: 3, py: "10px", px: 6 }}
        >
          キャンセル
        </Button>
        <Button
          onClick={() => handleClickDialog()}
          disabled={userSite === ""}
          variant="contained"
          sx={{ mx: 3, py: "10px", px: 6 }}
        >
          このサイトに設置
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistSiteDialog;
