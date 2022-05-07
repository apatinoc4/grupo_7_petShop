const e = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../helpers/Usuario");
const Producto = require("../helpers/Producto");

const autorizacionController = {
  renderLogin: function (req, res) {
    res.render("login");
  },

  renderRegistro: function (req, res) {
    res.render("register");
  },

  cerrarSesion: function (req, res) {
    res.clearCookie("emailUsuario");
    req.session.destroy();

    return res.redirect("/");
  },

  procesarLogin: async function (req, res) {
    var alertaExitosa = false;
    const alimentos = await Producto.encontrarProductoPorTipo(1);
    const juguetes = await Producto.encontrarProductoPorTipo(2);

    const usuarioAIngresar = await Usuario.encontrarUsuarioPorCampo(
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
      alertaExitosa = true;

      return res.render("index", { alimentos, juguetes, alertaExitosa });
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
