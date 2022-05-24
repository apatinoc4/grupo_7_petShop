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
        admin: req.body.admin ? Boolean(req.body.admin) : false,
      });

      res.status(200).send("Usuario creado exitosamente");
    } else {
      res.status(400).send("error de validacion");
    }
  },
  editarUsuario: async function (req, res) {
    const idUsuario = parseInt(req.params.id);
    const usuarioAEditar = await Usuario.encontrarUsuarioPorPK(idUsuario);
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await Usuario.editarUsuario(usuarioAEditar.email, {
        id: usuarioAEditar.id,
        ...req.body,
        foto: req.file ? req.file.filename : usuarioAEditar.foto,
      });
      res.status(200).send("Usuario editado exitosamente");
    } else {
      res.status(400).send("error de validacion");
    }
  },
  eliminarUsuario: async function (req, res) {
    const idUsuario = parseInt(req.params.id);

    await Usuario.borrarUsuarioPorId(idUsuario);

    res.status(200).send("Usuario eliminado exitosamente");
  },
  crearProducto: async function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await Producto.crearProducto({
        ...req.body,
        imagen: req.file ? req.file.filename : "default.jpg",
        tipo_id: parseInt(req.body.tipo_id),
      });

      res.status(200).send("Producto creado exitosamente");
    } else {
      res.status(400).send("error de validacion");
    }
  },
  editarProducto: async function (req, res) {
    const errors = validationResult(req);
    const idProducto = parseInt(req.params.id);
    const productoAEditar = await Producto.encontrarProductoPorPK(idProducto);

    console.log(errors);

    if (errors.isEmpty()) {
      await Producto.editarProducto(idProducto, {
        id: productoAEditar.id,
        ...req.body,
        imagen: req.file ? req.file.filename : productoAEditar.imagen,
      });
      res.status(200).send("Producto editado exitosamente");
    } else {
      res.status(400).send("error de validacion");
    }
  },
  eliminarProducto: async function (req, res) {
    const idProducto = parseInt(req.params.id);

    await Producto.borrarProductoPorId(idProducto);

    res.status(200).send("Producto eliminado exitosamente");
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
