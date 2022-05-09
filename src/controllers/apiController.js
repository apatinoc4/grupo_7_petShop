const e = require("express");
const Producto = require("../helpers/Producto");
const Usuario = require("../helpers/Usuario");

const apiController = {
  productos: async function (req, res) {
    const productos = await Producto.obtenerListaProductos();
    const response = {
      meta: {
        status: 200,
        total: productos.length,
        url: "/api/productos",
      },
      data: productos,
    };
    res.json(response);
  },
  usuarios: async function (req, res) {
    const usuarios = await Usuario.obtenerListaUsuarios();
    const response = {
      meta: {
        status: 200,
        total: usuarios.length,
        url: "/api/usuarios",
      },
      data: usuarios,
    };
    res.json(response);
  },
};

module.exports = apiController;
