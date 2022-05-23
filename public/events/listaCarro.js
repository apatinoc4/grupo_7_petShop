// const e = require("express");

window.addEventListener("load", function () {
  localStorage.removeItem("listaCarro");
  // const body = document.querySelector("body");
  const root = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "contenedor");
  root.appendChild(container);

  let productosEnCarro = localStorage.getItem("productosEnCarro");

  //Se verifica si hay contenido en carro
  if (
    productosEnCarro != undefined &&
    productosEnCarro != null &&
    productosEnCarro != ""
  ) {
    //Se cargan los productos existentes en carro y se filtran duplicados
    let productos = JSON.parse("[" + productosEnCarro + "]");
    var productosUnicos = productos.filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );

    let productosString = JSON.stringify(productosUnicos);
    productosString = productosString.replace(/[[\]]/g, "");
    localStorage.setItem("productosEnCarro", productosString);

    //elementos para suma total de carro
    let sumaTotal = 0;
    let totalContenedor = document.createElement("article");
    let precioTotal = document.createElement("p");
    let botonesComprar = document.createElement("div");
    let botonSeguir = document.createElement("button");
    let botonFinalizar = document.createElement("button");
    let formCompra = document.createElement("form");

    //por cada elemento en carro se realiza el elemento en html
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
    formCompra.setAttribute("class", "formCompra");
    formCompra.setAttribute("method", "POST");
    formCompra.setAttribute("action", "/productCart/crearPedido");
    precioTotal.setAttribute("class", "precio-total");
    botonesComprar.setAttribute("class", "botones-compra");
    botonSeguir.setAttribute("onclick", "window.location.href='/'");
    botonFinalizar.setAttribute("class", "precio-total");
    botonFinalizar.setAttribute("type", "submit");

    botonSeguir.innerHTML = "Seguir Comprando";
    botonFinalizar.innerHTML = "Finalizar compra";

    root.appendChild(formCompra);
    formCompra.appendChild(totalContenedor);
    totalContenedor.appendChild(precioTotal);
    totalContenedor.appendChild(botonesComprar);
    botonesComprar.appendChild(botonSeguir);
    botonesComprar.appendChild(botonFinalizar);

    window.addEventListener("click", function (e) {
      /// Cada que se haga click en eliminar un producto
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

      /// Cada que se haga click en sumar un producto con total
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

      /// Cada que se haga click en restar un producto con total
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

      /// Cada que se haga submit en el formulario
      botonFinalizar.addEventListener("click", function (e) {
        // e.preventDefault();
        // let input = document.createElement("input");
        // input.setAttribute("name", "local");
        // input.setAttribute("class", "inputInvisible");
        // input.setAttribute("value", localStorage.getItem("productosEnCarro"));
        // formCompra.appendChild(input);
        // console.log(input.value);
        const onSubmitProduct = async () => {
          console.log(localStorage.getItem("productosEnCarro"));
          let requestBody = localStorage.getItem("productosEnCarro").split(",");
          console.log(requestBody);
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
          };
          const response = await fetch(
            `/producCart/crearPedido`,
            requestOptions
          );
        };
        onSubmitProduct();
      });
    });
  } else {
    //Vista que se carga si no hay elementos en carro
    let contenedorAviso = document.createElement("div");
    let contenedorTexto = document.createElement("div");
    let h1 = this.document.createElement("h1");
    let h3 = this.document.createElement("h3");
    let imagenLogo = this.document.createElement("img");
    h1.innerHTML = "¡No hay productos en tu carrito!";
    h3.innerHTML = "Recuerda agregar los productos para poder comprar";

    contenedorAviso.setAttribute("class", "contenedorAviso");

    imagenLogo.setAttribute("src", "/img/assets/logoPetShopNar.png");

    container.append(contenedorAviso);
    contenedorAviso.appendChild(contenedorTexto);
    contenedorTexto.appendChild(h1);
    contenedorTexto.appendChild(h3);
    contenedorAviso.appendChild(imagenLogo);
  }
});

// def buy_product(db: Session, producto: object, usuario: UserSchema):
//     lista_productos_id_ob = db.query(HistorialPedidos).filter(
//         HistorialPedidos.id_user_comprador == usuario.id).first()
//     print(lista_productos_id_ob._dict_)

//     db_factura = Factura(
//         historial_factura_id=lista_productos_id_ob.id,
//         fecha_compra=datetime.now()
//     )
//     db.add(db_factura)
//     db.commit()
//     lista_factura_actual = db.query(Factura).filter(
//         Factura.historial_factura_id == lista_productos_id_ob.id).first()
//     print(lista_factura_actual._dict_)

//     db_factura_has_producto = FacturaTieneProducto(
//         factura_id=lista_factura_actual.id,
//         producto_id=producto.id
//     )

//     db.add(db_factura_has_producto)
//     db.commit()
//     db.refresh(db_factura_has_producto)

//     return db_factura_has_producto
