import { grey } from "@mui/material/colors";
import { createTheme, alpha, type PaletteColor, type PaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  export interface Palette {
    default?: PaletteColor;
  }

  export interface PaletteOptions {
    default?: PaletteColorOptions;
  }
}

export default function createPageTheme() {
  const theme = createTheme({
    palette: {
      grey: grey,
      default: {
        main: grey[300],
        dark: grey[400],
      },
    },
  });

  return createTheme(theme, {
    components: {
      MuiButton: {
        variants: [
          {
            props: {
              variant: "contained",
              color: "default",
            },
            style: {
              color: theme.palette.getContrastText(theme.palette.grey[300]),
            },
          },
          {
            props: {
              variant: "outlined",
              color: "default",
            },
            style: {
              color: theme.palette.text.primary,
              borderColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)",
              "&.Mui-disabled": {
                border: `1px solid ${theme.palette.action.disabledBackground}`,
              },
              "&:hover": {
                borderColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)",
                backgroundColor: alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
              },
            },
          },
          {
            props: {
              variant: "text",
              color: "default",
            },
            style: {
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
              },
            },
          },
        ],
      },
    },
  });
}
