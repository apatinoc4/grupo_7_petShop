import { React, useState, useEffect } from "react";
import ProductCard from "../product-card/ProductCard";
import SearchField from "../../atoms/search-field/SearchField";
import ShoppingCart from "../shopping-cart/ShoppingCart";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [shoppingCartExpanded, setShoppingCartExpanded] = useState(false);

  const searchQuery = decodeURI(window.location.search.split("=")[1]);

  const fetchProductList = async (query) => {
    const response = await fetch(`/api/filtrados?productoBuscado=${query}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();

    setProducts(jsonResponse.data);
  };
  useEffect(() => {
    fetchProductList(searchQuery);
  }, []);

  return (
    <div>
      <div>
        <SearchField
          fetchProductList={fetchProductList}
          setProducts={setProducts}
        />
      </div>
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
      <ShoppingCart
        shoppingCart={shoppingCart}
        shoppingCartExpanded={shoppingCartExpanded}
        setShoppingCartExpanded={setShoppingCartExpanded}
      />
    </div>
  );
};

export default ProductList;
