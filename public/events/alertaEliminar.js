window.addEventListener("load", function () {
  let formEliminar = document.querySelectorAll(".form-eliminar");
  let botonEliminar = document.querySelectorAll(".eliminar");

  formEliminar.forEach((boton, index) => {
    boton.addEventListener("click", function (e) {
      e.preventDefault();

      const SwalBt = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      SwalBt.fire({
        title:
          "¿Esta seguro de eliminar " + e.target.id + "  de la base de datos?",
        text: "La información no podrá ser recuperada luego",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, ¡borrar!",
        cancelButtonText: "No, cancelar",
        reverseButtons: true,
        backdrop: `
        rgba(196, 54, 22,0.4)
      `,
      }).then((result) => {
        if (result.isConfirmed) {
          SwalBt.fire(
            "¡Eliminado!",
            "El archivo ha sido eliminado.",
            "success"
          );
          boton.submit();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          SwalBt.fire(
            "Cancelado",
            "Ningún producto ha sido borrado :)",
            "error"
          );
        }
      });
    });
  });
});
