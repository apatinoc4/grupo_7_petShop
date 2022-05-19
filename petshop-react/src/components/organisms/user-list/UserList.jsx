import { React, useState, useEffect, useContext } from "react";
import "./UserList.scss";
import ReactPaginate from "react-paginate";
import ProductCard from "../../molecules/product-card/ProductCard";
import SearchField from "../../atoms/search-field/SearchField";
import ShoppingCart from "../../molecules/shopping-cart/ShoppingCart";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Fade from "react-reveal/Fade";
import UserCard from "../../molecules/user-card/UserCard";
import { PetShopContext } from "../../context/PetShopContextProvider";

const UserList = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 5;
  const pagesVisited = pageNumber * productsPerPage;
  const [users, setUsers] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [shoppingCartExpanded, setShoppingCartExpanded] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { loggedUserInfo } = useContext(PetShopContext);

  console.log(filteredUsers, "JAJAJAJ");
  console.log(loggedUserInfo, "OEWO");

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

  const fetchFilteredUserList = async (query) => {
    const response = await fetch(
      `/api/usuariosfiltrados?usuarioBuscado=${query}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();

    setFilteredUsers(jsonResponse.data);
  };

  const fetchUserList = async () => {
    const response = await fetch("/api/usuarios");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();

    setUsers(jsonResponse.data);
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <>
      {loggedUserInfo.admin === 1 ? (
        <div className="o-userlist-container">
          <h2 className="o-userlist-title">Directorio Usuarios</h2>
          <Box sx={{ width: "100%" }}>
            <Tabs
              TabIndicatorProps={{
                style: { backgroundColor: "#f2a341", height: "3px" },
              }}
              value={tabValue}
              onChange={handleTabChange}
            >
              <Tab value={0} label="Usuarios" wrapped />
              <Tab value={1} label="Resultados Búsqueda" wrapped />
            </Tabs>
          </Box>
          <Box sx={{ width: "100%" }}>
            <SearchField
              setTabValue={setTabValue}
              fetchFunction={fetchFilteredUserList}
            />
          </Box>
          {tabValue === 0 ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
                className="o-userlist-tabbox"
              >
                {users.map((elem, i) => {
                  return <UserCard user={elem} key={i} />;
                })}
                {/* {displayPaginatedProducts(products)} */}
              </Box>
              {/* <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Siguiente"}
                pageCount={pageCount(products)}
                onPageChange={changePage}
                containerClassName={"o-userlist-paginationcontainer"}
                previousLinkClassName={"o-userlist-previousbttn"}
                nextLinkClassName={"o-userlist-nextbttn"}
                disabledLinkClassName={"o-userlist-paginationdisabled"}
                activeClassName={"o-userlist-paginationactive"}
              /> */}
            </>
          ) : (
            <>
              {filteredUsers.length !== 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  {filteredUsers.map((elem, i) => {
                    return <UserCard user={elem} key={i} />;
                  })}
                </Box>
              ) : (
                <>
                  <div className="o-userlist-emptysearch">
                    <img
                      src={require("../../../assets/img/logoComidaNar.png")}
                      alt=""
                    />
                    <div>
                      <h3>Aquí estarán los resultados de tu búsqueda</h3>
                      <p>
                        Solo ingresa el email de la persona que quieras
                        encontrar
                      </p>
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
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserList;
