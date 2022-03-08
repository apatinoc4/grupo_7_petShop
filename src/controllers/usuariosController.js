const e = require("express");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");


const usuariosFilePath = path.join(__dirname, "../data/usuariosDB.json");
let listaUsuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));

const archivosImagen = listaUsuarios.map((i) => i.foto);
const arrayIds = listaUsuarios.map((i) => i.id);

const usuariosController = {
  
  crearUsuario: function (req, res) {

    let errors = validationResult(req)
    let idCreacion = 
      Number( 
        listaUsuarios[listaUsuarios.length-1].id) + 1


    if (errors.isEmpty()){
      const { nombre, usuario, 
        email, fecha, pais,ciudad,
        direccion, autorizacion,
        tipo,contrasena 
      } = req.body;
        
      
  
      let foto ="default.jpg"
  
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
      console.log(usuarioCreado)

      listaUsuarios.push(usuarioCreado);
  
      fs.writeFile(usuariosFilePath, JSON.stringify(listaUsuarios,null," "), (err) => {
        if (err) {
          console.log("Fallo en la creación del usuario");
        } else {
          console.log("Usuario creado exitosamente");
        }
      });
  
      res.redirect("/listaUsuarios"
      );
    } else{
      res.render("listaUsuarios",{errors:errors.errors,idCreacion,listaUsuarios})
    }
    
  },

  editarUsuario: function (req, res) {
    let idUsuario = req.params.id;
    let usuarioOld = listaUsuarios.find(elem=>elem.id==idUsuario);


    let { id, nombre, usuario,
      email, fecha, pais,ciudad,direccion } = req.body;

    let foto = ""
    if (req.file != undefined){
      foto = req.file.filename
      console.log(foto)
    } else{
      foto=usuarioOld.foto
    }

    const usuarioEditado = {
      id: idUsuario,
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

    const usuarioADetalle = usuarioEditado

    listaUsuarios.forEach((elem, idx) => {
      if (elem.id == idUsuario) {
        listaUsuarios[idx] = usuarioADetalle;
      }
    });
    fs.writeFile(usuariosFilePath, JSON.stringify(listaUsuarios, null, " "), (err) => {
      if (err) {
        console.log("Fallo en la edición del usuario");
      } else {
        console.log("Usuario editado exitosamente");
      }
    });
    res.redirect("/listaUsuarios");
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
    res.redirect("/listaUsuarios");
  },
  renderEdicionUsuario: function (req, res) {
    let idUsuario = req.params.id;
    let usuarioAEditar = listaUsuarios.find(elem=>elem.id==idUsuario);
    let usuarioADetalle = usuarioAEditar

    res.render("editarUsuario", {
      usuarioAEditar,
      archivosImagen,
      usuarioADetalle
    });
  },
  // renderUsuario: function (req, res) {
  //   const idUsuario = req.params.id;
  //   const usuario = listaUsuarios[idUsuario];

  //   res.render("userProfile", {
  //     usuarioADetalle: usuario,
  //   });
  // },
  renderListaUsuarios: function (req, res) {
    let idCreacion = 
      Number( 
        listaUsuarios[listaUsuarios.length-1].id) + 1

    res.render("listaUsuarios", {
      listaUsuarios,
      archivosImagen,
      idCreacion,
    });
  },
};

module.exports = usuariosController;
