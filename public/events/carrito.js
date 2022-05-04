// function favoritas(id) {
//   return (
//     '<div class="ec-stars-wrapper">' +
//     `<a href="#" onclick="miCalificacion(${id},1)">&#9733;</a>` +
//     "</div>"
//   );
// }

function seleccionar(id, idCantidad) {
  let productos = localStorage.getItem("productos");
  let cantidad = localStorage.getItem("cantidad");

  if (productos !== null) {
    let arr = productos.split(",");
    // let arrCantidad = cantidad.split(",");
    arr.push(id);
    // arrCantidad.push(idCantidad);
    localStorage.setItem("productos", arr);
    // localStorage.setItem("cantidad", arrCantidad);
  } else {
    localStorage.setItem("productos", id);
    // localStorage.setItem("cantidad", idCantidad);
  }
}
let cont = Array(100).fill(1);

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
      }
    });
  });

  botonMas.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      cont[index] = cont[index] + 1;
      num[index].innerHTML = cont[index];
    });
  });

  agregar.forEach((button) => {
    button.addEventListener("click", function (e) {
      // e.preventDefault();
      seleccionar(e.target.id);
      // console.log(
      //   e.path[3].childNodes[3].childNodes[5].childNodes[3].childNodes[3]
      //     .innerHTML
      // );
    });
  });
});

// window.addEventListener("load", function () {
//   let agregar = document.querySelectorAll(".prueba");
//   agregar[1].addEventListener("click", function (e) {

//   });

//   // agregar[].addEventListener("click", function (e) {
//   //   e.preventDefault();
//   //   alert("Producto agregado");
//   // });

//   // alert("121231");
// });
