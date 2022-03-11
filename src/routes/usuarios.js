const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");
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
var upload = multer({ storage: storage });
router.get("/userProfile", usuariosController.renderPerfilUsuarioLoggeado);
router.post(
  "/userProfile/crear",
  upload.single("foto"),
  check("nombre").notEmpty().withMessage("Debes ingresar un nombre"),
  check("email")
    .notEmpty()
    .withMessage("Debes ingresar un email")
    .isEmail()
    .withMessage("Debesingresar un email valido"),
  check("fecha")
    .notEmpty()
    .withMessage("Debes ingresar tu fecha de nacimiento"),
  check("pais").notEmpty().withMessage("Debes ingresar un pais"),
  check("ciudad").notEmpty().withMessage("Debes ingresar una ciudad"),
  check("direccion").notEmpty().withMessage("Debes ingresar una direccion"),
  check("contrasena").notEmpty().withMessage("Debes ingresar una contraseña"),
  usuariosController.crearUsuario
);
router.get("/listaUsuarios", usuariosController.renderListaUsuarios);
router.post(
  "/listaUsuarios/crear",
  upload.single("foto"),
  check("nombre").notEmpty().withMessage("Debes ingresar un nombre"),
  check("usuario").notEmpty().withMessage("Debes ingresar un usuario"),
  check("email")
    .notEmpty()
    .withMessage("Debes ingresar un email")
    .isEmail()
    .withMessage("Debesingresar un email valido"),
  check("fecha")
    .notEmpty()
    .withMessage("Debes ingresar tu fecha de nacimiento"),
  check("pais").notEmpty().withMessage("Debes ingresar un pais"),
  check("ciudad").notEmpty().withMessage("Debes ingresar una ciudad"),
  check("direccion").notEmpty().withMessage("Debes ingresar una direccion"),
  check("contrasena").notEmpty().withMessage("Debes ingresar una contraseña"),

  usuariosController.crearUsuario
);
router.get(
  "/listaUsuarios/:id/editar/",
  usuariosController.renderEdicionUsuario
);
router.put(
  "/listaUsuarios/:id/editar/",
  upload.single("foto"),
  usuariosController.editarUsuario
);
router.delete(
  "/listaUsuarios/:id/eliminar/",
  usuariosController.eliminarUsuario
);

module.exports = router;
