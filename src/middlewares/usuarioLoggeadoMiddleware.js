const usuarioLoggeadoMiddleware = (req, res, next) => {
  res.locals.hayUsuarioLoggeado = false;

  if (req.session.usuarioLoggeado) {
    res.locals.hayUsuarioLoggeado = true;
    res.locals.infoUsuarioLoggeado = req.session.usuarioLoggeado;
  }

  next();
};

module.exports = usuarioLoggeadoMiddleware;
