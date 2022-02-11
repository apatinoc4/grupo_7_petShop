const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
  },
});

const uploadFile = multer({ storage });

router.get("/", productosController.renderIndex);
router.get("/productDetail/:id", productosController.renderDetalleProducto);
router.get("/listaProductos", productosController.renderListaProductos);
router.post(
  "/listaProductos/crear",
  uploadFile.single("imagen"),
  productosController.crearProducto
);
router.get(
  "/listaProductos/:id/editar/",
  productosController.renderFormularioEdicion
);
router.put("/listaProductos/:id/editar/", productosController.editarProducto);
router.delete(
  "/listaProductos/:id/eliminar/",
  productosController.eliminarProducto
);

module.exports = router;
