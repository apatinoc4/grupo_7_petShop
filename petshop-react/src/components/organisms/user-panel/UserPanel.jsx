import { React, useEffect, useContext, useCallback } from "react";
import "./UserPanel.scss";
import UserAvatar from "../../atoms/user-avatar/UserAvatar";
import Box from "@mui/material/Box";
import { PetShopContext } from "../../context/PetShopContextProvider";
import AdminOptions from "../../molecules/admin-options/AdminOptions";
import GuestOptions from "../../molecules/guest-options/GuestOptions";

const UserPanel = () => {
  const { loggedUserInfo, setLoggedUserInfo } = useContext(PetShopContext);

  const fetchUserInfo = useCallback(async () => {
    const response = await fetch("/api/usuariologgeado");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();

    setLoggedUserInfo(jsonResponse.data);
  }, [setLoggedUserInfo]);

  const logout = useCallback(async () => {
    const response = await fetch("/api/logout");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();

    setLoggedUserInfo(jsonResponse.data);
  }, [setLoggedUserInfo]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <div id="user-panel" className="o-userpanel">
      <div className="o-userpanel-userinfo">
        <UserAvatar user={loggedUserInfo} />
      </div>
      <div className="o-userpanel-actionpanel">
        {loggedUserInfo.admin === 1 ? (
          <AdminOptions logout={logout} />
        ) : loggedUserInfo.admin === 0 ? (
          <>
            <Box>
              <p>hola :D</p>
            </Box>
          </>
        ) : (
          <>
            <GuestOptions />
          </>
        )}
      </div>
    </div>
  );
};

export default UserPanel;
