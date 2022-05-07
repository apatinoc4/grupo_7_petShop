const carrito = [];
const cont = Array(100).fill(1);

function guardarCantidad(id, cantidad) {
  this.id = id;
  this.cantidad = cantidad;
}

window.addEventListener("load", function () {
  let agregar = document.querySelectorAll(".comprar");
  let botonMenos = document.querySelectorAll(".boton-menos");
  let botonMas = document.querySelectorAll(".boton-mas");
  let num = document.querySelectorAll(".num");

  botonMenos.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      if (cont[index] > 1) {
        cont[index] = cont[index] - 1;
        num[index].innerHTML = cont[index];
        carrito[index] = new guardarCantidad(e.target.id, cont[index]);
        console.log(carrito[index]);
        console.log(cont[index]);
      }
    });
  });

  botonMas.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      cont[index] = cont[index] + 1;
      num[index].innerHTML = cont[index];
      carrito[index] = new guardarCantidad(e.target.id, cont[index]);

      console.log(carrito[index]);
      console.log(cont[index]);
    });
  });

  agregar.forEach((button) => {
    button.addEventListener("click", function (e) {
      // e.preventDefault();
      let id = e.target.id;
      let producto = carrito.find((x) => x.id == id);
      let cantidad = producto == undefined ? 1 : producto.cantidad;

      seleccionar(id, cantidad);

      console.log(producto);
    });
  });
});

function seleccionar(id, idCantidad) {
  let productos = localStorage.getItem("productos");
  let cantidad = localStorage.getItem("cantidad");

  if (productos !== null) {
    let arr = productos.split(",");
    let arrCantidad = cantidad.split(",");
    arr.push(id);
    arrCantidad.push(idCantidad);
    localStorage.setItem("productos", arr);
    localStorage.setItem("cantidad", arrCantidad);
  } else {
    localStorage.setItem("productos", id);
    localStorage.setItem("cantidad", idCantidad);
  }
}
