const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");
const proteccionRutasUsuarioMiddleware = require("../middlewares/proteccionRutasUsuarioMiddleware");
const proteccionRutasAdminMiddleware = require("../middlewares/proteccionRutasAdminMiddleware");
const multer = require("multer");
const path = require("path");
const validacionesRegistro = require("../middlewares/validacionesRegistroMiddleware");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/users");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({ storage: storage });
router.get("/userProfile", usuariosController.renderPerfilUsuarioLoggeado);
router.post(
  "/userProfile/crear",
  upload.single("foto"),
  validacionesRegistro,
  usuariosController.crearUsuario
);

// Desde directorio de usuarios

router.get(
  "/listaUsuarios",
  proteccionRutasUsuarioMiddleware,
  proteccionRutasAdminMiddleware,
  usuariosController.renderListaUsuarios
);

router.get("/userProfile/:id", usuariosController.renderPerfilDesdeDirectorio);

router.post(
  "/listaUsuarios/crear",
  upload.single("foto"),
  validacionesRegistro,
  usuariosController.crearUsuarioDesdeDirectorio
);
router.get(
  "/listaUsuarios/:id/editar/",
  usuariosController.renderEdicionUsuario
);
router.put(
  "/listaUsuarios/:id/editar/",
  upload.single("foto"),
  usuariosController.editarUsuario
);
router.delete(
  "/listaUsuarios/:id/eliminar/",
  usuariosController.eliminarUsuario
);

module.exports = router;
