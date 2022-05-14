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
  //   console.log(productos);
  //   console.log(productosUnicos);

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
        const priceContainer = document.createElement("div");

        const price = document.createElement("p");

        article.setAttribute("class", "detalles-producto");
        imgContainer.setAttribute("class", "imagen-producto");
        img.setAttribute("class", "imgVista");
        info.setAttribute("class", "informacion");
        name.setAttribute("class", "nombre-producto");
        desc.setAttribute("class", "descripcion-producto");
        cant.setAttribute("class", "cantidad-producto");
        priceContainer.setAttribute("class", "precio-producto");

        name.innerHTML = nombre;
        price.innerHTML = precio;
        desc.innerHTML = descripcion;
        cant.setAttribute("value", productosUnicos[index].cantidad);

        container.appendChild(article);
        article.appendChild(imgContainer);
        article.appendChild(info);
        article.appendChild(priceContainer);
        priceContainer.appendChild(price);

        info.appendChild(name);
        info.appendChild(desc);
        info.appendChild(cant);

        imgContainer.appendChild(img);
        img.setAttribute("src", "/img/productos/" + imagen);
      });
  });
});

// image1.setAttribute("src", "/images/products/" + image)
