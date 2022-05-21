const e = require("express");
const Producto = require("../helpers/Producto");
const Usuario = require("../helpers/Usuario");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { hashSync } = bcrypt;

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
  buscarProductos: async function (req, res) {
    const productos = await Producto.encontrarProductoPorNombre(
      req.query.productoBuscado
    );
    const response = {
      meta: {
        status: 200,
        total: productos.length,
        url: "/api/productosfiltrados",
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
  buscarUsuarios: async function (req, res) {
    const usuarios = await Usuario.encontrarUsuariosPorEmail(
      req.query.usuarioBuscado
    );
    const response = {
      meta: {
        status: 200,
        total: usuarios.length,
        url: "/api/usuariosfiltrados",
      },
      data: usuarios,
    };
    console.log(usuarios, req.query.usuarioBuscado, "OEOOWOWOWOWO");
    res.json(response);
  },
  usuarioLoggeado: async function (req, res) {
    let usuarioLoggeado;
    const invitado = {
      nombre: "Invitado",
      admin: 2,
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

  cerrarSesion: function (req, res) {
    res.clearCookie("emailUsuario");
    req.session.destroy();

    const invitado = {
      nombre: "Invitado",
      admin: 2,
    };

    const response = {
      meta: {
        status: 200,
        total: 1,
        url: "/api/usuariologgeado",
      },
      data: invitado,
    };

    res.json(response);
  },

  procesarLogin: async function (req, res) {
    const usuarioAIngresar = await Usuario.encontrarUsuarioPorCampo(
      "email",
      req.body.email
    );

    let response;

    if (usuarioAIngresar) {
      const contrasenaCorrecta = bcrypt.compareSync(
        req.body.contrasena,
        usuarioAIngresar.contrasena
      );
      if (!contrasenaCorrecta) {
        res.status(401).send("credenciales incorrectos");
      }
      delete usuarioAIngresar.contrasena;
      req.session.usuarioLoggeado = usuarioAIngresar;
      response = {
        meta: {
          status: 200,
          total: 1,
          url: "/api/usuariologgeado",
        },
        data: usuarioAIngresar,
      };

      if (req.body.recordarUsuario) {
        res.cookie("emailUsuario", req.body.email, { MaxAge: 1000 * 60 * 5 });
      }

      res.json(response);
    }
    res.status(404).send("Usuario no se encuentra en base de datos");
  },
  registrarUsuario: async function (req, res) {
    const errors = validationResult(req);
    const contrasenaHasheada = hashSync(req.body.contrasena, 10);

    const usuarioEnDB = await Usuario.encontrarUsuarioPorCampo(
      "email",
      req.body.email
    );

    if (usuarioEnDB) {
      res.status(409).send("Usuario ya se encuentra registrado");
    }
    if (errors.isEmpty()) {
      Usuario.crearUsuario({
        ...req.body,
        foto: req.file ? req.file.filename : "default.jpg",
        contrasena: contrasenaHasheada,
        autoriza: req.body.autorizacion ? true : false,
        admin: false,
      });

      res.status(200).send("Usuario creado exitosamente");
    } else {
      res.status(400).send("error de validacion");
    }
  },
};

module.exports = apiController;
