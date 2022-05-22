const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
const path = require("path");
const validacionesRegistro = require("../middlewares/validacionesRegistroMiddleware");
const validacionesCreacionProducto = require("../middlewares/validacionesCreacionProductoMiddleware");
const validacionesEdicion = require("../middlewares/validacionesEdicionUsuarioMiddleware");

//obtener info usuarios-productos

router.get("/productos", apiController.productos);
router.get("/productosfiltrados", apiController.buscarProductos);
router.get("/usuarios", apiController.usuarios);
router.get("/usuariosfiltrados", apiController.buscarUsuarios);
router.get("/usuariologgeado", apiController.usuarioLoggeado);

// autorizacion
router.get("/logout", apiController.cerrarSesion);
router.post("/login", apiController.procesarLogin);

//registro y creacion usuario

router.post(
  "/crearusuario",
  validacionesRegistro,
  apiController.registrarUsuario
);

router.put(
  "/usuario/:id/editar/",
  validacionesEdicion,
  apiController.editarUsuario
);

router.delete("/usuario/:id/eliminar/", apiController.eliminarUsuario);

//creacion productos

router.post(
  "/crearproducto",
  validacionesCreacionProducto,
  apiController.crearProducto
);

router.put("/producto/:id/editar/", apiController.editarProducto);

router.delete("/producto/:id/eliminar/", apiController.eliminarProducto);

module.exports = router;
