const e = require("express");
const { validationResult } = require("express-validator");
const fs = require("fs");
const { userInfo } = require("os");
const path = require("path");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");

const { hashSync } = bcrypt;

const usuariosFilePath = path.join(__dirname, "../data/usuariosDB.json");
const listaUsuarios = Usuario.obtenerListaUsuarios();

const archivosImagen = listaUsuarios.map((i) => i.foto);

const usuariosController = {
  crearUsuario: function (req, res) {
    const errors = validationResult(req);
    const contrasenaHasheada = hashSync(req.body.contrasena, 10);
    const usuarioEnDB = Usuario.encontrarUsuarioPorCampo(
      "email",
      req.body.email
    );

    if (usuarioEnDB) {
      return res.render("register", {
        old: req.body,
        errors: {
          email: {
            msg: "este email ya se encuentra en la base de datos",
          },
        },
      });
    }

    if (errors.isEmpty()) {
      Usuario.crearUsuario({
        ...req.body,
        foto: req.file ? req.file.filename : "default.jpg",
        contrasena: contrasenaHasheada,
        autoriza: req.body.autorizacion ? true : false,
        admin: false,
      });

      res.redirect("/login");
    } else {
      return res.render("register", {
        old: req.body,
        errors: errors.errors,
      });
    }
  },

  crearUsuarioDesdeDirectorio: function (req, res) {
    const errors = validationResult(req);
    const contrasenaHasheada = hashSync(req.body.contrasena, 10);
    const usuarioEnDB = Usuario.encontrarUsuarioPorCampo(
      "email",
      req.body.email
    );
    const listaUsuarios = Usuario.obtenerListaUsuarios();

    if (usuarioEnDB) {
      return res.render("listaUsuarios", {
        old: req.body,
        errors: {
          email: {
            msg: "email en uso",
          },
        },
      });
    }

    if (errors.isEmpty()) {
      Usuario.crearUsuario({
        ...req.body,
        foto: req.file ? req.file.filename : "default.jpg",
        contrasena: contrasenaHasheada,
        autoriza: req.body.autorizacion ? true : false,
        admin: req.tipo === "administrador" ? true : false,
      });

      res.redirect("/listaUsuarios");
    } else {
      return res.render("listaUsuarios", {
        old: req.body,
        errors: errors.errors,
        listaUsuarios,
      });
    }
  },

  renderPerfilUsuarioLoggeado: (req, res) => {
    res.render("userProfile", {
      infoUsuario: req.session.usuarioLoggeado,
    });
  },

  renderPerfilDesdeDirectorio: function (req, res) {
    const listaUsuarios = Usuario.obtenerListaUsuarios();
    const idUsuario = req.params.id;
    const infoUsuario = listaUsuarios.find((elem) => elem.id == idUsuario);

    res.render("userProfile", {
      infoUsuario,
    });
  },

  editarUsuario: function (req, res) {
    let idUsuario = req.params.id;
    let usuarioOld = listaUsuarios.find((elem) => elem.id == idUsuario);

    let { id, nombre, usuario, email, fecha, pais, ciudad, direccion } =
      req.body;

    let foto = "";
    if (req.file != undefined) {
      foto = req.file.filename;
      console.log(foto);
    } else {
      foto = usuarioOld.foto;
    }

    const usuarioEditado = {
      id: idUsuario,
      nombre: nombre,
      usuario: usuario,
      email: email,
      fecha: fecha,
      pais: pais,
      ciudad: ciudad,
      autorizacion: autorizacion,
      direccion: direccion,
      foto: foto,
    };

    const usuarioADetalle = usuarioEditado;

    listaUsuarios.forEach((elem, idx) => {
      if (elem.id == idUsuario) {
        listaUsuarios[idx] = usuarioADetalle;
      }
    });
    fs.writeFile(
      usuariosFilePath,
      JSON.stringify(listaUsuarios, null, " "),
      (err) => {
        if (err) {
          console.log("Fallo en la edición del usuario");
        } else {
          console.log("Usuario editado exitosamente");
        }
      }
    );
    res.redirect("/listaUsuarios");
  },

  eliminarUsuario: function (req, res) {
    const idUsuario = parseInt(req.params.id);

    Usuario.borrarUsuarioPorId(idUsuario);

    res.redirect("/listaUsuarios");
  },

  renderEdicionUsuario: function (req, res) {
    let idUsuario = req.params.id;
    let usuarioAEditar = listaUsuarios.find((elem) => elem.id == idUsuario);
    let usuarioADetalle = usuarioAEditar;

    res.render("editarUsuario", {
      usuarioAEditar,
      archivosImagen,
      usuarioADetalle,
    });
  },
  // renderUsuario: function (req, res) {
  //   const idUsuario = req.params.id;
  //   const usuario = listaUsuarios[idUsuario];

  //   res.render("userProfile", {
  //     usuarioADetalle: usuario,
  //   });
  // },
  renderListaUsuarios: function (req, res) {
    const listaUsuarios = Usuario.obtenerListaUsuarios();

    res.render("listaUsuarios", {
      listaUsuarios,
    });
  },
};

module.exports = usuariosController;
