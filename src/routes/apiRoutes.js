const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
const path = require("path");

router.get("/productos", apiController.productos);
router.get("/usuarios", apiController.usuarios);
router.get("/producto/:id", apiController.detail);

module.exports = router;
