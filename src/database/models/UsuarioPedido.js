module.exports = (sequelize, dataTypes) => {
  let alias = "UsuarioPedido";
  let cols = {
    id: {
      type: dataTypes.INTEGER(20),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    usuario_id: {
      type: dataTypes.INTERGER,
    },
    pedido_id: {
      type: dataTypes.INTERGER,
    },
  };

  const config = {
    tableName: "usuario_pedido",
    underscored: true,
    timestamps: false,
    paranoid: false,
  };

  const UsuarioPedido = sequelize.define(alias, cols, config);

  UsuarioPedido.associate = (models) => {
    UsuarioPedido.belongsTo(models.Pedido, {
      as: "pedido",
      foreignKey: "pedido_id",
    });
  };
  return UsuarioPedido;
};
