const express = require("express");
const router = express.Router();
const carritoController = require("../controllers/carritoController");
const path = require("path");
const proteccionRutasUsuarioMiddleware = require("../middlewares/proteccionRutasUsuarioMiddleware");
const proteccionRutasAdminMiddleware = require("../middlewares/proteccionRutasAdminMiddleware");
const validacionesCreacionProducto = require("../middlewares/validacionesCreacionProductoMiddleware");

router.get(
  "/productCart",
  proteccionRutasUsuarioMiddleware,
  carritoController.renderCarrito
);
router.post("/productCart/crearPedido", carritoController.crearPedido);

module.exports = router;
