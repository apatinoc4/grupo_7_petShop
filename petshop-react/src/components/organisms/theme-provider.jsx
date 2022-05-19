import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const magenta = "#f53049";
const orange = "#f2a341";
const darkGrey = "#292929";

const theme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          zIndex: 1,
          margin: "20px 0",
          position: "relative",
          "&.MuiAccordion-food": {
            borderLeft: "15px solid #f2a341",
          },
          "&.MuiAccordion-toy": {
            borderLeft: "15px solid #f53049",
          },
          ".MuiAccordionSummary-content": {
            display: "flex",
            alignItems: "center",
            position: "relative",
          },
          ".MuiAccordionIndex": {
            margin: "0 30px 0 15px",
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
            padding: "30px 20px",

            ".MuiBox-root": {
              alignItems: "center",
              display: "flex",
              flexDirection: "row",

              "div > .MuiTypography-root": {
                margin: "10px 0",
                span: {
                  fontWeight: 600,
                },
              },

              ".MuiAccordionDetails-description": {
                width: "60%",
              },
              ".MuiAccordionDetails-buyBox": {
                display: "flex",
                flexDirection: "row",
                width: "50%",
                justifyContent: "center",

                ".MuiButton-root": {
                  "&.MuiButton-add": {
                    backgroundColor: orange,
                  },
                  "&.MuiButton-buy": {
                    backgroundColor: magenta,
                  },
                },
              },
            },
          },
        },
      },
    },

    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.MuiSocialMedia": {
            svg: {
              color: "white",
              "&:hover": {
                color: orange,
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

          "&.MuiButton-logout": {
            backgroundColor: darkGrey,
            height: 50,
            width: 200,
          },
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
            width: "70%",
            borderLeft: "10px solid #f53049",
            borderRadius: 10,
            padding: 24,
            boxShadow: 24,
            p: 4,

            div: {
              width: "100%",
              marginTop: 10,
              display: "flex",
              justifyContent: "flex-end",
            },
            ".MuiButton-root": {
              backgroundColor: magenta,
              width: "20%",
            },
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginBottom: "20px",
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: orange,
          ".MuiTableRow-head": {
            ".MuiTableCell-root": {
              color: "white",
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: 20,
          "&.Mui-selected": {
            color: orange,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          "MuiCardContent-root": {
            padding: 25,
          },
          ".MuiCardActions-root": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 30,
            padding: 0,

            "&.Usuarios": {
              backgroundColor: magenta,
            },
            "&.Productos": {
              backgroundColor: orange,
            },

            ".MuiButton-root": {
              width: "100%",
              color: "white",
            },
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
