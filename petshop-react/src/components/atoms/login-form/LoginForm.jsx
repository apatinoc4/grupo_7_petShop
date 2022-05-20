import { React, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const LoginForm = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  return (
    <FormGroup>
      <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type="email"
          // value={values.password}
          // onChange={handleChange('password')}
          label="Password"
        />
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">
          Contraseña
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={passwordVisibility === true ? "text" : "password"}
          // value={values.password}
          // onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setPasswordVisibility(!passwordVisibility)}
                edge="end"
              >
                {passwordVisibility === false ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
    </FormGroup>
  );
};

export default LoginForm;
