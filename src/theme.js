// src/theme.js
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#023F81",
    },
    // You can switch this to 'dark' for dark theme
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});
