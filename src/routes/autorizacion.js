const express = require("express");
const router = express.Router();
const autorizacionController = require("../controllers/autorizacionController");

router.get("/login", autorizacionController.renderLogin);
router.get("/register", autorizacionController.renderRegistro);

module.exports = router;
