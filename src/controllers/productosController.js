const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productosDB.json");
let listaProductos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const alimentos = listaProductos.filter((i) => i.tipo === "alimento");
const juguetes = listaProductos.filter((i) => i.tipo === "juguete");
const archivosImagen = listaProductos.map((i) => i.imagen);

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
  renderIndex: function (req, res) {
    res.render("index", { alimentos: alimentos, juguetes: juguetes });
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
      productosSimilares: productosSimilares,
    });
  },
  renderListaProductos: function (req, res) {
    res.render("listaProductos", {
      listaProductos: listaProductos,
      archivosImagen: archivosImagen,
    });
  },
};

module.exports = productosController;
