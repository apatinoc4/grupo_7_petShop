const e = require("express");
const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productosDB.json");
let listaProductos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const alimentos = listaProductos.filter((i) => i.tipo === "alimento");
const juguetes = listaProductos.filter((i) => i.tipo === "juguete");
const archivosImagen = listaProductos.map((i) => i.imagen);
const arrayIds = listaProductos.map((i) => i.id);

const productosController = {
  crearProducto: function (req, res) {
    const { id, nombre, imagen, descripcion, precio, tipo } = req.body;
    const productoCreado = {
      id: id,
      nombre: nombre,
      imagen: imagen,
      descripcion: descripcion,
      precio: precio,
      tipo: tipo,
    };
    listaProductos.push(productoCreado);
    fs.writeFile(productsFilePath, JSON.stringify(listaProductos), (err) => {
      if (err) {
        console.log("Fallo en la creación del producto");
      } else {
        console.log("Producto creado exitosamente");
      }
    });
    res.redirect("/listaProductos");
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
  eliminarProducto: function (req, res) {
    const idProducto = req.params.id;
    const listaFiltrada = listaProductos.filter(
      (elem) => elem.id != idProducto
    );
    fs.writeFile(productsFilePath, JSON.stringify(listaFiltrada), (err) => {
      if (err) {
        console.log("Fallo en la eliminación del producto");
      } else {
        console.log("Producto eliminado exitosamente");
      }
    });
    res.redirect("/listaProductos");
  },
  renderFormularioEdicion: function (req, res) {
    const idProducto = req.params.id;
    const productoAEditar = listaProductos[idProducto];

    res.render("editarProducto", {
      productoAEditar,
      archivosImagen,
    });
  },
  renderIndex: function (req, res) {
    //Revision de session
    if (req.session.email == "undefined") {
      const login = "undefined";
    } else {
      const login = req.session.email;
    }

    if (req.session.user == "undefined") {
      const user = "undefined";
      res.render("index", { alimentos, juguetes, user });
    } else {
      const user = req.session.user;
      res.render("index", { alimentos, juguetes, user });
    }
  },
  renderDetalleProducto: function (req, res) {
    const idProducto = req.params.id;
    const producto = listaProductos[idProducto];
    let tipo;

    if (producto.tipo === "alimento") {
      tipo = alimentos;
    } else {
      tipo = juguetes;
    }

    // excluyo producto seleccionado para que no salga en productos similares
    const otrosProductos = tipo.filter((i) => i.nombre !== producto.nombre);

    //Reordeno los productos al azar y tomo 4 para mostrar como productos similares
    const productosSimilares = otrosProductos
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    res.render("productDetail", {
      productoADetalle: producto,
      productosSimilares,
    });
  },
  renderListaProductos: function (req, res) {
    let idCreacion;

    for (let i = 0; i <= arrayIds.length; i++) {
      if (arrayIds.indexOf(i) == -1) {
        idCreacion = i;
        break;
      } else {
        idCreacion = arrayIds.length;
      }
    }

    res.render("listaProductos", {
      listaProductos,
      archivosImagen,
      idCreacion,
    });
  },
  renderCarrito: function (req, res) {
    res.render("productCart");
  },
};

module.exports = productosController;
