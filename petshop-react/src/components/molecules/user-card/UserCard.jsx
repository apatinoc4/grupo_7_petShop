import { React, useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { PetShopContext } from "../../context/PetShopContextProvider";
import "./UserCard.scss";

const UserCard = (props) => {
  const { user, number } = props;
  const {
    id,
    nombre,
    email,
    fecha,
    pais,
    ciudad,
    direccion,
    admin,
    autoriza,
    foto,
  } = user;
  const { loggedUserInfo } = useContext(PetShopContext);
  return (
    <Card className="MuiCard-user m-usercard" sx={{ maxWidth: 370 }}>
      <CardMedia
        component="img"
        height="200"
        image={`http://localhost:3000/img/users/${foto}`}
        alt="userimg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <span className="m-usercard-cardindex">{number + 1} </span>
          {nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span>Id:</span>
          {id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span>Rol:</span>
          {admin === 1 ? "Administrador" : "Usuario"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span>Email:</span>
          {email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span>Fecha de nacimiento:</span>
          {fecha}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span>País:</span>
          {pais}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span>Ciudad:</span>
          {ciudad}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span>Dirección:</span>
          {direccion}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span>Autoriza:</span>
          {autoriza === 1 ? "Sí" : "No"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className="MuiButton-edit"
          // onClick={() => handleShoppingCartEdit(product)}
          startIcon={<EditIcon />}
          variant="contained"
        >
          Editar
        </Button>
        {loggedUserInfo.id !== id ? (
          <Button
            className="MuiButton-delete"
            // onClick={() => handleShoppingCartEdit(product)}
            startIcon={<DeleteIcon />}
            variant="contained"
          >
            Eliminar
          </Button>
        ) : (
          <></>
        )}
      </CardActions>
      <CardActions
        className={`MuiCard-${admin === 1 ? "admin" : "user"}`}
      ></CardActions>
    </Card>
  );
};

export default UserCard;
