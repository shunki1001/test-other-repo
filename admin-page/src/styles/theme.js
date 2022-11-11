import { createTheme } from "@mui/material/styles";

export const fontFamily = ["Montserrat", "sans-serif"].join(",");

const theme = createTheme({
  palette: {
    primary: {
      main: "#2469B3",
    },
    text: {
      primary: "#1b243d",
      secondary: "#BFBFBF",
    },cancel: {
      main: '#808080',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: fontFamily,
  },
});

export default theme;
