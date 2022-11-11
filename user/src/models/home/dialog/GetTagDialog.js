import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../contexts/DataContext";
import registSiteTag from "../../../functions/registSiteTag";
import TagCard from "../../../ui/TagCard";

const GetTagDialog = (props) => {
  const { getTag, setGetTag, setShowTag, setSaveClick } = props;
  const { userSite, setErrorSnackOpen, domain, isFirstId, accountList } =
    useContext(DataContext);

  const [issueAccountList, setIssueAccountList] = useState([]);

  useEffect(() => {
    setIssueAccountList(
      accountList.filter((item) => {
        return item.alreadyRegist === true;
      })
    );
  }, [accountList]);

  const handleClickDialog = async () => {
    const result = await registSiteTag(
      issueAccountList,
      userSite,
      setErrorSnackOpen,
      domain,
      isFirstId
    );
    if (result === true) {
      setGetTag(false);
      setShowTag(true);
      setSaveClick(false);
    } else {
      setGetTag(false);
    }
  };
  return (
    <Dialog
      open={getTag}
      maxWidth="md"
      fullWidth
      onClose={() => setGetTag(false)}
    >
      <DialogTitle>
        <Box
          sx={{
            textAlign: "center",
            mb: 1,
            "& p": { marginTop: "1em" },
            "& h5": { fontWeight: 700 },
          }}
        >
          <Typography variant="h5">商談タグを発行確認画面</Typography>
          <Typography>商談担当者の情報をご確認ください</Typography>
          <Typography sx={{ "& span": { color: "#4357C9" } }}>
            タグを設置するサイト：<span>{userSite}</span>
          </Typography>
          <Typography>
            バツボタンで↑このサイトに不要な担当者を削除できます。
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ mx: 15, height: "450px" }}>
        <Grid container spacing={3}>
          {issueAccountList.map((item) => {
            return (
              <TagCard
                key={item.id}
                avatar={item.avatar}
                username={item.username}
                isGoogleCalendar={item.isGoogleCalendar}
                startTime={item.startTime}
                endTime={item.endTime}
                dayOfWeekChoices={item.dayOfWeekChoices}
                id={item.id}
                issueAccountList={issueAccountList}
                setIssueAccountList={setIssueAccountList}
              />
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ mt: 3, mb: 3 }}>
        <Box sx={{ width: "50%", textAlign: "right", pr: 1 }}>
          <Button
            onClick={() => setGetTag(false)}
            variant="contained"
            sx={{
              width: "13em",
              background: "grey",
              borderRadius: "10px",
              py: "10px",
              px: 0,
            }}
          >
            キャンセル
          </Button>
        </Box>
        <Box sx={{ width: "50%", textAlign: "left", pl: 1 }}>
          <Button
            sx={{ width: "13em", borderRadius: "10px", py: "10px", px: 0 }}
            onClick={() => handleClickDialog()}
            variant="contained"
          >
            スクリプトタグを発行
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default GetTagDialog;
