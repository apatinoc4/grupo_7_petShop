import React from "react";
import "./App.scss";
import Template from "./molecules/Template";
import ProductList from "./organisms/product-list/ProductList";
import Cover from "./organisms/cover/Cover";
import PageThemeProvider from "./organisms/theme-provider";
import AboutUs from "./organisms/about-us/AboutUs";
import UserPanel from "./organisms/user-panel/UserPanel";
import PetShopContextProvider from "./context/PetShopContextProvider";
import UserList from "./organisms/user-list/UserList";
import { BrowserRouter } from "react-router-dom";
import SpeedDialTooltipOpen from "./atoms/burger-menu/BurgerMenu";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <PetShopContextProvider>
          <PageThemeProvider>
            <Template>
              <SpeedDialTooltipOpen />
              <Cover />
              <UserPanel />
              <UserList />
              <ProductList />
              <AboutUs />
            </Template>
          </PageThemeProvider>
        </PetShopContextProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;
