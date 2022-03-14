const proteccionRutasUsuarioMiddleware = (req, res, next) => {
  if (req.session.usuarioLoggeado) {
    next();
  }
  console.log("back");
};

module.exports = proteccionRutasUsuarioMiddleware;
