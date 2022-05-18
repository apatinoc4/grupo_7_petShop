import React, { createContext, useState } from "react";

export const PetShopContext = createContext();

const PetShopContextProvider = ({ children }) => {
  const [loggedUserInfo, setLoggedUserInfo] = useState({});

  return (
    <PetShopContext.Provider value={{ loggedUserInfo, setLoggedUserInfo }}>
      {children}
    </PetShopContext.Provider>
  );
};

export default PetShopContextProvider;
