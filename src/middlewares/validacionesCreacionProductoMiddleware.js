const { check } = require("express-validator");

const validacionesCreacionProducto = [
  check("nombre").notEmpty().withMessage("Debes ingresar un nombre"),
  check("precio").notEmpty().withMessage("Debes ingresar un precio"),
  check("descripcion").notEmpty().withMessage("Debes ingresar una descripcion"),
];

module.exports = validacionesCreacionProducto;
