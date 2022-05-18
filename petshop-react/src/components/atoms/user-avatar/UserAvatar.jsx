import React from "react";
import Avatar from "@mui/material/Avatar";

const UserAvatar = (props) => {
  const { user } = props;
  const { nombre, admin } = user;

  return (
    <div>
      {/* <Avatar>{nombre.charAt(0)}</Avatar> */}
      <p>Bienvenido!</p>
      <p>{nombre}</p>
      <p>Rol:{admin === 1 ? "Administrador" : "Usuario"}</p>
    </div>
  );
};

export default UserAvatar;
