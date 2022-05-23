import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const magenta = "#f53049";
const orange = "#f2a341";
const darkGrey = "#292929";
const grey = "#a6a6a6";

const theme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          "&.magenta-field": {
            ".MuiInputLabel-root": {
              "&.Mui-focused": {
                color: magenta,
              },
            },
            ".MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: magenta,
              },
            },
          },
          "&.orange-field": {
            ".MuiInputLabel-root": {
              "&.Mui-focused": {
                color: orange,
              },
            },
            ".MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: orange,
              },
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          margin: "10px 0",
          "&.search-products": {
            "&.Mui-focused fieldset": {
              borderColor: orange,
            },
          },
          "&.search-users": {
            "&.Mui-focused fieldset": {
              borderColor: magenta,
            },
          },
        },
      },
    },
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
          "&.MuiButton-edit": {
            backgroundColor: grey,
            svg: {
              fill: "white",
            },
          },
          "&.MuiButton-delete": {
            backgroundColor: darkGrey,
            svg: {
              fill: "white",
            },
          },
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
          ".MuiBox-warningModal": {
            width: "30% !important",
            height: "200px",
            borderLeft: "10px solid red",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            p: {
              margin: 0,
            },

            ".MuiSvgIcon-root": {
              fill: "red",
              fontSize: 100,
              marginRight: 25,
            },

            ".MuiButton-agreecontinue": {
              width: "100% !important",
              backgroundColor: magenta,
              marginTop: 20,
            },
          },
          ".MuiBox-successModal": {
            width: "30% !important",
            height: "200px",
            borderLeft: "10px solid #00FF00",
          },
          "&.MuiModal-magenta": {
            ".MuiBox-root": {
              borderLeft: "10px solid #f53049",
              ".MuiButton-root": {
                backgroundColor: magenta,
              },
            },
          },
          "&.MuiModal-orange": {
            ".MuiBox-root": {
              borderLeft: "10px solid #f2a341",
              ".MuiButton-root": {
                backgroundColor: orange,
              },
            },
          },
          ".MuiBox-root": {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            width: "70%",
            borderRadius: 10,
            padding: 24,
            boxShadow: 24,
            p: 4,

            ".MuiModal-buttonContainer": {
              width: "100%",
              marginTop: 10,
              display: "flex",
              justifyContent: "flex-end",
            },
            ".MuiButton-root": {
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
          "&.MuiTabs-login": {
            marginTop: 20,
            width: "100%",
            // ".MuiTabs-flexContainer": {
            //   width: "100%",
            //   justifyContent: "flex-end",
            //   backgroundColor: "red",
            // },
          },
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
          "&.MuiTab-user": {
            "&.Mui-selected": {
              color: magenta,
            },
          },
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
          "&.MuiCard-user": {
            height: 550,
            width: 370,
            position: "relative",
          },
          "MuiCardContent-root": {
            padding: 25,
          },
          ".MuiCardActions-root": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 30,
            padding: 0,

            "&.MuiCard-admin": {
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: 20,
              backgroundColor: magenta,
            },
            "&.MuiCard-user": {
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: 25,
              backgroundColor: orange,
            },

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
