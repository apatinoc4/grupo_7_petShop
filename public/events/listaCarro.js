// const e = require("express");

window.addEventListener("load", function () {
  localStorage.removeItem("listaCarro");

  const root = document.getElementById("root");
  const container = document.createElement("div");

  container.setAttribute("class", "contenedor");

  root.appendChild(container);

  let productosEnCarro = localStorage.getItem("productosEnCarro");

  if (
    productosEnCarro != undefined &&
    productosEnCarro != null &&
    productosEnCarro != ""
  ) {
    let productos = JSON.parse("[" + productosEnCarro + "]");

    var productosUnicos = productos.filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );

    let productosString = JSON.stringify(productosUnicos);
    productosString = productosString.replace(/[[\]]/g, "");
    localStorage.setItem("productosEnCarro", productosString);

    let sumaTotal = 0;
    let totalContenedor = document.createElement("article");
    let precioTotal = document.createElement("p");
    let botonesComprar = document.createElement("div");
    let botonSeguir = document.createElement("button");
    let botonFinalizar = document.createElement("button");

    productosUnicos.forEach((productos, index) => {
      fetch(`http://localhost:3000/api/producto/${productos.id}/`)
        .then(function (response) {
          return response.json();
        })
        .then(function (producto) {
          let { id, nombre, imagen, descripcion, precio, tipo_id } =
            producto.data;

          const article = document.createElement("article");
          const imgContainer = document.createElement("div");
          const img = document.createElement("img");
          const info = document.createElement("div");
          const name = document.createElement("p");
          const desc = document.createElement("p");
          const cant = document.createElement("input");
          const cantText = document.createElement("p");

          const priceContainer = document.createElement("div");
          const numContainer = document.createElement("div");
          const botonMenos = document.createElement("button");
          const botonMas = document.createElement("button");

          const formEliminar = document.createElement("form");
          const botonEliminar = document.createElement("button");

          const price = document.createElement("p");
          const subtotal = document.createElement("p");

          article.setAttribute("class", "detalles-producto");
          imgContainer.setAttribute("class", "imagen-producto");
          img.setAttribute("class", "imgVista");
          info.setAttribute("class", "informacion");
          name.setAttribute("class", "nombre-producto");
          desc.setAttribute("class", "descripcion-producto");
          cant.setAttribute("class", "cantidad-producto");
          cant.setAttribute("id", "num" + id);
          subtotal.setAttribute("id", "sub" + id);

          cantText.setAttribute("class", "cantidad-texto");
          priceContainer.setAttribute("class", "precio-producto");
          numContainer.setAttribute("class", "num-container");

          botonMenos.setAttribute("class", "boton-menos");
          botonMas.setAttribute("class", "boton-mas");
          botonMenos.setAttribute("id", "menos" + id);
          botonMas.setAttribute("id", "mas" + id);
          botonMenos.innerHTML = "-";
          botonMas.innerHTML = "+";

          // formEliminar.setAttribute("action", "eliminar");
          formEliminar.setAttribute("class", "form-eliminar");
          botonEliminar.setAttribute("type", "submit");
          botonEliminar.setAttribute("class", "eliminar");
          botonEliminar.setAttribute("id", id);
          botonEliminar.innerHTML = "Eliminar";

          name.innerHTML = nombre;
          price.setAttribute("id", "precio" + id);
          price.innerHTML = "$" + precio;
          desc.innerHTML = descripcion;
          cant.setAttribute("value", productosUnicos[index].cantidad);
          cantText.innerHTML = "Cantidad: ";
          subtotal.setAttribute("class", "sub-texto");
          subtotal.setAttribute(
            "value",
            productosUnicos[index].cantidad * precio
          );

          subtotal.innerHTML =
            "Subtotal $" + productosUnicos[index].cantidad * precio;
          sumaTotal = productosUnicos[index].cantidad * precio + sumaTotal;
          if (index == productosUnicos.length - 1) {
            precioTotal.innerHTML = "TOTAL: $" + sumaTotal;
          }
          container.appendChild(article);
          article.appendChild(imgContainer);
          article.appendChild(info);
          article.appendChild(priceContainer);
          priceContainer.appendChild(price);
          priceContainer.appendChild(cantText);
          priceContainer.appendChild(numContainer);
          priceContainer.appendChild(subtotal);

          numContainer.appendChild(botonMenos);
          numContainer.appendChild(cant);
          numContainer.appendChild(botonMas);
          priceContainer.appendChild(formEliminar);

          info.appendChild(name);
          info.appendChild(desc);

          imgContainer.appendChild(img);
          img.setAttribute("src", "/img/productos/" + imagen);

          formEliminar.appendChild(botonEliminar);
        });
    });

    totalContenedor.setAttribute("class", "confirmacion-compra");
    precioTotal.setAttribute("class", "precio-total");
    botonesComprar.setAttribute("class", "botones-compra");
    botonSeguir.setAttribute("onclick", "window.location.href='/'");
    botonFinalizar.setAttribute("class", "precio-total");
    botonSeguir.innerHTML = "Seguir Comprando";
    botonFinalizar.innerHTML = "Finalizar compra";

    root.appendChild(totalContenedor);
    totalContenedor.appendChild(precioTotal);
    totalContenedor.appendChild(botonesComprar);
    botonesComprar.appendChild(botonSeguir);
    botonesComprar.appendChild(botonFinalizar);

    window.addEventListener("click", function (e) {
      if (e.target.classList.value == "eliminar") {
        let id = e.target.id;

        let productosFiltro = productosUnicos.filter(
          (productosUnicos) => productosUnicos.id != id
        );
        productosFiltro = JSON.stringify(productosFiltro);
        productosFiltro = productosFiltro.replace(/[[\]]/g, "");

        localStorage.setItem("productosEnCarro", productosFiltro);
        // e.preventDefault();
      }
      if (e.target.classList.value == "boton-mas") {
        let id = e.target.id;
        let idNum = id.slice(3);
        let numSel = document.querySelector("#num" + idNum);
        let nuevoNum = parseInt(numSel.value) + 1;
        let subSel = document.querySelector("#sub" + idNum);
        let precioUni = document.querySelector("#precio" + idNum);
        let precioNum = precioUni.innerHTML.slice(1);

        subSel.innerHTML = "Subtotal $" + nuevoNum * precioNum;
        subSel.setAttribute("value", nuevoNum * precioNum);
        numSel.setAttribute("value", nuevoNum);

        let totalNum = 0;
        let subTodos = document.querySelectorAll(".sub-texto");
        console.log(subTodos);
        subTodos.forEach((element) => {
          totalNum = parseInt(element.attributes.value.nodeValue) + totalNum;
        });
        precioTotal.innerHTML = "TOTAL: $" + totalNum;
        productosUnicos.forEach((element) => {
          if (element.id == idNum) {
            element.cantidad = nuevoNum;
          }
        });

        let productosCantidades = JSON.stringify(productosUnicos);
        productosCantidades = productosCantidades.replace(/[[\]]/g, "");
        localStorage.setItem("productosEnCarro", productosCantidades);
      }
      if (e.target.classList.value == "boton-menos") {
        let id = e.target.id;
        let idNum = id.slice(5);
        let numSel = document.querySelector("#num" + idNum);
        if (parseInt(numSel.value) > 1) {
          let nuevoNum = parseInt(numSel.value) - 1;
          let subSel = document.querySelector("#sub" + idNum);
          let precioUni = document.querySelector("#precio" + idNum);
          let precioNum = precioUni.innerHTML.slice(1);
          subSel.innerHTML = "Subtotal $" + nuevoNum * precioNum;
          subSel.setAttribute("value", nuevoNum * precioNum);
          numSel.setAttribute("value", nuevoNum);
          let totalNum = 0;
          let subTodos = document.querySelectorAll(".sub-texto");
          console.log(subTodos);
          subTodos.forEach((element) => {
            totalNum = parseInt(element.attributes.value.nodeValue) + totalNum;
          });
          precioTotal.innerHTML = "TOTAL: $" + totalNum;
          productosUnicos.forEach((element) => {
            if (element.id == idNum) {
              element.cantidad = nuevoNum;
            }
          });

          let productosCantidades = JSON.stringify(productosUnicos);
          productosCantidades = productosCantidades.replace(/[[\]]/g, "");
          localStorage.setItem("productosEnCarro", productosCantidades);
        }
      }
    });
  } else {
    let contenedorAviso = document.createElement("div");
    let contenedorTexto = document.createElement("div");
    let h1 = this.document.createElement("h1");
    let h3 = this.document.createElement("h3");
    let imagenLogo = this.document.createElement("img");
    h1.innerHTML = "¡No hay productos en tu carrito!";
    h3.innerHTML = "Recuerda agregar los productos para poder comprar";

    let productosFiltro = productosUnicos.filter(
      (productosUnicos) => productosUnicos.id != id
    );

    productosFiltro = JSON.stringify(productosFiltro);
    console.log(productosFiltro);
    productosFiltro = productosFiltro.replace(/[[\]]/g, "");
    console.log(productosFiltro);

    localStorage.setItem("productosEnCarro", productosFiltro);
    // e.preventDefault();
  }
});
