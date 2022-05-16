import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          margin: "20px 0",
          ".MuiAccordionSummary-content": {
            display: "flex",
            alignItems: "center",
          },
          ".MuiAccordionSummary-name": {
            marginLeft: "20px",
          },
          ".MuiAccordionSummary-price": {
            fontSize: 20,
          },
          ".MuiAccordionSummary-root.Mui-expanded": {
            borderBottom: "1px solid #0000001f",
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
            borderRadius: 20,
            padding: 24,
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
