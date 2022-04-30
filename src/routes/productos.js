const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController");
const multer = require("multer");
const path = require("path");
const proteccionRutasUsuarioMiddleware = require("../middlewares/proteccionRutasUsuarioMiddleware");
const proteccionRutasAdminMiddleware = require("../middlewares/proteccionRutasAdminMiddleware");
const validacionesCreacionProducto = require("../middlewares/validacionesCreacionProductoMiddleware");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/productos");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({ storage: storage });

router.get("/", productosController.renderIndex);
router.get("/productDetail/:id", productosController.renderDetalleProducto);
router.get(
  "/listaProductos",
  proteccionRutasUsuarioMiddleware,
  proteccionRutasAdminMiddleware,
  productosController.renderListaProductos
);
router.post(
  "/listaProductos/crear",
  upload.single("imagen"),
  validacionesCreacionProducto,
  productosController.crearProducto
);
router.get(
  "/listaProductos/:id/editar/",
  productosController.renderFormularioEdicion
);
router.put(
  "/listaProductos/:id/editar/",
  upload.single("imagen"),
  validacionesCreacionProducto,
  productosController.editarProducto
);
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
