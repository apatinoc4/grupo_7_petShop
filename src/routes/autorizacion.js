const express = require("express");
const router = express.Router();
const autorizacionController = require("../controllers/autorizacionController");
const multer = require('multer')
const path = require ("path")
const {check}= require("express-validator")

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'public/img/users')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})


router.get("/login", autorizacionController.renderLogin);
router.get("/register", autorizacionController.renderRegistro);
router.get("/productCart", autorizacionController.renderCarrito);

router.get("/userProfile/:id", 
    autorizacionController.renderUsuario);
router.post("/userProfile/crear",
    upload.single('foto'),
        check("nombre").notEmpty().withMessage("Debes ingresar un nombre"),
        check("usuario").notEmpty().withMessage("Debes ingresar un usuario"),
        check("email").notEmpty().withMessage("Debes ingresar un email")
                    .isEmail().withMessage("Debesingresar un email valido"),
        check("fecha").notEmpty().withMessage("Debes ingresar tu fecha de nacimiento"),
        check("pais").notEmpty().withMessage("Debes ingresar un pais"),
        check("ciudad").notEmpty().withMessage("Debes ingresar una ciudad"),
        check("direccion").notEmpty().withMessage("Debes ingresar una direccion"),
        check("contrasena").notEmpty().withMessage("Debes ingresar una contraseña"),
    autorizacionController.crearUsuario);
router.get(
  "/userProfile/:id/editar/",
    autorizacionController.renderFormularioEdicion
);
router.put("/userProfile/:id/editar/",
    upload.single('foto'), 
    autorizacionController.editarUsuario);
router.delete(
    "/userProfile/:id/eliminar/",
    autorizacionController.eliminarUsuario
);


module.exports = router;
