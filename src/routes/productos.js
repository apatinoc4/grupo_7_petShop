const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController");

router.get("/", productosController.renderIndex);
router.get("/productDetail/:id", productosController.renderDetalleProducto);
router.get("/listaProductos", productosController.renderListaProductos);
router.post("/listaProductos/crear", productosController.crearProducto);

module.exports = router;
