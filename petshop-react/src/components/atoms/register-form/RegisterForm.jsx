import { React, useState } from "react";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./RegisterForm.scss";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";

const RegisterForm = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  const countries = [
    {
      value: "colombia",
      label: "Colombia",
    },
    {
      value: "argentina",
      label: "Argentina",
    },
  ];

  const cities = [
    {
      value: "medellin",
      label: "Medellín",
    },
    {
      value: "buenos_aires",
      label: "Buenos Aires",
    },
  ];

  const onSubmit = async (registerData) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    };
    const response = await fetch("/api/crearusuario", requestOptions);

    console.log(response);
  };

  return (
    <form className="a-register-form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <TextField
          autoComplete="nombre"
          autoFocus
          type="text"
          fullWidth
          {...register("nombre", {
            required: "Ingresa un nombre",
          })}
          error={!!errors?.nombre}
          helperText={errors?.nombre ? errors.nombre.message : null}
          label="Nombre"
        />
        <TextField
          autoComplete="email"
          type="email"
          fullWidth
          {...register("email", {
            required: "Ingresa un email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
          error={!!errors?.email}
          helperText={errors?.email ? errors.email.message : null}
          label="Email"
        />
        <FormControl variant="outlined">
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
        <TextField
          type="date"
          InputProps={{ inputProps: { max: "2004-05-24" } }}
          fullWidth
          {...register("fecha", {
            required: "Ingresa tu fecha de nacimiento",
          })}
          error={!!errors?.fecha}
          helperText={errors?.fecha ? errors.fecha.message : null}
        />
        <TextField
          select
          defaultValue="colombia"
          fullWidth
          {...register("pais")}
          label="Pais"
        >
          {countries.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          defaultValue="medellin"
          fullWidth
          {...register("ciudad")}
          label="Ciudad"
        >
          {cities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          autoComplete="direccion"
          type="text"
          fullWidth
          {...register("direccion", {
            required: "Ingresa tu dirección",
          })}
          error={!!errors?.direccion}
          helperText={errors?.direccion ? errors.direccion.message : null}
          label="Dirección"
        />

        <Controller
          name="autorizacion"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} />}
              label="¿Deseas recibir contenido de promociones y novedades de nuestra tienda?"
            />
          )}
        />
        <Button
          type="submit"
          className="MuiButton-logout"
          fullWidth
          variant="contained"
        >
          Crea tu cuenta
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
