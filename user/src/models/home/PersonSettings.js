import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../../scema";

import AccountSelect from "./AccountSelect";
import SwitchIcon from "../../ui/SwitchIcon";
import CustomTextField from "../../ui/CustomTextField";
import ScheduleInput from "./ScheduleInput";
import styles from "./person_settings.module.css";
import SubButtonInput from "./SubButtonInput";
import InviteUrl from "./InviteUrl";

import GetTagDialog from "./dialog/GetTagDialog";
import ShowTagCode from "./dialog/ShowTagCode";
import GoogleDialog from "./dialog/GoogleDialog";
import MailSettingDialog from "./dialog/MailSettingDialog";
import registAccount from "../../functions/registAccount";

const PersonSettings = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const {
    hookData,
    isFirst,
    setIsFirst,
    setIsFirstId,
    setAvatar,
    avatarLink,
    setAvatarLink,
    setThumbnail,
    thumbnailLink,
    setThumbnailLink,
    isGoogleCalendar,
    dayOfWeekChoices,
    startTime,
    endTime,
    isOneSubButton,
    googleId,
    mailSubject,
    mailContent,
    avatar,
    thumbnail,
    subButtonList,
    subButtonTitle,
    setErrorSnackOpen,
    account,
  } = useContext(DataContext);

  const [getTag, setGetTag] = useState(false);
  const [showTag, setShowTag] = useState(false);
  const [googleDialog, setGoogleDialog] = useState(false);
  const [mailSetting, setMailSetting] = useState(false);

  const [saveClick, setSaveClick] = useState(false);

  const handleClickGoTag = () => {
    setGetTag(true);
  };
  const onSubmit = async (data) => {
    registAccount(
      data,
      isFirst,
      isGoogleCalendar,
      dayOfWeekChoices,
      startTime,
      endTime,
      isOneSubButton,
      googleId,
      mailSubject,
      mailContent,
      avatar,
      setAvatarLink,
      thumbnail,
      setThumbnailLink,
      subButtonList,
      subButtonTitle,
      setErrorSnackOpen,
      setAvatar,
      setThumbnail,
      setSaveClick
    );
  };

  useEffect(() => {
    reset(hookData);
  }, [hookData]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          py: 1,
        }}
      >
        <AccountSelect />
        <FormControlLabel
          control={
            <SwitchIcon
              checked={isFirst}
              onChange={(e) => {
                if (e.target.checked) {
                  setIsFirstId(localStorage.getItem("userId"));
                  setIsFirst(e.target.checked);
                } else {
                  alert("誰か一人を選ぶ必要があります");
                }
              }}
              sx={{ mr: 1 }}
            />
          }
          label="このユーザーを先頭に配置"
          sx={{ ml: 2 }}
        />
        <Box sx={{ flexGrow: 1 }}></Box>
        <Button
          variant="contained"
          onClick={handleClickGoTag}
          disabled={!saveClick}
          sx={{ padding: "6px 4%" }}
        >
          商談タグを発行
        </Button>
      </Box>
      <Divider sx={{ height: "1vh" }} />
      <Box className={styles.person_setting}>
        <Box className={styles.save_button}>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            sx={{ padding: "0.6em 2em" }}
            disabled={Object.keys(errors).length > 0}
          >
            変更内容を保存
          </Button>
        </Box>
        <Grid
          container
          sx={{ alignItems: "center", rowGap: "1em" }}
          className={styles.margin_control}
        >
          <Grid item xs={12} md={5} className={styles.top_container}>
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
                <Avatar
                  className={styles.avatar}
                  alt="Profile image"
                  src={avatarLink}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography>プロフィール画像</Typography>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ padding: "5px 6%", mt: 1 }}
                >
                  ファイルを選択
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      let img = URL.createObjectURL(e.target.files[0]);
                      setAvatarLink(img);
                      setAvatar(e.target.files[0]);
                    }}
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={7} className={styles.top_container}>
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={12} md={5}>
                <Avatar
                  variant="rounded"
                  className={styles.thumbnail}
                  src={thumbnailLink}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography>サムネイル画像</Typography>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ padding: "5px 6%", mt: 1 }}
                >
                  ファイルを選択
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      let img = URL.createObjectURL(e.target.files[0]);
                      setThumbnailLink(img);
                      setThumbnail(e.target.files[0]);
                    }}
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              label="お名前（商談担当者）"
              name="username"
              register={register}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12} md={1}></Grid>
          <Grid item xs={12} md={7}>
            <CustomTextField
              label="商談希望があった場合の通知用メールアドレス"
              name="email"
              register={register}
              errors={errors}
              width="80%"
            />
          </Grid>
          <Grid item xs={12}>
            <ScheduleInput
              setGoogleDialog={setGoogleDialog}
              setMailSetting={setMailSetting}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              label="会社名"
              name="company"
              register={register}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12} md={1}></Grid>
          <Grid item xs={12} md={7}>
            <CustomTextField
              label="携帯の電話番号"
              name="phone"
              register={register}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CustomTextField
              label="商談URL"
              name="url"
              register={register}
              errors={errors}
              placeholder="ZoomやteamsなどのURLを記載ください"
              width="100%"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CustomTextField
              label="メインボタンのタイトル (最大8文字)"
              name="mainButton"
              register={register}
              errors={errors}
              placeholder="アポなし商談"
              width="14em"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <SubButtonInput />
          </Grid>
          <Grid item xs={12} md={12}>
            <Divider sx={{ height: "1vh" }} />
            <InviteUrl />
          </Grid>
          <Grid item xs={12} md={12} sx={{ height: "10vh" }}></Grid>
        </Grid>
      </Box>
      {/* モーダルコンポーネント */}

      {getTag && (
        <GetTagDialog
          getTag={getTag}
          setGetTag={setGetTag}
          setShowTag={setShowTag}
          setSaveClick={setSaveClick}
        />
      )}
      {showTag && <ShowTagCode showTag={showTag} setShowTag={setShowTag} />}
      {googleDialog && (
        <GoogleDialog
          googleDialog={googleDialog}
          setGoogleDialog={setGoogleDialog}
        />
      )}
      {mailSetting && (
        <MailSettingDialog
          mailSetting={mailSetting}
          setMailSetting={setMailSetting}
        />
      )}
    </>
  );
};

export default PersonSettings;
