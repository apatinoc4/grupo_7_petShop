import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const UserCard = (props) => {
  const { user } = props;
  const {
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
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="200"
        image={`http://localhost:3000/img/users/${foto}`}
        alt="userimg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {nombre}
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
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
