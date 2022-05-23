const { redirect } = require("express/lib/response");

const proteccionRutasAutorizacionMiddleware = (req, res, next) => {
  if (req.session.usuarioLoggeado) {
    return res.redirect("/");
  }
  next();
};

module.exports = proteccionRutasAutorizacionMiddleware;
