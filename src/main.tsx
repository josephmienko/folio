import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppTheme from "./components/Brand/Theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import AppRouter from "./Routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <AppTheme mode="light">
        <CssBaseline />
        <AppRouter />
      </AppTheme>
  </React.StrictMode>
);