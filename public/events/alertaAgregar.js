window.addEventListener("load", function () {
  let botonComprar = document.querySelectorAll(".formCompra");
  botonComprar.forEach((button, index) => {
    button.addEventListener("click", function (e) {
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
    });
  });
});
