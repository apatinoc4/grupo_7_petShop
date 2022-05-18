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
  buscarProductos: async function (req, res) {
    const productos = await Producto.encontrarProductoPorNombre(
      req.query.productoBuscado
    );
    const response = {
      meta: {
        status: 200,
        total: productos.length,
        url: "/api/filtrados",
      },
      data: productos,
    };
    console.log(req.query, productos);
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
  usuarioLoggeado: async function (req, res) {
    let usuarioLoggeado;
    const invitado = {
      nombre: "Invitado",
      admin: 0,
    };
    if (req.session.usuarioLoggeado) {
      usuarioLoggeado = req.session.usuarioLoggeado;
    } else {
      usuarioLoggeado = invitado;
    }
    const response = {
      meta: {
        status: 200,
        total: 1,
        url: "/api/usuariologgeado",
      },
      data: usuarioLoggeado,
    };
    res.json(response);
  },
};

module.exports = apiController;
