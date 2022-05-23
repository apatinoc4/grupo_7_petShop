module.exports = (sequelize, dataTypes) => {
  let alias = "Pedido";
  let cols = {
    pedido_id: {
      type: dataTypes.INTEGER(20),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    producto_id: {
      type: dataTypes.INTERGER,
    },
    cantidad: {
      type: dataTypes.INTERGER,
    },
    estado: {
      type: dataTypes.INTERGER,
    },
  };

  const config = {
    tableName: "pedido",
    underscored: true,
    timestamps: false,
    paranoid: false,
  };

  const Pedido = sequelize.define(alias, cols, config);

  Pedido.associate = (models) => {
    Pedido.belongsTo(models.Pedido, {
      as: "pedido",
      foreignKey: "pedido_id",
    });
  };
  return UsuarioPedido;
};
