const db = require("../database/models");
const { Sequelize } = require("sequelize");

const Usuario = {
  obtenerListaUsuarios: function () {
    return db.Usuario.findAll();
  },
  generarId: async function () {
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
  borrarUsuarioPorId: function (idUsuario) {
    return db.Usuario.destroy({ where: { id: idUsuario }, force: false });
  },
  crearUsuario: async function (nuevoUsuario) {
    const idUsuarioACrear = await this.generarId();

    const usuarioACrear = {
      id: idUsuarioACrear,
      ...nuevoUsuario,
    };

    return db.Usuario.create(usuarioACrear);
  },
  encontrarUsuariosPorEmail: function (usuarioBuscado) {
    const Op = Sequelize.Op;

    return db.Usuario.findAll({
      where: {
        email: {
          [Op.like]: `%${usuarioBuscado}%`,
        },
      },
    });
  },
  encontrarUsuarioPorCampo: function (campo, valor) {
    return db.Usuario.findOne({
      where: {
        [campo]: valor,
      },
    });
  },
  encontrarUsuarioPorPK: function (pk) {
    const usuarioEncontrado = db.Usuario.findByPk(pk);

    return usuarioEncontrado;
  },
  editarUsuario: async function (email, datosNuevos) {
    const datosPreviosUsuario = await this.encontrarUsuarioPorCampo(
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
