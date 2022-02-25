const e = require("express");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");



const usuariosFilePath = path.join(__dirname, "../data/usuariosDB.json");
let listaUsuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));

const autorizacionController = {
  renderLogin: function (req, res) {
    res.render("login");
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
      const { nombre, usuario,
        email, fecha, pais,ciudad,
        direccion, autorizacion,
        contrasena } = req.body;
        
      let foto ="default.jpg"
      let tipo ="usuario"

      if (req.file != undefined){
        foto= req.file.filename
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
      };
      console.log( 
        "Usuario creado"+ usuarioCreado)

      listaUsuarios.push(usuarioCreado);
      
      const usuarioADetalle = usuarioCreado

      fs.writeFile(usuariosFilePath, JSON.stringify(listaUsuarios,null," "), (err) => {
        if (err) {
          console.log("Fallo en la creación del usuario");
        } else {
          console.log("Usuario creado exitosamente");
        }
      });
      res.redirect( "/userProfile/" + usuarioADetalle.id, 
      );
    } else{
      res.render( "register", {errors:errors.errors})
    }
  },
  editarUsuario: function (req, res) {
    const idUsuario = req.params.id;
    const { id, nombre, usuario, 
      email, fecha, pais,ciudad,direccion,foto } = req.body;

    const usuarioEditado = {
      id: id,
      nombre: nombre,
      usuario: usuario,
      email: email,
      fecha: fecha,
      pais: pais,
      ciudad: ciudad,
      direccion: direccion,
      foto: foto
    };

    listaUsuarios.forEach((elem, idx) => {
      if (elem.id == idUsuario) {
        listaUsuarios[idx] = usuarioEditado;
      }
    });
    fs.writeFile(usuariosFilePath, JSON.stringify(listaUsuarios), (err) => {
    });
    res.redirect("userProfile");
  },
  eliminarUsuario: function (req, res) {
    const idUsuario = req.params.id;
    const listaFiltrada = listaUsuarios.filter(
      (elem) => elem.id != idUsuario
    );
    fs.writeFile(usuariosFilePath, JSON.stringify(listaFiltrada), (err) => {
      if (err) {
        console.log("Fallo en la eliminación del usuario");
      } else {
        console.log("Usuario eliminado exitosamente");
      }
    });
    res.redirect("/userProfile");
  },
  renderFormularioEdicion: function (req, res) {
    const idUsuario = req.params.id;
    const usuarioAEditar = listaUsuarios[idUsuario];

    res.render("editarUsuario", {
      usuarioAEditar,
      archivosImagen,
    });
  },
  renderUsuario: function (req, res) {
    const idUsuario = req.params.id;
    let usuario = listaUsuarios.find(elem=>elem.id==idUsuario);
   
    res.render("userProfile", {
      usuarioADetalle: usuario,
    });
    console.log(usuario)
  },
};


module.exports = autorizacionController;
