import { React, useState } from "react";
import Button from "@mui/material/Button";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AdminCard from "../../atoms/admin-card/AdminCard";
import "./GuestOptions.scss";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LoginForm from "../../atoms/login-form/LoginForm";

const GuestOptions = (props) => {
  const [tabValue, setTabValue] = useState(0);

  //Tab handler

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="m-guestOptions">
      <h2>Queremos conocerte mejor</h2>
      <p>
        Inicia sesión o registrate para encontrar lo mejor, lo más bonito a los
        mejores precios
      </p>
      <Tabs
        className="MuiTabs-login"
        TabIndicatorProps={{
          style: { backgroundColor: "#f53049", height: "3px" },
        }}
        value={tabValue}
        onChange={handleTabChange}
      >
        <Tab className="MuiTab-user" value={0} label="Iniciar Sesión" wrapped />
        <Tab className="MuiTab-user" value={1} label="Registro" wrapped />
      </Tabs>
      {tabValue === 0 ? (
        <>
          <LoginForm />
        </>
      ) : (
        <>
          <p>Register</p>
        </>
      )}
    </div>
  );
};

export default GuestOptions;
