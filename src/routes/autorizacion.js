const express = require("express");
const router = express.Router();
const autorizacionController = require("../controllers/autorizacionController");
const multer = require("multer");
const path = require("path");
const { check } = require("express-validator");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/users");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

//LOGIN
router.get("/login", autorizacionController.renderLogin);
router.post("/login", autorizacionController.procesarLogin);

//LOGOUT
router.get("/logout", autorizacionController.cerrarSesion);

router.get("/register", autorizacionController.renderRegistro);

router.get("/userProfile/:id", autorizacionController.renderUsuario);
router.get(
  "/userProfile/:id/editar/",
  autorizacionController.renderFormularioEdicion
);
router.put(
  "/userProfile/:id/editar/",
  upload.single("foto"),
  autorizacionController.editarUsuario
);

module.exports = router;
