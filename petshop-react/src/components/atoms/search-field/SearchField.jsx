import { React, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

const SearchField = (props) => {
  const { fetchFunction, setTabValue, searchsFor } = props;
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (searchValue) => {
    fetchFunction(searchValue);
    setTabValue(1);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchFunction(searchValue);
      setTabValue(1);
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: "25ch" }}>
        <OutlinedInput
          className={`search-${searchsFor}`}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => handleSearch(searchValue)} edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
};

export default SearchField;
