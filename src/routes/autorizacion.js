const express = require("express");
const router = express.Router();
const autorizacionController = require("../controllers/autorizacionController");
const multer = require("multer");
const path = require("path");
const proteccionRutasAutorizacionMiddleware = require("../middlewares/proteccionRutasAutorizacionMiddleware.js");

//LOGIN
router.get(
  "/login",
  proteccionRutasAutorizacionMiddleware,
  autorizacionController.renderLogin
);

router.post("/login", autorizacionController.procesarLogin);

//LOGOUT
router.get("/logout", autorizacionController.cerrarSesion);

router.get(
  "/register",
  proteccionRutasAutorizacionMiddleware,
  autorizacionController.renderRegistro
);

module.exports = router;
