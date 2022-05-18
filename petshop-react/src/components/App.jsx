import React from "react";
import "./App.scss";
import Template from "./molecules/Template";
import ProductList from "./organisms/product-list/ProductList";
import Cover from "./organisms/cover/Cover";
import PageThemeProvider from "./organisms/theme-provider";
import AboutUs from "./organisms/about-us/AboutUs";
import UserPanel from "./organisms/user-panel/UserPanel";

const App = () => {
  return (
    <React.Fragment>
      <div className="App">
        <PageThemeProvider>
          <Template>
            <Cover />
            <UserPanel />
            <ProductList />
            <AboutUs />
          </Template>
        </PageThemeProvider>
      </div>
    </React.Fragment>
  );
};

export default App;
