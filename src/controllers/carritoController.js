const e = require("express");
const { validationResult } = require("express-validator");
const Carrito = require("../helpers/Carrito");

const carritoController = {
  renderCarrito: function (req, res) {
    res.render("productCart");
  },
  crearPedido: async function (req, res) {
    // const listaPedidos = await Carrito.obtenerListaPedidos();
    // const errors = validationResult(req);
    // let productos = await req.body;
    console.log(req.body);
  },
};

module.exports = carritoController;
