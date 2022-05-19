import { React, useState, useEffect, useContext } from "react";
import "./ProductList.scss";
import ReactPaginate from "react-paginate";
import ProductCard from "../../molecules/product-card/ProductCard";
import SearchField from "../../atoms/search-field/SearchField";
import ShoppingCart from "../../molecules/shopping-cart/ShoppingCart";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Fade from "react-reveal/Fade";
import { PetShopContext } from "../../context/PetShopContextProvider";

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 5;
  const pagesVisited = pageNumber * productsPerPage;
  const [products, setProducts] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [shoppingCartExpanded, setShoppingCartExpanded] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { loggedUserInfo } = useContext(PetShopContext);
  const searchQuery = decodeURI(window.location.search.split("=")[1]);

  //Paginator Logic

  const displayPaginatedProducts = (data) => {
    const productsToDisplay = data
      .slice(pagesVisited, pagesVisited + productsPerPage)
      .map((elem, i) => {
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
      });
    return productsToDisplay;
  };
  const pageCount = (data) => {
    const pageCount = Math.ceil(data.length / productsPerPage);
    return pageCount;
  };
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //Tab handler

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Product Fetching

  const fetchFilteredProductList = async (query) => {
    const response = await fetch(
      `/api/productosfiltrados?productoBuscado=${query}`
    );

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
  }, [searchQuery]);

  return (
    <div className="o-productlist-container">
      <Fade right>
        <div className="test"></div>
      </Fade>
      <h2 className="o-productlist-title">Nuestros Productos</h2>
      <Box sx={{ width: "100%" }}>
        <Tabs
          TabIndicatorProps={{
            style: { backgroundColor: "#f2a341", height: "3px" },
          }}
          value={tabValue}
          onChange={handleTabChange}
        >
          <Tab value={0} label="Productos" wrapped />
          <Tab value={1} label="Resultados Búsqueda" wrapped />
        </Tabs>
      </Box>
      <Box sx={{ width: "100%" }}>
        <SearchField
          setTabValue={setTabValue}
          fetchFunction={fetchFilteredProductList}
        />
      </Box>
      {tabValue === 0 ? (
        <>
          <Box className="o-productlist-tabbox">
            {displayPaginatedProducts(products)}
          </Box>
          <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Siguiente"}
            pageCount={pageCount(products)}
            onPageChange={changePage}
            containerClassName={"o-productlist-paginationcontainer"}
            previousLinkClassName={"o-productlist-previousbttn"}
            nextLinkClassName={"o-productlist-nextbttn"}
            disabledLinkClassName={"o-productlist-paginationdisabled"}
            activeClassName={"o-productlist-paginationactive"}
          />
        </>
      ) : (
        <>
          {filteredProducts.length !== 0 ? (
            <Box className="o-productlist-tabbox">
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
            </Box>
          ) : (
            <>
              <div className="o-productlist-emptysearch">
                <img
                  src={require("../../../assets/img/logoComidaNar.png")}
                  alt=""
                />
                <div>
                  <h3>Aquí estarán los resultados de tu búsqueda</h3>
                  <p>Busquemos juntos nuestro próximo producto favorito</p>
                </div>
              </div>
            </>
          )}
        </>
      )}
      <ShoppingCart
        shoppingCart={shoppingCart}
        shoppingCartExpanded={shoppingCartExpanded}
        setShoppingCartExpanded={setShoppingCartExpanded}
      />
      <Fade left>
        <div className="test2"></div>
      </Fade>
    </div>
  );
};

export default ProductList;
