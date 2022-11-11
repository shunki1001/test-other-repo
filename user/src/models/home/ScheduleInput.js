import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { DataContext } from "../../contexts/DataContext";
import DateChoice from "../../ui/DateChoice";
import GoogleCalendarChoice from "./GoogleCalendarChoice";
import CustomRadio from "../../ui/CustomRadio";

const ScheduleInput = (props) => {
  const { isGoogleCalendar, setIsGoogleCalendar } = useContext(DataContext);
  const { endTime, setEndTime, startTime, setStartTime } =
    useContext(DataContext);

  return (
    <Box sx={{ mt: 4, mb: 2, ml: 0.5 }}>
      <Typography variant="h6">商談可能な曜日/時間帯</Typography>
      <Box>
        <RadioGroup
          value={isGoogleCalendar}
          onChange={(e) => {
            setIsGoogleCalendar(e.target.value === "true");
          }}
          row
        >
          <FormControlLabel
            value={true}
            control={<CustomRadio />}
            label="Googleカレンダー連携"
          />
          <FormControlLabel
            value={false}
            control={<CustomRadio />}
            label="手動設置"
          />
        </RadioGroup>
      </Box>
      <Box height="5em" sx={{ mb: 1 }}>
        {isGoogleCalendar ? (
          <GoogleCalendarChoice setGoogleDialog={props.setGoogleDialog} />
        ) : (
          <DateChoice />
        )}
      </Box>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Typography sx={{ fontWeight: 700 }}>開始時刻</Typography>
          <TextField
            fullWidth
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            placeholder="10:00"
          />
        </Grid>
        <Grid item xs={12} md={1} sx={{ mt: 5, textAlign: "center" }}>
          ～
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography sx={{ fontWeight: 700 }}>終了時刻</Typography>
          <TextField
            fullWidth
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            placeholder="17:00"
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Button
            variant="outlined"
            onClick={() => {
              props.setMailSetting(true);
            }}
            sx={{
              marginTop: "1.5em",
              ml: 4,
              px: 1,
              border: "1px solid #5e72e4",
            }}
          >
            オフライン時の
            <br />
            フォローメール設定
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ScheduleInput;
