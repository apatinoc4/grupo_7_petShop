import { React, useState, useEffect } from "react";
import ProductCard from "../product-card/ProductCard";
import SearchField from "../../atoms/search-field/SearchField";
import ShoppingCart from "../shopping-cart/ShoppingCart";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [shoppingCartExpanded, setShoppingCartExpanded] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const searchQuery = decodeURI(window.location.search.split("=")[1]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const fetchFilteredProductList = async (query) => {
    const response = await fetch(`/api/filtrados?productoBuscado=${query}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();

    setFilteredProducts(jsonResponse.data);
  };

  const fetchProductList = async () => {
    const response = await fetch("/api/productos");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();

    setProducts(jsonResponse.data);
  };

  useEffect(() => {
    if (window.location.search !== "") {
      setTabValue(1);
    }
    fetchFilteredProductList(searchQuery);
    fetchProductList();
  }, []);

  return (
    <div>
      <div>
        <SearchField
          setTabValue={setTabValue}
          fetchProductList={fetchFilteredProductList}
          setProducts={setFilteredProducts}
        />
      </div>

      <Box sx={{ width: "100%" }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab value={0} label="Productos" wrapped />
          <Tab value={1} label="Resultados Busqueda" wrapped />
        </Tabs>
      </Box>
      {tabValue === 0 ? (
        <>
          {products.map((elem, i) => {
            return (
              <ProductCard
                key={i}
                number={i}
                product={elem}
                shoppingCart={shoppingCart}
                setShoppingCart={setShoppingCart}
                setShoppingCartExpanded={setShoppingCartExpanded}
              />
            );
          })}
        </>
      ) : (
        <>
          {filteredProducts.length !== 0 ? (
            <>
              {filteredProducts.map((elem, i) => {
                return (
                  <ProductCard
                    key={i}
                    number={i}
                    product={elem}
                    shoppingCart={shoppingCart}
                    setShoppingCart={setShoppingCart}
                    setShoppingCartExpanded={setShoppingCartExpanded}
                  />
                );
              })}
            </>
          ) : (
            <>
              <p>Hola</p>
            </>
          )}
        </>
      )}
      <ShoppingCart
        shoppingCart={shoppingCart}
        shoppingCartExpanded={shoppingCartExpanded}
        setShoppingCartExpanded={setShoppingCartExpanded}
      />
    </div>
  );
};

export default ProductList;
