import { Theme, alpha, Components } from '@mui/material/styles';
import { gray } from "./themePrimitives";

export const themeComponents: Components<Theme> = {
  // ✅ Surface Customizations (Merged from surfaces.tsx)
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: 'transparent', // Default transparency
        boxShadow: 'none',
        borderRadius: theme.shape.borderRadius,
        ...theme.applyStyles('dark', {
          backgroundColor: alpha(gray[900], 0.85),
        }),
      }),
    },
  },

  // ✅ Input Customizations (Merged from inputs.tsx)
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: theme.palette.divider,
          },
          '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.dark,
          },
        },
      }),
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        textTransform: 'none',
        borderRadius: theme.shape.borderRadius,
        fontWeight: theme.typography.fontWeightBold,
      }),
    },
  },

  // ✅ Feedback Customizations (Merged from feedback.tsx)
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
      }),
    },
  },
  MuiSnackbar: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.grey[900], 0.85),
        color: theme.palette.common.white,
      }),
    },
  },

  // ✅ Data Display Customizations (Merged from dataDisplay.tsx)
  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.text.primary,
      }),
    },
  },
    MuiChip: {
        styleOverrides: {
        root: {
            fontWeight: 600,
            borderWidth: "2px",
            transition: "all 0.2s ease-in-out",
        },
        outlined: {
            borderColor: "var(--chip-border-color, #1976d2)", // Default to primary
            color: "var(--chip-text-color, #1976d2)",
            "&:hover": {
            backgroundColor: "rgba(25, 118, 210, 0.1)", // Light hover effect
            },
        },
        filled: {
            backgroundColor: "var(--chip-bg-color, #1976d2)", // Default to primary
            color: "var(--chip-filled-text-color, #ffffff)",
        },
        },
    },
};
