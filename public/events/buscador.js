window.addEventListener("load", function () {
  const botonBuscar = document.querySelector(".test2");
  const barrabuscar = document.querySelector(".test");

  botonBuscar.addEventListener("click", function (e, res) {
    const query = barrabuscar.value;

    window.location.href = `http://localhost:3001?query=${query}`;
  });
});
