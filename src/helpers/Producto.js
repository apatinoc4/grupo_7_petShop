const fs = require("fs");

const Producto = {
  nombreArchivo: "./src/data/productosDB.json",
  obtenerListaProductos: function () {
    return JSON.parse(fs.readFileSync(this.nombreArchivo, "utf-8"));
  },
  generarId: function () {
    const listaProductos = this.obtenerListaProductos();
    const ultimoProducto = listaProductos.pop();

    if (ultimoProducto) {
      return ultimoProducto.id + 1;
    }
    return 1;
  },
  borrarProductoPorId: function (id) {
    const listaProductos = this.obtenerListaProductos();
    const listaSinProducto = listaProductos.filter(
      (Producto) => Producto.id !== id
    );

    fs.writeFileSync(
      this.nombreArchivo,
      JSON.stringify(listaSinProducto, null, " ")
    );

    return true;
  },
};

module.exports = Producto;
