const listaProductos = [
  {
    id: 0,
    nombre: "Bulto gato ESSENTIALS",
    imagen: "comidaGato3.jpeg",
    descripcion:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim fuga quasi inventore, ipsam eligendi repellendus ab, est corporis beatae totam dicta quod fugit doloribus rem? Maiores minus nesciunt esse ratione.",
    precio: "$55.000",
    tipo: "alimento",
  },
  {
    id: 1,
    nombre: "Lata para gatos",
    imagen: "comidaGato.jpg",
    descripcion:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim fuga quasi inventore, ipsam eligendi repellendus ab, est corporis beatae totam dicta quod fugit doloribus rem? Maiores minus nesciunt esse ratione.",
    precio: "$5.000",
    tipo: "alimento",
  },
  {
    id: 2,
    nombre: "Bulto perro PRO",
    imagen: "comidaPerro2.jpg",
    descripcion:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim fuga quasi inventore, ipsam eligendi repellendus ab, est corporis beatae totam dicta quod fugit doloribus rem? Maiores minus nesciunt esse ratione.",
    precio: "$60.000",
    tipo: "alimento",
  },
  {
    id: 3,
    nombre: "Bulto para gato",
    imagen: "comidaGato2.jpeg",
    descripcion:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim fuga quasi inventore, ipsam eligendi repellendus ab, est corporis beatae totam dicta quod fugit doloribus rem? Maiores minus nesciunt esse ratione.",
    precio: "$30.000",
    tipo: "alimento",
  },
  {
    id: 4,
    nombre: "Bulto para perros",
    imagen: "comidaPerro3.jpeg",
    descripcion:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim fuga quasi inventore, ipsam eligendi repellendus ab, est corporis beatae totam dicta quod fugit doloribus rem? Maiores minus nesciunt esse ratione.",
    precio: "$35.000",
    tipo: "alimento",
  },
  {
    id: 5,
    nombre: "Bulto perros PREMIUM",
    imagen: "comidaPerro4.jpeg",
    descripcion:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim fuga quasi inventore, ipsam eligendi repellendus ab, est corporis beatae totam dicta quod fugit doloribus rem? Maiores minus nesciunt esse ratione.",
    precio: "$40.000",
    tipo: "alimento",
  },
  {
    id: 6,
    nombre: "Perrito Salchicha",
    imagen: "juguetePerro.jpg",
    descripcion:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim fuga quasi inventore, ipsam eligendi repellendus ab, est corporis beatae totam dicta quod fugit doloribus rem? Maiores minus nesciunt esse ratione.",
    precio: "$70.000",
    tipo: "juguete",
  },
  {
    id: 7,
    nombre: "Muslo de peluche",
    imagen: "juguetePerro2.jpg",
    descripcion:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim fuga quasi inventore, ipsam eligendi repellendus ab, est corporis beatae totam dicta quod fugit doloribus rem? Maiores minus nesciunt esse ratione.",
    precio: "$50.000",
    tipo: "juguete",
  },
  {
    id: 8,
    nombre: "Banana de peluche",
    imagen: "juguetePerro3.jpg",
    descripcion:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim fuga quasi inventore, ipsam eligendi repellendus ab, est corporis beatae totam dicta quod fugit doloribus rem? Maiores minus nesciunt esse ratione.",
    precio: "$50.000",
    tipo: "juguete",
  },
  {
    id: 9,
    nombre: "Pelota feliz",
    imagen: "juguetePerro4.jpg",
    descripcion:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim fuga quasi inventore, ipsam eligendi repellendus ab, est corporis beatae totam dicta quod fugit doloribus rem? Maiores minus nesciunt esse ratione.",
    precio: "$70.000",
    tipo: "juguete",
  },
  {
    id: 10,
    nombre: "Hueso de goma",
    imagen: "juguetePerro5.jpg",
    descripcion:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim fuga quasi inventore, ipsam eligendi repellendus ab, est corporis beatae totam dicta quod fugit doloribus rem? Maiores minus nesciunt esse ratione.",
    precio: "$30.000",
    tipo: "juguete",
  },
  {
    id: 11,
    nombre: "Hueso de goma",
    imagen: "juguetePerro6.png",
    descripcion:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim fuga quasi inventore, ipsam eligendi repellendus ab, est corporis beatae totam dicta quod fugit doloribus rem? Maiores minus nesciunt esse ratione.",
    precio: "$30.000",
    tipo: "juguete",
  },
];
const alimentos = listaProductos.filter((i) => i.tipo === "alimento");
const juguetes = listaProductos.filter((i) => i.tipo === "juguete");

const productosController = {
  renderIndex: function (req, res) {
    res.render("index", { alimentos: alimentos, juguetes: juguetes });
  },
  renderDetalle: function (req, res) {
    res.render("productDetail");
  },
};

module.exports = productosController;
