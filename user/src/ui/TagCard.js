import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DateChoiceCard from "./DateChoiceCard";

const TagCard = (props) => {
  const {
    avatar,
    username,
    isGoogleCalendar,
    dayOfWeekChoices,
    startTime,
    endTime,
    id,
    issueAccountList,
    setIssueAccountList,
  } = props;

  const handleDelete = () => {
    setIssueAccountList(
      issueAccountList.filter((element) => {
        return element.id !== id;
      })
    );
  };
  return (
    <Grid item xs={12} md={6}>
      <Box
        sx={{
          height: "160px",
          width: "300px",
          bgcolor: "#F8F9FE",
          borderRadius: "12px",
          boxShadow: "0px 3px 6px 0px rgba(0,0,0,0.161)",
          px: 2,
          py: 1,
          "& p": { fontSize: "14px" },
        }}
      >
        <Box sx={{ width: "100%", display: "flex", mt: 1 }}>
          <Avatar src={avatar} sx={{ width: "30px", height: "30px" }} />
          <Box sx={{ flexGrow: 1, m: 1, fontWeight: "bold", fontSize: "12px" }}>
            {username}
          </Box>
          <IconButton onClick={handleDelete} sx={{ color: "#5E72E4" }}>
            <HighlightOffIcon />
          </IconButton>
        </Box>
        <Typography>商談可能な曜日/時間帯</Typography>
        {isGoogleCalendar ? (
          <Box
            sx={{
              display: "flex",
              "& img": { width: "20px", mr: 1 },
              "& p": { display: "inline-block" },
            }}
          >
            <img
              src="https://img.icons8.com/color/48/000000/google-calendar--v2.png"
              alt="googleCalendar logo"
            />
            <Typography>Googleカレンダーに準拠</Typography>
          </Box>
        ) : (
          <Box>
            <Box width="100%">
              <DateChoiceCard
                fontSize="10px"
                dayOfWeekChoices={dayOfWeekChoices}
              />
            </Box>
            <Box sx={{ pl: 1, pt: 1 }}>
              <Typography
                sx={{
                  display: "inline-block",
                  background: "white",
                  padding: "0.5em 2em",
                  borderRadius: "5px",
                  fontWeight: 700,
                }}
              >
                {startTime}
              </Typography>
              ～
              <Typography
                sx={{
                  display: "inline-block",
                  background: "white",
                  padding: "0.5em 2em",
                  borderRadius: "5px",
                  fontWeight: 700,
                }}
              >
                {endTime}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Grid>
  );
};

export default TagCard;
