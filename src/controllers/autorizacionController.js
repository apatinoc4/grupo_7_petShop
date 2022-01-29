const autorizacionController = {
  renderLogin: function (req, res) {
    res.render("login");
  },
  renderRegistro: function (req, res) {
    res.render("register");
  },
};

module.exports = autorizacionController;
