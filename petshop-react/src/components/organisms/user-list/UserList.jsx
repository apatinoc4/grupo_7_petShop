import { React, useState, useEffect, useContext } from "react";
import "./UserList.scss";
import ReactPaginate from "react-paginate";
import SearchField from "../../atoms/search-field/SearchField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import UserCard from "../../molecules/user-card/UserCard";
import { PetShopContext } from "../../context/PetShopContextProvider";
import CreationForm from "../../molecules/creation-form/CreationForm";

const UserList = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;
  const [users, setUsers] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const { loggedUserInfo } = useContext(PetShopContext);

  //Paginator Logic

  const pageCount = (data) => {
    const pageCount = Math.ceil(data.length / usersPerPage);
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

  const displayPaginatedUsers = (data) => {
    const usersToDisplay = data
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map((elem, i) => {
        return (
          <UserCard updater={fetchUserList} number={i} user={elem} key={i} />
        );
      });
    return usersToDisplay;
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
              className="MuiTabs-users"
              TabIndicatorProps={{
                style: { backgroundColor: "#f53049", height: "3px" },
              }}
              value={tabValue}
              onChange={handleTabChange}
            >
              <Tab className="MuiTab-user" value={0} label="Usuarios" wrapped />
              <Tab
                className="MuiTab-user"
                value={1}
                label="Resultados Búsqueda"
                wrapped
              />
              {loggedUserInfo.admin === 1 ? (
                <Tab
                  value={2}
                  className="MuiTab-user"
                  label="Crear Usuario"
                  wrapped
                />
              ) : (
                <></>
              )}
            </Tabs>
          </Box>
          <Box sx={{ width: "100%" }}>
            <SearchField
              setTabValue={setTabValue}
              fetchFunction={fetchFilteredUserList}
              searchsFor={"users"}
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
                {displayPaginatedUsers(users)}
              </Box>
              <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Siguiente"}
                pageCount={pageCount(users)}
                onPageChange={changePage}
                containerClassName={"o-userlist-paginationcontainer"}
                previousLinkClassName={"o-userlist-previousbttn"}
                nextLinkClassName={"o-userlist-nextbttn"}
                disabledLinkClassName={"o-userlist-paginationdisabled"}
                activeClassName={"o-userlist-paginationactive"}
              />
            </>
          ) : tabValue === 1 ? (
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
                    return (
                      <UserCard
                        updater={fetchUserList}
                        number={i}
                        user={elem}
                        key={i}
                      />
                    );
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
          ) : (
            <>
              <CreationForm creating="user" updater={fetchUserList} />
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserList;
