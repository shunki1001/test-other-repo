import { Box, Button, Typography } from "@mui/material";
import React from "react";
import SearchInput from "./SearchInput";

const LabelOnTable = (props) => {
  const { setNewOpen } = props;
  return (
    <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
      <Typography variant="h6" sx={{ mx: 3 }}>
        ユーザー企業一覧
      </Typography>
      <Button variant="contained" sx={{}} onClick={() => setNewOpen(true)}>
        新規追加
      </Button>
      <Box sx={{ flexGrow: 1 }}></Box>
      <SearchInput />
    </Box>
  );
};

export default LabelOnTable;
