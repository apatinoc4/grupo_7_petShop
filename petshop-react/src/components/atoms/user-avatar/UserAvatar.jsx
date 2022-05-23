import React from "react";
import "./UserAvatar.scss";

const UserAvatar = (props) => {
  const { user } = props;
  const { nombre, admin, foto } = user;

  return (
    <div className="a-useravatar">
      {admin !== 2 ? (
        <div className="a-useravatar-profilepic">
          {foto && (
            <img src={`http://localhost:3000/img/users/${foto}`} alt="" />
          )}
        </div>
      ) : (
        <div className="a-useravatar-guestpic">
          <img
            src={`http://localhost:3000/img/users/logoInvitado.png`}
            alt=""
          />
        </div>
      )}
      <div className="a-useravatar-name">
        <p>Bienvenid@!</p>
        <h3>{nombre}</h3>
        <p>
          {admin === 1
            ? "Rol: Administrador"
            : admin === 0
            ? "Rol: Usuario"
            : ""}
        </p>
      </div>
    </div>
  );
};

export default UserAvatar;
