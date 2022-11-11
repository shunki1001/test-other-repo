import { Box } from "@mui/material";

const BoxCoveringInput = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        mt: 2,
        "& label": { fontSize: "14px" },
      }}>
      {props.children}
    </Box>
  );
};

export default BoxCoveringInput;
