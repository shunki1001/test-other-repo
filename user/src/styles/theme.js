import { createTheme } from "@mui/material/styles";

export const fontFamily = ["Montserrat", "sans-serif"].join(",");

const theme = createTheme({
  pallete: {
    primary: {
      main: "#2469B3",
    },
    secondary: {
      main: "#000000",
    },

    text: {
      primary: "1B243D",
      secondary: "BFBFBF",
    },
    cancel: {
      main: "#808080",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: fontFamily,
    fontSize: 14,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "h6" && {
            fontWeight: 700,
          }),
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" && {
            backgroundColor: "#5e72e4",
            color: "#ffffff",
            paddingLeft: "3em",
            paddingRight: "3em",
          }),
          ...(ownerState.variant === "outlined" && {
            border: "2px solid #5e72e4",
            color: "#5e72e4",
            paddingLeft: "3em",
            paddingRight: "3em",
          }),
          "&.Mui-disabled": {
            backgroundColor: "#5E72E4",
            opacity: "0.45",
            color: "#fff",
          },
        }),
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: "#5E72E4",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          border: "none",
          boxShadow: "rgb(137 137 137 / 16%) 0px 4px 5px 0px",
          "& .MuiInput .MuiOutlinedInput-notchedOutline": {
            border: "0",
          },
          "& input": {
            fontWeight: 700,
            padding: "9.5px 14px",
          },
          "& fieldset": {
            borderWidth: "0",
          },
          input: {
            "&::placeholder": {
              // textOverflow: "ellipsis !important",
              color: "rgb(0, 0, 0)",
              fontWeight: "700",
            },
          },
        },
      },
    },
  },
});

export default theme;
