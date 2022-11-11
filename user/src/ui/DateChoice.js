import { Box, Checkbox } from "@mui/material";
import React, { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

const DateChoice = (props) => {
  const { dayOfWeekChoices, setDayOfWeekChoices } = useContext(DataContext);
  const { mon, tue, wed, thu, fri, sat, sun } = dayOfWeekChoices;
  const handleChange = (e) => {
    setDayOfWeekChoices({
      ...dayOfWeekChoices,
      [e.target.name]: e.target.checked,
    });
    console.log(dayOfWeekChoices);
  };

  return (
    <Box sx={{ fontSize: props.fontSize }}>
      {" "}
      <>
        <Checkbox checked={mon} onChange={handleChange} name="mon" />月
        <Checkbox checked={tue} onChange={handleChange} name="tue" />火
        <Checkbox checked={wed} onChange={handleChange} name="wed" />水
        <Checkbox checked={thu} onChange={handleChange} name="thu" />木
        <Checkbox checked={fri} onChange={handleChange} name="fri" />金
        <Checkbox checked={sat} onChange={handleChange} name="sat" />土
        <Checkbox checked={sun} onChange={handleChange} name="sun" />日
      </>
    </Box>
  );
};

export default DateChoice;
