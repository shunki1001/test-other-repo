import { Box, Checkbox } from "@mui/material";
import React from "react";

const DateChoiceCard = (props) => {
  const { dayOfWeekChoices, fontSize } = props;
  return (
    <Box sx={{ fontSize: fontSize }}>
      <>
        <Checkbox
          checked={dayOfWeekChoices.mon}
          name="mon"
          size="small"
          sx={{ padding: "0px 3px" }}
        />
        月
        <Checkbox
          checked={dayOfWeekChoices.tue}
          name="tue"
          size="small"
          sx={{ padding: "0px 3px" }}
        />
        火
        <Checkbox
          checked={dayOfWeekChoices.wed}
          name="wed"
          size="small"
          sx={{ padding: "0px 3px" }}
        />
        水
        <Checkbox
          checked={dayOfWeekChoices.thu}
          name="thu"
          size="small"
          sx={{ padding: "0px 3px" }}
        />
        木
        <Checkbox
          checked={dayOfWeekChoices.fri}
          name="fri"
          size="small"
          sx={{ padding: "0px 3px" }}
        />
        金
        <Checkbox
          checked={dayOfWeekChoices.sat}
          name="sat"
          size="small"
          sx={{ padding: "0px 3px" }}
        />
        土
        <Checkbox
          checked={dayOfWeekChoices.sun}
          name="sun"
          size="small"
          sx={{ padding: "0px 3px" }}
        />
        日
      </>
    </Box>
  );
};

export default DateChoiceCard;
