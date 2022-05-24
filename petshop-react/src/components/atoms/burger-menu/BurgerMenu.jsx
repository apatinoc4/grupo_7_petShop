import { React, useState, useContext } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import GroupIcon from "@mui/icons-material/Group";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuIcon from "@mui/icons-material/Menu";
import FeedIcon from "@mui/icons-material/Feed";
import { PetShopContext } from "../../context/PetShopContextProvider";
import { HashLink as Link } from "react-router-hash-link";

export default function SpeedDialTooltipOpen() {
  const { loggedUserInfo } = useContext(PetShopContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        height: 330,
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "sticky",
        top: 0,
        right: 16,
        zIndex: 10,
        float: "right",
        boxSizing: "border-box",
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial tooltip"
        sx={{ position: "absolute", top: 16, right: 16 }}
        icon={<MenuIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="down"
      >
        {loggedUserInfo.admin !== 2 ? (
          <SpeedDialAction
            icon={
              <Link to="#user-panel" smooth>
                <FeedIcon />
              </Link>
            }
            tooltipTitle="Panel Usuario"
            tooltipOpen
          />
        ) : (
          <></>
        )}
        {loggedUserInfo.admin === 1 ? (
          <SpeedDialAction
            icon={
              <Link to="#user-list" smooth>
                <GroupIcon />
              </Link>
            }
            tooltipTitle="Usuarios"
            tooltipOpen
          />
        ) : (
          <></>
        )}
        <SpeedDialAction
          icon={
            <Link to="#product-list" smooth>
              <ShoppingCartIcon />
            </Link>
          }
          tooltipTitle="Productos"
          tooltipOpen
        />
        <SpeedDialAction
          icon={
            <Link to="#about-us" smooth>
              <GroupsIcon />
            </Link>
          }
          tooltipTitle="Equipo"
          tooltipOpen
        />

        {loggedUserInfo.admin !== 2 ? (
          <SpeedDialAction
            icon={<LogoutIcon />}
            tooltipTitle="Cerrar Sesión"
            tooltipOpen
            // onClick={handleClose}
          />
        ) : (
          <SpeedDialAction
            icon={
              <Link to="#user-panel" smooth>
                <LoginIcon />
              </Link>
            }
            tooltipTitle="Iniciar Sesión"
            tooltipOpen
          />
        )}
      </SpeedDial>
    </Box>
  );
}
