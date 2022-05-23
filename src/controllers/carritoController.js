const e = require("express");
const { validationResult } = require("express-validator");
const Producto = require("../helpers/Producto");

const carritoController = {
  renderCarrito: function (req, res) {
    res.render("productCart");
  },
};

module.exports = carritoController;
