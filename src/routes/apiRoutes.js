const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
const path = require("path");

//obtener info usuarios-productos

router.get("/productos", apiController.productos);
router.get("/productosfiltrados", apiController.buscarProductos);
router.get("/usuarios", apiController.usuarios);
router.get("/usuariosfiltrados", apiController.buscarUsuarios);
router.get("/usuariologgeado", apiController.usuarioLoggeado);

// autorizacion

router.get("/logout", apiController.cerrarSesion);

module.exports = router;
