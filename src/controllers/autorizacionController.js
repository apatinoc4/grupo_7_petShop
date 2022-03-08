const e = require("express");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const crypto = require ("crypto")
const bcrypt = require ("bcryptjs")


let usuariosFilePath = path.join(__dirname, "../data/usuariosDB.json");
let userLoginInfoFilePath = path.join(__dirname, "../data/usuarioLogin.json");

let listaUsuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
let usersLoginInfo = JSON.parse(fs.readFileSync(userLoginInfoFilePath, 'utf-8'));

const autorizacionController = {
  renderLogin: function (req, res) {
    // if(req.cookies.rememberToken){
    //   var userToken = usersLoginInfo.find(elem=>elem.token==req.cookies.rememberToken)
    //   user= userToken

    //   return res.render("login",{user});
    // }
    return res.render("login");
    
  },
  renderRegistro: function (req, res) {
    res.render("register");
  },
  renderCarrito: function (req, res) {
    res.render("productCart");
  },
  crearUsuario: function (req, res) {

    let idCreacion = 
    Number( 
      listaUsuarios[listaUsuarios.length-1].id) + 1

    let errors = validationResult(req)
    if (errors.isEmpty()){
      var { nombre, usuario,
        email, fecha, pais,ciudad,
        direccion, autorizacion,
        contrasena,confirmarContrasena } = req.body;
        
      let foto ="default.jpg"
      let tipo ="usuario"

      if (req.file != undefined){
        foto= req.file.filename
      }
      if (autorizacion == undefined){
      autorizacion= "off"
      }

      const usuarioCreado = {
        id: idCreacion ,
        nombre: nombre,
        usuario: usuario,
        email: email,
        fecha: fecha,
        pais: pais,
        ciudad: ciudad,
        direccion: direccion,
        autorizacion: autorizacion,
        foto: foto,
        tipo: tipo,
        contrasena: contrasena,
        confirmarContrasena:confirmarContrasena
      };

      if(contrasena===confirmarContrasena){
        delete usuarioCreado.confirmarContrasena
        usuarioCreado.contrasena = bcrypt.hashSync(contrasena, 10);

        listaUsuarios.push(usuarioCreado);
        

        fs.writeFile(usuariosFilePath, JSON.stringify(listaUsuarios,null," "), (err) => {
          if (err) {
            console.log("Fallo en la creación del usuario");
          } else {
            console.log("Usuario creado exitosamente" + usuarioCreado);
          }
        });

         return res.redirect("/")
      }else{
        return res.render( "register", {
        old: req.body,
        errors:{create:"Las Contraseñas no coinciden"}})
      }
    } else{
      return res.render( "register", {
      old: req.body,
      errors:errors.errors})
    }
  },
  editarUsuario: function (req, res) {
    const idUsuario = req.params.id;
    let usuarioOld = listaUsuarios.find(elem=>elem.id==idUsuario);
    
    var { id, nombre, usuario, 
      email, fecha, pais,
      ciudad,direccion,autorizacion } = req.body;

    let foto = ""
    if (req.file != undefined){
      foto = req.file.filename
      console.log(foto)
    } else{
      foto=usuarioOld.foto
    }
    if (autorizacion == undefined){
      autorizacion= "off"
    }

    const usuarioEditado = {
      id: id,
      nombre: nombre,
      usuario: usuario,
      email: email,
      fecha: fecha,
      pais: pais,
      ciudad: ciudad,
      autorizacion: autorizacion,
      direccion: direccion,
      foto: foto
    };
    const usuarioADetalle= usuarioEditado;

    listaUsuarios.forEach((elem, idx) => {
      if (elem.id == idUsuario) {
        listaUsuarios[idx] = usuarioEditado;
      }
    });
    fs.writeFile(usuariosFilePath, JSON.stringify(listaUsuarios, null, " "), (err) => {
    });
    res.redirect( "/userProfile/" + usuarioADetalle.id);
  },
  eliminarUsuario: function (req, res) {
    const idUsuario = req.params.id;
    const listaFiltrada = listaUsuarios.filter(
      (elem) => elem.id != idUsuario
    );
    fs.writeFile(usuariosFilePath, JSON.stringify(listaFiltrada, null, " "), (err) => {
      if (err) {
        console.log("Fallo en la eliminación del usuario");
      } else {
        console.log("Usuario eliminado exitosamente");
      }
    });
    res.redirect("/userProfile");
  },
  renderFormularioEdicion: function (req, res) {
    const idUsuario = req.params.id ;
    const usuarioADetalle = listaUsuarios.find(elem=>elem.id==idUsuario);

    res.render("editarUsuario", {
      usuarioADetalle,
    });
  },
  renderUsuario: function (req, res) {
    const idUsuario = req.params.id;
    let usuarioADetalle = listaUsuarios.find(elem=>elem.id==idUsuario);
   
    res.render("userProfile", {
      usuarioADetalle,
    });
  },
  storeLogin:function(req,res){
    var errors = validationResult(req)

    if (errors.isEmpty()){
      console.log("No hay errores de Login")

      var email = req.body.email
      var contrasena= req.body.contrasena
      console.log("session " + email +" "+ contrasena )

      var user = listaUsuarios.find(elem=>elem.email==email)

      if(user){
        console.log("El usuario esta en la DB")

        //Se compara contraseña encriptada
        var check = bcrypt.compareSync(contrasena, user.contrasena);
        delete user.contrasena

        if(check){
          console.log("Usuario con contraseña Valida")

          //Se guarda user en session
          req.session.user = user

          //Checkbox De recordar 
          if (req.body.remember){
            const token = crypto.randomBytes(64).toString('base64');
            user.token=token
            let userLoginInfo = [...usersLoginInfo, user]

            fs.writeFileSync(userLoginInfoFilePath, JSON.stringify(userLoginInfo, null, ' '));

            // Recordamos al usuario por 3 meses         msegs  segs  mins  hs   días
            res.cookie('rememberToken', token, { maxAge: 1000 * 60  * 60 *  24 * 90 });
          }
          return res.redirect("/")

        }else{
          console.log("Usuario con contraseña invalida")
          return res.render('login', { 
            old: req.body,
            errors:{login: "Contraseña invalida"
          }})
        }
      }else{
        console.log("El usuario no esta en la DB")
       
        return res.render('login',{ 
            old: req.body,
            errors:{login: "El usuario no existe en la Base de datos"
        }})
      }
    }else{
      console.log("Hay errores de Login")
      return res.render("login",{
        old: req.body,
        errors:errors.errors})
    }
  }
};


module.exports = autorizacionController;
