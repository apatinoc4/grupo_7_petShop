const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

router.get("/productCart", usuariosController.renderCarrito);

module.exports = router;
