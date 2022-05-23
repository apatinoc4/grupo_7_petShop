window.addEventListener("load", function () {
  var logout = this.document.querySelector("#logout");
  if (logout != null) {
    logout.addEventListener("click", function (e) {
      localStorage = removeItem("productosEnCarro");
    });
  }
});
