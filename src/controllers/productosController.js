const e = require("express");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

const Producto = require("../helpers/Producto");

const productsFilePath = path.join(__dirname, "../data/productosDB.json");
let listaProductos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const archivosImagen = listaProductos.map((i) => i.imagen);

const productosController = {
  crearProducto: async function (req, res) {
    const errors = validationResult(req);
    await Producto.crearProducto({
      ...req.body,
      foto: req.file ? req.file.filename : "default.jpg",
      tipo_id: parseInt(req.body.tipo_id),
    });
    // const { id, nombre, imagen, descripcion, precio, tipo } = req.body;
    // const productoCreado = {
    //   id: id,
    //   nombre: nombre,
    //   imagen: imagen,
    //   descripcion: descripcion,
    //   precio: precio,
    //   tipo: tipo,
    // };
    // listaProductos.push(productoCreado);
    // fs.writeFile(productsFilePath, JSON.stringify(listaProductos), (err) => {
    //   if (err) {
    //     console.log("Fallo en la creación del producto");
    //   } else {
    //     console.log("Producto creado exitosamente");
    //   }
    // });
    // res.redirect("/listaProductos");
    return res.redirect("/listaProductos");
  },
  editarProducto: function (req, res) {
    const idProducto = req.params.id;
    const { id, nombre, imagen, descripcion, precio, tipo } = req.body;

    const productoEditado = {
      id: id,
      nombre: nombre,
      imagen: imagen,
      descripcion: descripcion,
      precio: precio,
      tipo: tipo,
    };

    listaProductos.forEach((elem, idx) => {
      if (elem.id == idProducto) {
        listaProductos[idx] = productoEditado;
      }
    });
    fs.writeFile(productsFilePath, JSON.stringify(listaProductos), (err) => {
      if (err) {
        console.log("Fallo en la edición del producto");
      } else {
        console.log("Producto editado exitosamente");
      }
    });
    res.redirect("/listaProductos");
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
      archivosImagen,
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
      archivosImagen,
    });
  },
  renderCarrito: function (req, res) {
    res.render("productCart");
  },
};

module.exports = productosController;
