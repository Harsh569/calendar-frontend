// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material"; // To normalize CSS
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
