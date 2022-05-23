import { React, useState, useContext } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Box from "@mui/material/Box";
import { PetShopContext } from "../../context/PetShopContextProvider";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./LoginForm.scss";
import Checkbox from "@mui/material/Checkbox";

const LoginForm = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { setLoggedUserInfo } = useContext(PetShopContext);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (loginData) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    };
    const response = await fetch("/api/login", requestOptions);
    const jsonResponse = await response.json();

    setLoggedUserInfo(jsonResponse.data);
  };

  return (
    <form className="a-loginform-form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <TextField
          className="magenta-field"
          autoComplete="email"
          autoFocus
          type="email"
          fullWidth
          {...register("email", {
            required: "Ingresa tu email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
          error={!!errors?.email}
          helperText={errors?.email ? errors.email.message : null}
          label="Email"
        />
        <FormControl className="magenta-field" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Contraseña
          </InputLabel>
          <OutlinedInput
            fullWidth
            type={passwordVisibility === true ? "text" : "password"}
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
            {...register("contrasena", {
              required: "Campo requerido",
              minLength: 5,
              maxLength: 12,
            })}
            error={!!errors?.contrasena}
            label="Contraseña"
          />
          {!!errors?.contrasena && (
            <FormHelperText error id="accountId-error">
              La contraseña debe tener entre 5 y 12 caracteres
            </FormHelperText>
          )}
        </FormControl>
        <Controller
          name="recordarUsuario"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} />}
              label="Recordar mi usuario"
            />
          )}
        />
        <Button
          type="submit"
          className="MuiButton-magenta MuiButton-guestForm"
          fullWidth
          variant="contained"
        >
          Iniciar Sesión
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
