const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
const path = require("path");

router.get("/productos", apiController.productos);
router.get("/filtrados", apiController.buscarProductos);
router.get("/usuarios", apiController.usuarios);

module.exports = router;
