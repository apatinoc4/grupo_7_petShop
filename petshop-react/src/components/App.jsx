import React from "react";
import "./App.scss";
import Template from "./molecules/Template";
import ProductList from "./molecules/product-list/ProductList";
import Cover from "./molecules/cover/Cover";
import PageThemeProvider from "./organisms/theme-provider";
import AboutUs from "./molecules/about-us/AboutUs";

const App = () => {
  return (
    <React.Fragment>
      <div className="App">
        <PageThemeProvider>
          <Template>
            <Cover />
            <ProductList />
            <AboutUs />
          </Template>
        </PageThemeProvider>
      </div>
    </React.Fragment>
  );
};

export default App;
