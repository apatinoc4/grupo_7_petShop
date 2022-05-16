const e = require("express");
const { validationResult } = require("express-validator");
const Producto = require("../helpers/Producto");

const productosController = {
  crearProducto: async function (req, res) {
    const listaProductos = await Producto.obtenerListaProductos();
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      await Producto.crearProducto({
        ...req.body,
        imagen: req.file ? req.file.filename : "default.jpg",
        tipo_id: parseInt(req.body.tipo_id),
      });

      return res.redirect("/listaProductos");
    } else {
      return res.render("listaProductos", {
        old: req.body,
        errors: errors.mapped(),
        listaProductos,
      });
    }
  },
  editarProducto: async function (req, res) {
    const errors = validationResult(req);
    const idProducto = parseInt(req.params.id);
    const productoAEditar = await Producto.encontrarProductoPorPK(idProducto);

    if (errors.isEmpty()) {
      await Producto.editarProducto(idProducto, {
        id: productoAEditar.id,
        ...req.body,
        imagen: req.file ? req.file.filename : productoAEditar.imagen,
      });
      res.redirect("/listaProductos");
    } else {
      return res.render("editarProducto", {
        old: req.body,
        errors: errors.mapped(),
        productoAEditar,
      });
    }
  },
  eliminarProducto: async function (req, res) {
    const idProducto = parseInt(req.params.id);

    await Producto.borrarProductoPorId(idProducto);

    return res.redirect("/listaProductos");
  },
  renderFormularioEdicion: async function (req, res) {
    const idProducto = parseInt(req.params.id);
    const productoAEditar = await Producto.encontrarProductoPorPK(idProducto);

    res.render("editarProducto", {
      productoAEditar,
    });
  },
  renderIndex: async function (req, res) {
    const alimentos = await Producto.encontrarProductoPorTipo(1);
    const juguetes = await Producto.encontrarProductoPorTipo(2);

    res.render("index", { alimentos, juguetes });
  },
  renderDetalleProducto: async function (req, res) {
    const idProducto = parseInt(req.params.id);
    const productoADetalle = await Producto.encontrarProductoPorPK(idProducto);
    const productosSimilares = await Producto.encontrarProductosSimilares(
      productoADetalle.tipo_id,
      4
    );

    res.render("productDetail", {
      productoADetalle,
      productosSimilares,
    });
  },
  renderListaProductos: async function (req, res) {
    const listaProductos = await Producto.obtenerListaProductos();

    res.render("listaProductos", {
      listaProductos,
    });
  },
};

module.exports = productosController;
