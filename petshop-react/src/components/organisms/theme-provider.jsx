import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          ".MuiAccordionSummary-content": {
            display: "flex",
            alignItems: "center",
          },
          ".MuiAccordionSummary-root.Mui-expanded": {
            borderBottom: "1px solid rgb(0, 0, 0)",
            borderOpacity: "0.7",
          },
          ".MuiAccordionDetails-root": {
            ".MuiBox-root": {
              alignItems: "center",
              display: "flex",
              flexDirection: "row",

              ".MuiAccordionDetails-buyBox": {
                display: "flex",
                flexDirection: "row",
                width: "50%",
                justifyContent: "center",
              },
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          margin: "10px",
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          ".MuiBox-root": {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            backgroundColor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: "15px",
        },
      },
    },
  },
});

const PageThemeProvider = (props) => {
  const { children } = props;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default PageThemeProvider;
