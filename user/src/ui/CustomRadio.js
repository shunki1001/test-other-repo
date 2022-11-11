import React from "react";
import { Radio } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const CustomRadio = (props) => {
  return (
    <Radio
      icon={
        <div
          style={{
            content: "",
            background: "#fff",
            width: "0.84em",
            height: "0.84em",
            borderRadius: "0.5em",
            fontSize: "1.5rem",
          }}
        />
      }
      checkedIcon={
        <>
          <div
            style={{
              content: "",
              background: "#fff",
              position: "absolute",
              width: "1em",
              height: "1em",
              borderRadius: "0.5em",
              fontSize: "1.5rem",
            }}
          />
          <CircleIcon
            fontSize="small"
            sx={{
              color: "#5E72E4",
              position: "relative",
            }}
          />
        </>
      }
      {...props}
    />
  );
};

export default CustomRadio;
