import { React, useState } from "react";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./CreationForm.scss";
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
import SuccessModal from "../../atoms/success-modal/SuccessModal";

const CreationForm = (props) => {
  const { creating, updater } = props;
  const [successModalExpanded, setSuccessModalExpanded] = useState(false);
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

  const onSubmitUser = async (registerData) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    };
    const response = await fetch("/api/crearusuario", requestOptions);

    if (response.status === 200) {
      setSuccessModalExpanded(true);
    }

    updater();
  };

  const onSubmitProduct = async (registerData) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    };
    const response = await fetch("/api/crearproducto", requestOptions);

    if (response.status === 200) {
      setSuccessModalExpanded(true);
    }

    updater();
  };

  return (
    <div className="m-creation-form">
      <form
        onSubmit={
          creating === "user"
            ? handleSubmit(onSubmitUser)
            : handleSubmit(onSubmitProduct)
        }
      >
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          {creating === "user" ? (
            <>
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
                        arilabel="toggle password visibility"
                        onClick={() =>
                          setPasswordVisibility(!passwordVisibility)
                        }
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

              <TextField
                select
                defaultValue="false"
                fullWidth
                {...register("admin")}
                label="Tipo de usuario"
              >
                <MenuItem value="false">Usuario</MenuItem>
                <MenuItem value="true">Administrador</MenuItem>
              </TextField>

              <Controller
                name="autorizacion"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="Autoriza envio de contenido"
                  />
                )}
              />
              <Button
                type="submit"
                className="MuiButton-logout"
                fullWidth
                variant="contained"
              >
                Crear Usuario
              </Button>
            </>
          ) : (
            <>
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
                autoComplete="precio"
                autoFocus
                type="tel"
                fullWidth
                {...register("precio", {
                  required: "Ingresa un precio",
                })}
                error={!!errors?.precio}
                helperText={errors?.precio ? errors.precio.message : null}
                label="Precio"
              />
              <TextField
                select
                defaultValue="1"
                fullWidth
                {...register("tipo_id")}
                label="Tipo de Producto"
              >
                <MenuItem value="1">Alimento</MenuItem>
                <MenuItem value="2">Juguete</MenuItem>
              </TextField>
              <TextField
                autoComplete="descripcion"
                type="text"
                multiline
                fullWidth
                {...register("descripcion", {
                  required: "Ingresa una descripcion",
                })}
                error={!!errors?.descripcion}
                helperText={
                  errors?.descripcion ? errors.descripcion.message : null
                }
                label="Descripcion"
              />
              <Button
                type="submit"
                className="MuiButton-logout"
                fullWidth
                variant="contained"
              >
                Crear Producto
              </Button>
            </>
          )}
        </Box>
      </form>
      <SuccessModal
        successModalExpanded={successModalExpanded}
        setSuccessModalExpanded={setSuccessModalExpanded}
      />
    </div>
  );
};

export default CreationForm;
