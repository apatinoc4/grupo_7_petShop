const { check } = require("express-validator");

const validacionesRegistro = [
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
];

module.exports = validacionesRegistro;
