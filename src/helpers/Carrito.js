const db = require("../database/models");
const { Sequelize } = require("sequelize");

const Carrito = {
  obtenerListaPedidos: function () {
    return db.Pedido.findAll();
  },
  generarId: async function () {
    const ultimoPedido = await db.Pedido.findAll({
      attributes: ["id"],
      order: [["id", "DESC"]],
      raw: true,
    });

    if (ultimoPedido) {
      return ultimoPedido[0].id + 1;
    }

    return 1;
  },
};

module.exports = Carrito;
