import * as React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { ThemeOptions } from "@mui/material/styles";
import themePrimitives from "./themePrimitives";
import { useMemo } from "react";


interface AppThemeProps {
  children: React.ReactNode;
  disableCustomTheme?: boolean;
  themeComponents?: ThemeOptions["components"];
}

export default function AppTheme({ children, mode }: { children: React.ReactNode; mode: "light" | "dark" }) {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: themePrimitives.palette.primary,
          secondary: themePrimitives.palette.secondary,
          background: {
            default: mode === "dark" ? themePrimitives.palette.background.darkMode.default : themePrimitives.palette.background.default,
            paper: mode === "dark" ? themePrimitives.palette.background.darkMode.paper : themePrimitives.palette.background.paper,
          },
          text: themePrimitives.palette.text,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}