const db = require("../database/models");
const { Sequelize } = require("sequelize");

const Producto = {
  nombreArchivo: "./src/data/productosDB.json",
  obtenerListaProductos: function () {
    return db.Producto.findAll({
      include: [{ association: "tipo" }],
    });
  },
  generarId: async function () {
    const ultimoProducto = await db.Producto.findAll({
      attributes: ["id"],
      order: [["id", "DESC"]],
      raw: true,
    });

    if (ultimoProducto) {
      return ultimoProducto[0].id + 1;
    }

    return 1;
  },
  borrarProductoPorId: function (idProducto) {
    return db.Producto.destroy({ where: { id: idProducto }, force: false });
  },
  crearProducto: async function (nuevoProducto) {
    const idProductoACrear = await this.generarId();

    const productoACrear = {
      id: idProductoACrear,
      ...nuevoProducto,
    };

    return db.Producto.create(productoACrear);
  },
  encontrarProductosPorCampo: function (campo, valor) {
    return db.Producto.findAll({
      where: {
        [campo]: valor,
      },
    });
  },
  encontrarProductoPorPK: function (pk) {
    const productoEncontrado = db.Producto.findByPk(pk);

    return productoEncontrado;
  },
  encontrarProductoPorTipo: function (idTipo) {
    return db.Producto.findAll({
      where: { tipo_id: idTipo },
      include: ["tipo"],
    });
  },

  encontrarProductosSimilares: function (tipoId, cantidad) {
    return db.Producto.findAll({
      where: {
        tipo_id: tipoId,
      },
      limit: cantidad,
      order: Sequelize.literal("rand()"),
    });
  },

  editarProducto: async function (id, datosNuevos) {
    const datosPreviosProducto = await this.encontrarProductoPorPK(id);
    const productoEditado = {
      ...datosPreviosProducto,
      ...datosNuevos,
    };
    return db.Producto.update(productoEditado, {
      where: { id: productoEditado.id },
    });
  },
};

module.exports = Producto;
