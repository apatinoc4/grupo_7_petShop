const fs = require("fs");

const Usuario = {
  nombreArchivo: "./src/data/usuariosDB.json",
  borrarUsuarioPorId: function (id) {
    const listaUsuarios = this.obtenerListaUsuarios();
    const listaSinUsuario = listaUsuarios.filter(
      (usuario) => usuario.id !== id
    );
    fs.writeFileSync(
      this.nombreArchivo,
      JSON.stringify(listaSinUsuario, null, " ")
    );

    return true;
  },

  crearusuario: function (nuevoUsuario) {
    const listaUsuarios = this.obtenerListaUsuarios();
    const usuarioACrear = {
      id: this.generarId(),
      ...nuevoUsuario,
    };
    listaUsuarios.push(nuevoUsuario);
    fs.writeFileSync(
      this.nombreArchivo,
      JSON.stringify(usuarioACrear, null, " ")
    );

    return true;
  },
  encontrarUsuarioPorCampo: function (campo, valor) {
    const listaUsuarios = this.obtenerListaUsuarios();

    return listaUsuarios.find((usuario) => valor == usuario[campo]);
  },
  encontrarUsuarioPorPK: function (pk) {
    const listaUsuarios = this.obtenerListaUsuarios();

    return listaUsuarios.find((usuario) => pk == usuario.id);
  },
  generarId: function () {
    const listaUsuarios = this.obtenerListaUsuarios();
    const ultimoUsuario = listaUsuarios.pop();

    if (ultimoUsuario) {
      return ultimoUsuario.id + 1;
    }

    return 1;
  },
  obtenerListaUsuarios: function () {
    return JSON.parse(fs.readFileSync(this.nombreArchivo, "utf-8"));
  },
};

module.exports = Usuario;
