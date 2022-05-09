window.addEventListener("load", function () {
  let formBuscador = document.querySelector(".buscador");

  formBuscador.addEventListener("submit", function (e, res) {
    // e.preventDefault();
    const query = e.target[0].value;
    formBuscador.action = "http://localhost:3001/search?" + query;
  });
});
