const express = require("express");
const app = express();
const methodOverride = require("method-override");
const path = require("path");
const session = require("express-session")
var cookieParser = require('cookie-parser');

const rutasAutorizacion = require("./routes/autorizacion");
const rutasProductos = require("./routes/productos");
const rutasUsuarios = require("./routes/usuarios");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  secret: "Mensaje secreto",
  resave: false,
  saveUninitialized: true,
}));
app.use(cookieParser());


app.use(express.static(path.resolve(__dirname, "../public")));

app.set("view engine", "ejs");

app.set("views", path.resolve(__dirname, "./views"));

app.use("/", rutasAutorizacion);

app.use("/", rutasProductos);

app.use("/", rutasUsuarios);

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor corriendo en el puerto 3000 🔥🔥");
});
