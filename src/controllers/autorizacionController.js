const e = require("express");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

let usuariosFilePath = path.join(__dirname, "../data/usuariosDB.json");
let userLoginInfoFilePath = path.join(__dirname, "../data/usuarioLogin.json");

let listaUsuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
let usersLoginInfo = JSON.parse(
  fs.readFileSync(userLoginInfoFilePath, "utf-8")
);

const autorizacionController = {
  renderLogin: function (req, res) {
    return res.render("login");
  },
  renderRegistro: function (req, res) {
    res.render("register");
  },
  cerrarSesion: function (req, res) {
    req.session.destroy();

    return res.redirect("/");
  },
  renderCarrito: function (req, res) {
    res.render("productCart");
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
  eliminarUsuario: function (req, res) {
    const idUsuario = req.params.id;
    const listaFiltrada = listaUsuarios.filter((elem) => elem.id != idUsuario);
    fs.writeFile(
      usuariosFilePath,
      JSON.stringify(listaFiltrada, null, " "),
      (err) => {
        if (err) {
          console.log("Fallo en la eliminación del usuario");
        } else {
          console.log("Usuario eliminado exitosamente");
        }
      }
    );
    res.redirect("/userProfile");
  },
  renderFormularioEdicion: function (req, res) {
    const idUsuario = req.params.id;
    const usuarioADetalle = listaUsuarios.find((elem) => elem.id == idUsuario);

    res.render("editarUsuario", {
      usuarioADetalle,
    });
  },
  renderUsuario: function (req, res) {
    const idUsuario = req.params.id;
    let usuarioADetalle = listaUsuarios.find((elem) => elem.id == idUsuario);

    res.render("userProfile", {
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
      res.redirect("/userProfile");
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
