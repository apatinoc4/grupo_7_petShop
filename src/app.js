console.clear();

const express = require("express");
const app = express();
const methodOverride = require("method-override");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
// const bootstrap = require("bootstrap");
// const Swal = require("sweetalert2");
var bodyParser = require("body-parser");

const usuarioLoggeadoMiddleware = require("./middlewares/usuarioLoggeadoMiddleware");
const rutasAutorizacion = require("./routes/autorizacion");
const rutasProductos = require("./routes/productos");
const rutasUsuarios = require("./routes/usuarios");
const rutasCarrito = require("./routes/carrito");
const rutasApi = require("./routes/apiRoutes");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "Mensaje secreto",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieParser());

app.use(usuarioLoggeadoMiddleware);

app.use(express.static(path.resolve(__dirname, "../public")));

app.set("view engine", "ejs");

app.set("views", path.resolve(__dirname, "./views"));

app.use((req, res, next) => {
  console.log(req.body);
});
app.use("/", rutasAutorizacion);
app.use("/", rutasProductos);
app.use("/", rutasUsuarios);
app.use("/", rutasCarrito);
app.use("/api", rutasApi);

app.use((req, res, next) => {
  res.status(404).render("notFound");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor corriendo en el puerto 3000 🔥🔥");
});
