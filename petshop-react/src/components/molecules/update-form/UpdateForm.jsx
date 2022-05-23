import { React, useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./UpdateForm.scss";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import SuccessModal from "../../atoms/success-modal/SuccessModal";

const UpdateFormModal = (props) => {
  const {
    updateModalExpanded,
    setUpdateModalExpanded,
    updating,
    object,
    updater,
  } = props;
  const {
    id,
    nombre,
    fecha,
    pais,
    ciudad,
    direccion,
    admin,
    precio,
    tipo_id,
    descripcion,
  } = object;
  const [successModalExpanded, setSuccessModalExpanded] = useState(false);
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
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  const onSubmitUser = async (updateData) => {
    console.log(updateData);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    };
    const response = await fetch(`/api/usuario/${id}/editar`, requestOptions);

    if (response.status === 200) {
      setSuccessModalExpanded(true);
    }

    updater();
  };

  const onSubmitProduct = async (updateData) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    };
    const response = await fetch(`/api/producto/${id}/editar`, requestOptions);

    if (response.status === 200) {
      setSuccessModalExpanded(true);
    }

    updater();
  };

  //   const onSubmitUser = (data) => console.log(data);

  return (
    <div>
      <Modal
        className={`MuiModal-${updating === "user" ? "magenta" : "orange"}`}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={updateModalExpanded}
        onClose={() => setUpdateModalExpanded(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={updateModalExpanded}>
          <form
            onSubmit={
              updating === "user"
                ? handleSubmit(onSubmitUser)
                : handleSubmit(onSubmitProduct)
            }
          >
            <Box
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <p className="m-shoppingcart-title">
                {updating === "user"
                  ? "Edición de Usuario"
                  : "Edición de Producto"}
              </p>
              {updating === "user" ? (
                <>
                  <TextField
                    className="magenta-field"
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
                    defaultValue={nombre}
                  />
                  <TextField
                    type="date"
                    className="magenta-field"
                    defaultValue={fecha}
                    InputProps={{ inputProps: { max: "2004-05-24" } }}
                    fullWidth
                    {...register("fecha", {
                      required: "Ingresa tu fecha de nacimiento",
                    })}
                    error={!!errors?.fecha}
                    helperText={errors?.fecha ? errors.fecha.message : null}
                  />
                  <TextField
                    className="magenta-field"
                    select
                    defaultValue={pais}
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
                    className="magenta-field"
                    select
                    defaultValue={ciudad}
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
                    className="magenta-field"
                    autoComplete="direccion"
                    defaultValue={direccion}
                    type="text"
                    fullWidth
                    {...register("direccion", {
                      required: "Ingresa tu dirección",
                    })}
                    error={!!errors?.direccion}
                    helperText={
                      errors?.direccion ? errors.direccion.message : null
                    }
                    label="Dirección"
                  />

                  {!admin ? (
                    <>
                      <TextField
                        className="magenta-field"
                        select
                        defaultValue="false"
                        fullWidth
                        {...register("admin")}
                        label="Tipo de usuario"
                      >
                        <MenuItem value="false">Usuario</MenuItem>
                        <MenuItem value="true">Administrador</MenuItem>
                      </TextField>
                    </>
                  ) : (
                    <></>
                  )}

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
                  <div className="MuiModal-buttonContainer">
                    <Button type="submit" fullWidth variant="contained">
                      Actualizar Usuario
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <TextField
                    className="orange-field"
                    autoComplete="nombre"
                    autoFocus
                    defaultValue={nombre}
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
                    className="orange-field"
                    defaultValue={precio}
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
                    className="orange-field"
                    select
                    defaultValue={tipo_id}
                    fullWidth
                    {...register("tipo_id")}
                    label="Tipo de Producto"
                  >
                    <MenuItem value="1">Alimento</MenuItem>
                    <MenuItem value="2">Juguete</MenuItem>
                  </TextField>
                  <TextField
                    className="orange-field"
                    autoComplete="descripcion"
                    defaultValue={descripcion}
                    type="text"
                    rows={4}
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
                  <div className="MuiModal-buttonContainer">
                    <Button type="submit" fullWidth variant="contained">
                      Actualizar Producto
                    </Button>
                  </div>
                </>
              )}
            </Box>
          </form>
        </Fade>
      </Modal>
      <SuccessModal
        setParentModalExpanded={setUpdateModalExpanded}
        successModalExpanded={successModalExpanded}
        setSuccessModalExpanded={setSuccessModalExpanded}
      />
    </div>
  );
};

export default UpdateFormModal;
