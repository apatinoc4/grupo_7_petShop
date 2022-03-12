const usuarioLoggeadoMiddleware = (req, res, next) => {
  res.locals.hayUsuarioLoggeado =
    req.session && req.session.usuarioLoggeado ? true : false;

  next();
};

module.exports = usuarioLoggeadoMiddleware;
