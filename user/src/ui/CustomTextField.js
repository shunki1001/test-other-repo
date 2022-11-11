import { Box, TextField, Typography } from "@mui/material";
import React from "react";

const CustomTextField = (props) => {
  const { label, width, name, register, errors, placeholder } = props;
  return (
    <Box sx={{ mt: "20px" }}>
      <Typography sx={{ marginBottom: "7px" }}>{label}</Typography>
      <TextField
        name={name}
        placeholder={placeholder}
        error={name in errors}
        helperText={errors[name]?.message}
        {...register(name)}
        sx={{
          width: width,
          "& p": {
            position: "absolute",
            bottom: "-2em",
          },
          "& fieldset": {
            borderWidth: "0",
          },
        }}
      />
    </Box>
  );
};

export default CustomTextField;
