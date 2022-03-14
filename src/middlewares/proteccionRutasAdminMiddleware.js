const proteccionRutasAdminMiddleware = (req, res, next) => {
  if (req.session.usuarioLoggeado.admin) {
    next();
  }
  console.log("back");
};

module.exports = proteccionRutasAdminMiddleware;
