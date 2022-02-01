const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController");

router.get("/", productosController.renderIndex);
router.get("/productDetail/:id", productosController.renderDetalle);

module.exports = router;
