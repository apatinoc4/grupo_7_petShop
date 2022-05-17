window.addEventListener("load", function () {
  let nombreUsuario = document.querySelector("#nombreUsuario");
  let botonComprar = document.querySelectorAll(".formCompra");
  botonComprar.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      if (nombreUsuario != null) {
        e.preventDefault();

        const SwalBt = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-secondary",
          },
          buttonsStyling: false,
        });
        SwalBt.fire({
          title: "¡El producto ha sido agregado!",
          icon: "success",

          text: "Deseas ir a finalizar la compra",
          showCancelButton: true,
          confirmButtonText: "Vamos al Carrito",
          cancelButtonText: "Deseo seguir Agregando",
          reverseButtons: true,
          backdrop: `
        rgba(94, 86, 84,0.4)
      `,
        }).then((result) => {
          if (result.isConfirmed) {
            button.submit();
          }
        });
      } else {
        e.preventDefault();
        location.href = "/login";
      }
    });
  });
});
