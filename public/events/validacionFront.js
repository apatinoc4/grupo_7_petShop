window.onload = function () {
  let form = document.querySelector("#formulario");
  //   form.title.focus();

  form.addEventListener("submit", (e) => {
    console.log("Entra submit");
    let errors = [];

    let nombre = document.querySelector("#nombre");
    let email = document.querySelector("#email");
    let direccion = document.querySelector("#direccion");
    let contrasena = document.querySelector("#contrasena");

    if (nombre.value == "") {
      errors.push("El campo nombre no puede estar vacío");
    } else {
      form.nombre.focus();
    }
    if (email.value == "") {
      errors.push("El campo email no puede estar vacío");
    } else {
      form.email.focus();
    }
    if (direccion.value == "") {
      errors.push("El campo direccion no puede estar vacío");
    } else {
      form.direccion.focus();
    }
    if (contrasena.value == "") {
      errors.push("El campo contraseña no puede estar vacío");
    } else {
      form.contrasena.focus();
    }

    // Se detiene el submit para mostrar errores
    if (errors.length > 0) {
      e.preventDefault();

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Encontramos algunos errores",
      });

      let sw = document.querySelector(".swal2-html-container");
      sw.classList.add("alert-warning");
      sw.innerHTML += "";
      for (let i = 0; i < errors.length; i++) {
        sw.innerHTML += `<li >  ${errors[i]} </li>`;
      }
    } else {
      form.submit();
    }
  });
};
