import React from "react";
import "./UserAvatar.scss";

const UserAvatar = (props) => {
  const { user } = props;
  const { nombre, admin, foto } = user;

  return (
    <div className="a-useravatar">
      <div className="a-useravatar-profilepic">
        {foto && <img src={`http://localhost:3000/img/users/${foto}`} alt="" />}
      </div>
      <div className="a-useravatar-name">
        <p>Bienvenid@!</p>
        <h3>{nombre}</h3>
        <p>
          Rol:
          {admin === 1 ? "Administrador" : admin === 0 ? "Usuario" : "Invitado"}
        </p>
      </div>
    </div>
  );
};

export default UserAvatar;
