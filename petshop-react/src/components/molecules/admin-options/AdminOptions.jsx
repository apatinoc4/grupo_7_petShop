import React from "react";
import Button from "@mui/material/Button";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AdminCard from "../../atoms/admin-card/AdminCard";
import "./AdminOptions.scss";

const AdminOptions = (props) => {
  const { logout } = props;

  const adminOptions = [
    {
      title: "Productos",
      description: "Busca, crea, o modifica productos de nuestro inventario.",
      img: "productsBanner.jpg",
      links: "products",
    },
    {
      title: "Usuarios",
      description:
        "Consulta nuestra base de datos de usuarios, asigna o retira privilegios de administrador.",
      img: "usersBanner.jpg",
      links: "users",
    },
  ];

  return (
    <div className="m-adminOptions">
      <h2>Panel de control</h2>
      <p className="m-adminOptions-description">
        Accede a información de usuarios o productos
      </p>
      <div className="m-adminOptions-optioncards">
        {adminOptions.map((elem, i) => {
          return <AdminCard key={i} option={elem} />;
        })}
      </div>
      <div>
        <Button
          className="MuiButton-magenta"
          onClick={() => logout()}
          startIcon={<PowerSettingsNewIcon />}
          variant="contained"
        >
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};

export default AdminOptions;
