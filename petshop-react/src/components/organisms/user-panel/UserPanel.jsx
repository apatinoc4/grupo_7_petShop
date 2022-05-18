import { React, useState, useEffect } from "react";
import "./UserPanel.scss";
import UserAvatar from "../../atoms/user-avatar/UserAvatar";
import Box from "@mui/material/Box";
import AdminCard from "../../atoms/admin-card/AdminCard";

const UserPanel = () => {
  const [userInfo, setUserInfo] = useState({});

  const fetchUserInfo = async () => {
    const response = await fetch("/api/usuariologgeado");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();

    setUserInfo(jsonResponse.data);
  };

  const adminOptions = [
    {
      title: "Productos",
      description: "test",
    },
    {
      title: "Usuarios",
      description: "test",
    },
  ];

  useEffect(() => {
    fetchUserInfo();
    console.log(userInfo);
  }, []);

  return (
    <div className="o-userpanel">
      <div className="o-userpanel-userinfo">
        <UserAvatar user={userInfo} />
      </div>
      <div className="o-userpanel-useroptions">
        {userInfo.admin === 1 ? (
          <>
            {adminOptions.map((elem, i) => {
              return <AdminCard key={i} option={elem} />;
            })}
          </>
        ) : (
          <>
            <Box>
              <p>hola :D</p>
            </Box>
          </>
        )}
      </div>
    </div>
  );
};

export default UserPanel;
