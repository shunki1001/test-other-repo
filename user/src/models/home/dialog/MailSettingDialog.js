import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../contexts/DataContext";

const MailSettingDialog = (props) => {
  const { mailSetting, setMailSetting } = props;
  const { mailSubject, setMailSubject, mailContent, setMailContent, username } =
    useContext(DataContext);

  //   useEffect(() => {
  //     setMailSubject(`商談依頼ありがとうございます。`);
  //     setMailContent(`この度は、リード獲得自動化Saas「リードダイナミクス」にノンアポ商談依頼誠にありがとうございます。\nいつも大変お世話になっております。

  // 現在、別件のオンラインMTGに対応中でして、改めてオンラインMTGのお時間頂ければと思います。

  // 下記日程でご都合いかがでしょうか。

  // 日程調整URL
  // https://google.com/calendar.app

  // こちらMTG URLになります。
  // https://zoom.us/s/0000000（登録一切不要、お時間になりましたらアクセスお願いします）

  // 当日は営業が対応致します。

  // 緊急連絡先：090-0000-0000

  // ご返信お待ちしております。`);
  //   }, []);
  const contentSample = `この度は、リード獲得自動化Saas「リードダイナミクス」にノンアポ商談依頼誠にありがとうございます。\nいつも大変お世話になっております。

  現在、別件のオンラインMTGに対応中でして、改めてオンラインMTGのお時間頂ければと思います。

  下記日程でご都合いかがでしょうか。

  日程調整URL
  https://google.com/calendar.app

  こちらMTG URLになります。
  https://zoom.us/s/0000000（登録一切不要、お時間になりましたらアクセスお願いします）

  当日は営業が対応致します。

  緊急連絡先：090-0000-0000

  ご返信お待ちしております。`;

  const handleClickDialog = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    setMailSubject(data.get("subject"));
    setMailContent(data.get("content"));
    // console.log(data.get("content").match(/[\r\n]/gs));
    // console.log(data.get("content").replace(/\r?\n/g, "neXtLine"));
    setMailSetting(false);
  };
  return (
    <Dialog
      open={mailSetting}
      maxWidth="md"
      fullWidth
      onClose={() => setMailSetting(false)}
      sx={{
        "& .MuiDialog-paper": {
          padding: "40px 24px 20px 24px",
        },
      }}
      PaperProps={{ component: "form", onSubmit: handleClickDialog }}
    >
      <DialogContent sx={{ mx: 2 }}>
        <Box sx={{ textAlign: "center", "& p": { marginTop: "1em" } }}>
          <Typography variant="h5">オフライン時のフォローメール設定</Typography>
          <Typography>
            ※商談可能な曜日/時間帯以外の場合に送るメール内容になります。
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2} sx={{ textAlign: "right", p: 1 }}>
            件名：
          </Grid>
          <Grid item xs={12} sm={10}>
            <TextField
              id="subject"
              name="subject"
              fullWidth
              defaultValue={mailSubject}
            />
          </Grid>
          <Grid item xs={12} sm={2} sx={{ textAlign: "right", p: 1 }}>
            本文：
          </Grid>
          <Grid item xs={12} sm={10}>
            <TextField
              id="content"
              name="content"
              fullWidth
              defaultValue={mailContent}
              multiline
              maxRows={8}
              sx={{ fontSize: "14px" }}
              placeholder={contentSample}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", m: 3 }}>
        <Button onClick={() => setMailSetting(false)} variant="outlined">
          キャンセル
        </Button>
        <Button type="submit" variant="contained">
          メール設定完了
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MailSettingDialog;
