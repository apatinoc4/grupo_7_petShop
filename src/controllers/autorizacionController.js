const e = require("express");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

let usuariosFilePath = path.join(__dirname, "../data/usuariosDB.json");
let listaUsuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));

const autorizacionController = {
  renderLogin: function (req, res) {
    return res.render("login");
  },
  renderRegistro: function (req, res) {
    res.render("register");
  },
  cerrarSesion: function (req, res) {
    res.clearCookie("emailUsuario");
    req.session.destroy();

    return res.redirect("/");
  },

  editarUsuario: function (req, res) {
    const idUsuario = req.params.id;
    let usuarioOld = listaUsuarios.find((elem) => elem.id == idUsuario);

    var {
      id,
      nombre,
      usuario,
      email,
      fecha,
      pais,
      ciudad,
      direccion,
      autorizacion,
    } = req.body;

    let foto = "";
    if (req.file != undefined) {
      foto = req.file.filename;
      console.log(foto);
    } else {
      foto = usuarioOld.foto;
    }
    if (autorizacion == undefined) {
      autorizacion = "off";
    }

    const usuarioEditado = {
      id: id,
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
        listaUsuarios[idx] = usuarioEditado;
      }
    });
    fs.writeFile(
      usuariosFilePath,
      JSON.stringify(listaUsuarios, null, " "),
      (err) => {}
    );
    res.redirect("/userProfile/" + usuarioADetalle.id);
  },
  renderFormularioEdicion: function (req, res) {
    const idUsuario = req.params.id;
    const usuarioADetalle = listaUsuarios.find((elem) => elem.id == idUsuario);

    res.render("editarUsuario", {
      usuarioADetalle,
    });
  },
  procesarLogin: function (req, res) {
    const usuarioAIngresar = Usuario.encontrarUsuarioPorCampo(
      "email",
      req.body.email
    );

    if (usuarioAIngresar) {
      const contrasenaCorrecta = bcrypt.compareSync(
        req.body.contrasena,
        usuarioAIngresar.contrasena
      );
      if (!contrasenaCorrecta) {
        return res.render("login", {
          errors: {
            email: {
              msg: "las credenciales son inválidas",
            },
          },
        });
      }
      delete usuarioAIngresar.contrasena;
      req.session.usuarioLoggeado = usuarioAIngresar;

      if (req.body.recordarUsuario) {
        res.cookie("emailUsuario", req.body.email, { MaxAge: 1000 * 60 * 5 });
      }
      return res.redirect("/");
    }
    return res.render("login", {
      errors: {
        email: {
          msg: "email no se encuentra en la base de datos",
        },
      },
    });
  },
};

module.exports = autorizacionController;
