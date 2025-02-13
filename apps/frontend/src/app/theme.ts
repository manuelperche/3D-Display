import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    background: {
      default: "#222831",
    },
    primary: {
      main: "#31363F",
    },
    secondary: {
      main: "#76ABAE",
    },
    info: {
      main: "#EEEEEE",
    },
    error: {
      main: red.A400,
    },
    text: {
      secondary: "#FFFFFF",
    },
  },
});

export default theme;
