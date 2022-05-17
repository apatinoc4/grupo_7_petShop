window.addEventListener("load", function () {
  var logout = this.document.querySelector("#logout");
  logout.addEventListener("click", function (e) {
    localStorage = removeItem("productosEnCarro");
  });
});
