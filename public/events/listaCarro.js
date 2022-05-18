// const e = require("express");

window.addEventListener("load", function () {
  localStorage.removeItem("listaCarro");

  const root = document.getElementById("root");
  const container = document.createElement("div");

  container.setAttribute("class", "contenedor");

  root.appendChild(container);

  let productosEnCarro = localStorage.getItem("productosEnCarro");
  let productos = JSON.parse("[" + productosEnCarro + "]");

  var productosUnicos = productos.filter(
    (value, index, self) => index === self.findIndex((t) => t.id === value.id)
  );

  let productosString = JSON.stringify(productosUnicos);
  productosString = productosString.replace(/[[\]]/g, "");
  localStorage.setItem("productosEnCarro", productosString);

  console.log(productos);
  console.log(productosUnicos);

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

        const formEliminar = document.createElement("form");
        const botonEliminar = document.createElement("button");

        const price = document.createElement("p");

        article.setAttribute("class", "detalles-producto");
        imgContainer.setAttribute("class", "imagen-producto");
        img.setAttribute("class", "imgVista");
        info.setAttribute("class", "informacion");
        name.setAttribute("class", "nombre-producto");
        desc.setAttribute("class", "descripcion-producto");
        cant.setAttribute("class", "cantidad-producto");
        cantText.setAttribute("class", "cantidad-texto");

        priceContainer.setAttribute("class", "precio-producto");

        // formEliminar.setAttribute("action", "eliminar");
        formEliminar.setAttribute("class", "form-eliminar");
        botonEliminar.setAttribute("type", "submit");
        botonEliminar.setAttribute("class", "eliminar");
        botonEliminar.setAttribute("id", id);
        botonEliminar.innerHTML = "Eliminar";

        name.innerHTML = nombre;
        price.innerHTML = "$" + precio;
        desc.innerHTML = descripcion;
        cant.setAttribute("value", productosUnicos[index].cantidad);
        cantText.innerHTML = "Cantidad: ";

        container.appendChild(article);
        article.appendChild(imgContainer);
        article.appendChild(info);
        article.appendChild(priceContainer);
        priceContainer.appendChild(price);
        priceContainer.appendChild(cantText);

        priceContainer.appendChild(cant);
        priceContainer.appendChild(formEliminar);

        info.appendChild(name);
        info.appendChild(desc);

        imgContainer.appendChild(img);
        img.setAttribute("src", "/img/productos/" + imagen);

        formEliminar.appendChild(botonEliminar);
      });
  });

  window.addEventListener("click", function (e) {
    if (e.target.classList.value == "eliminar") {
      let id = e.target.id;

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
});
