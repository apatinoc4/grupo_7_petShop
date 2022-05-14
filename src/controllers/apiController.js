const e = require("express");
const Producto = require("../helpers/Producto");
const Usuario = require("../helpers/Usuario");

const apiController = {
  productos: async function (req, res) {
    let productos = await Producto.obtenerListaProductos();
    let response = {
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
    let usuarios = await Usuario.obtenerListaUsuarios();
    let response = {
      meta: {
        status: 200,
        total: usuarios.length,
        url: "/api/usuarios",
      },
      data: usuarios,
    };
    res.json(response);
  },
  detail: async (req, res) => {
    let id = req.params.id;
    let producto = await Producto.encontrarProductoPorPK(id);
    let response = {
      meta: {
        status: 200,
        total: producto.length,
        url: "/api/producto/:id",
      },
      data: producto,
    };
    res.json(response);
  },
};

module.exports = apiController;
