const e = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../helpers/Usuario");

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

  procesarLogin: async function (req, res) {
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
