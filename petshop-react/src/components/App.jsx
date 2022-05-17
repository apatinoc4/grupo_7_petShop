import React from "react";
import "./App.scss";
import Template from "./molecules/Template";
import ProductList from "./molecules/product-list/ProductList";
import Cover from "./molecules/cover/Cover";
import PageThemeProvider from "./organisms/theme-provider";

const App = () => {
  return (
    <React.Fragment>
      <div className="App">
        <PageThemeProvider>
          <Template>
            <Cover />
            <ProductList />
          </Template>
        </PageThemeProvider>
      </div>
    </React.Fragment>
  );
};

export default App;
