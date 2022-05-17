const cont = Array(100).fill(1);

window.addEventListener("load", function () {
  let botonComprar = document.querySelectorAll(".comprar");
  let botonMenos = document.querySelectorAll(".boton-menos");
  let botonMas = document.querySelectorAll(".boton-mas");
  let num = document.querySelectorAll(".num");

  botonMenos.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      if (cont[index] > 1) {
        cont[index] = cont[index] - 1;
        num[index].innerHTML = cont[index];
      }
    });
  });

  botonMas.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      cont[index] = cont[index] + 1;
      num[index].innerHTML = cont[index];
    });
  });
  let nombreUsuario = document.querySelector("#nombreUsuario");
  botonComprar.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      if (nombreUsuario != null) {
        let id = e.target.id;
        let numSel = document.querySelector("#num" + id);
        let cantidad = numSel.innerHTML;
        seleccionar(id, cantidad);
      } else {
        e.preventDefault();
        location.href = "/login";
      }
    });
  });
});

function seleccionar(id, cantidad) {
  let productos = {
    id: id,
    cantidad: cantidad,
  };

  let productosEnCarro = localStorage.getItem("productosEnCarro");

  if (productosEnCarro !== null && productosEnCarro !== "") {
    let arrProductos = productosEnCarro.split(",");
    arrProductos.push(JSON.stringify(productos));
    localStorage.setItem("productosEnCarro", arrProductos);
  } else {
    localStorage.setItem("productosEnCarro", JSON.stringify(productos));
  }

  // let productos = localStorage.getItem("productos");
  // let cantidades = localStorage.getItem("cantidades");

  // if (productos !== null) {
  //   let arr = productos.split(",");
  //   let arrCantidad = cantidades.split(",");
  //   arr.push(id);
  //   arrCantidad.push(cantidad);
  //   localStorage.setItem("productos", arr);
  //   localStorage.setItem("cantidades", arrCantidad);
  // } else {
  //   localStorage.setItem("productos", id);
  //   localStorage.setItem("cantidades", cantidad);
  // }
}
