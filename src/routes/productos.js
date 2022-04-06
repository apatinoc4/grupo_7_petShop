const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController");
const proteccionRutasUsuarioMiddleware = require("../middlewares/proteccionRutasUsuarioMiddleware");
const proteccionRutasAdminMiddleware = require("../middlewares/proteccionRutasAdminMiddleware");

router.get("/", productosController.renderIndex);
router.get("/productDetail/:id", productosController.renderDetalleProducto);
router.get(
  "/listaProductos",
  proteccionRutasUsuarioMiddleware,
  proteccionRutasAdminMiddleware,
  productosController.renderListaProductos
);
router.post("/listaProductos/crear", productosController.crearProducto);
router.get(
  "/listaProductos/:id/editar/",
  productosController.renderFormularioEdicion
);
router.put("/listaProductos/:id/editar/", productosController.editarProducto);
router.delete(
  "/listaProductos/:id/eliminar/",
  productosController.eliminarProducto
);
router.get(
  "/productCart",
  proteccionRutasUsuarioMiddleware,
  productosController.renderCarrito
);

module.exports = router;
