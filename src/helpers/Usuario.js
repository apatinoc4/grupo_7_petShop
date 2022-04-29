const fs = require("fs");
const db = require("../database/models");

const Usuario = {
  nombreArchivo: "./src/data/usuariosDB.json",
  obtenerListaUsuarios: function () {
    return JSON.parse(fs.readFileSync(this.nombreArchivo, "utf-8"));
  },
  obtenerListaUsuarios2: function () {
    return db.Usuario.findAll();
  },

  generarId: function () {
    const listaUsuarios = this.obtenerListaUsuarios();
    const ultimoUsuario = listaUsuarios.pop();

    if (ultimoUsuario) {
      return ultimoUsuario.id + 1;
    }
    return 1;
  },

  generarId2: async function () {
    const ultimoUsuario = await db.Usuario.findAll({
      attributes: ["id"],
      order: [["id", "DESC"]],
      raw: true,
    });

    if (ultimoUsuario) {
      return ultimoUsuario[0].id + 1;
    }

    return 1;
  },
  borrarUsuarioPorId: function (id) {
    const listaUsuarios = this.obtenerListaUsuarios();
    const listaSinUsuario = listaUsuarios.filter(
      (usuario) => usuario.id !== id
    );

    fs.writeFileSync(
      this.nombreArchivo,
      JSON.stringify(listaSinUsuario, null, "s ")
    );

    return true;
  },
  borrarUsuarioPorId2: function (idUsuario) {
    return db.Usuario.destroy({ where: { id: idUsuario }, force: false });
  },
  crearUsuario: function (nuevoUsuario) {
    const listaUsuarios = this.obtenerListaUsuarios();
    const usuarioACrear = {
      id: this.generarId(),
      ...nuevoUsuario,
    };

    listaUsuarios.push(usuarioACrear);
    fs.writeFileSync(
      this.nombreArchivo,
      JSON.stringify(listaUsuarios, null, " "),
      (err) => {
        if (err) {
          console.log("Fallo en la creación del usuario");
        } else {
          console.log("Usuario creado exitosamente");
        }
      }
    );

    return usuarioACrear;
  },

  crearUsuario2: async function (nuevoUsuario) {
    const idUsuarioACrear = await this.generarId2();

    const usuarioACrear = {
      id: idUsuarioACrear,
      ...nuevoUsuario,
    };

    return db.Usuario.create(usuarioACrear);
  },
  encontrarUsuarioPorCampo: function (campo, valor) {
    const listaUsuarios = this.obtenerListaUsuarios();

    return listaUsuarios.find((usuario) => valor == usuario[campo]);
  },

  encontrarUsuarioPorCampo2: function (campo, valor) {
    return db.Usuario.findOne({
      where: {
        [campo]: valor,
      },
    });
  },

  encontrarUsuarioPorPK: function (pk) {
    const listaUsuarios = this.obtenerListaUsuarios();

    return listaUsuarios.find((usuario) => pk == usuario.id);
  },

  encontrarUsuarioPorPK2: function (pk) {
    const usuarioEncontrado = db.Usuario.findByPk(pk);

    return usuarioEncontrado;
  },
  editarUsuario: function (email, datosNuevos) {
    const listaUsuarios = this.obtenerListaUsuarios();
    const datosPreviosUsuario = this.encontrarUsuarioPorCampo("email", email);
    const listaSinUsuario = listaUsuarios.filter(
      (usuario) => usuario.email !== email
    );
    const usuarioEditado = {
      ...datosPreviosUsuario,
      ...datosNuevos,
      admin: datosNuevos.admin === "true" ? true : false,
      autoriza: datosNuevos.autoriza === "true" ? true : false,
      fecha:
        datosNuevos.fecha === ""
          ? datosPreviosUsuario.fecha
          : datosNuevos.fecha,
    };

    listaSinUsuario.push(usuarioEditado);

    fs.writeFileSync(
      this.nombreArchivo,
      JSON.stringify(listaSinUsuario, null, " ")
    );
    return true;
  },
  editarUsuario2: async function (email, datosNuevos) {
    const datosPreviosUsuario = await this.encontrarUsuarioPorCampo2(
      "email",
      email
    );
    const usuarioEditado = {
      ...datosPreviosUsuario,
      ...datosNuevos,
      admin: datosNuevos.admin === "true" ? true : false,
      autoriza: datosNuevos.autoriza === "true" ? true : false,
      fecha:
        datosNuevos.fecha === ""
          ? datosPreviosUsuario.fecha
          : datosNuevos.fecha,
    };

    return db.Usuario.update(usuarioEditado, {
      where: { id: usuarioEditado.id },
    });
  },
};

module.exports = Usuario;
