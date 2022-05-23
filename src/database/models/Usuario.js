module.exports = (sequelize, dataTypes) => {
  let alias = "Usuario";
  let cols = {
    id: {
      type: dataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    pais: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    ciudad: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    contrasena: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: dataTypes.TINYINT,
      allowNull: false,
    },

    autoriza: {
      type: dataTypes.TINYINT,
      allowNull: false,
    },
    foto: {
      type: dataTypes.STRING,
    },
  };

  const config = {
    tableName: "usuarios",
    underscored: true,
    timestamps: false,
    paranoid: false,
  };

  const Usuario = sequelize.define(alias, cols, config);

  Usuario.associate = function (models) {
    Usuario.belongsToMany(models.Pedido, {
      as: "pedido",
      through: "usuario_pedido",
      foreignKey: "usuario_id",
      otherKey: "pedido_id",
      timestamps: false,
    });
  };

  return Usuario;
};
