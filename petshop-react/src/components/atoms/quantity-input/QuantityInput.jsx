import React from "react";

import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const QuantityInput = (props) => {
  const { quantity, setQuantity } = props;

  return (
    <FormControl sx={{ m: 1, width: "25ch" }}>
      <OutlinedInput
        type="tel"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => setQuantity(parseInt(quantity) + 1)}
              edge="end"
            >
              <AddIcon />
            </IconButton>
          </InputAdornment>
        }
        startAdornment={
          <InputAdornment position="start">
            <IconButton
              disabled={quantity < 1 ? true : false}
              onClick={() => setQuantity(parseInt(quantity) - 1)}
              edge="start"
            >
              <RemoveIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default QuantityInput;
