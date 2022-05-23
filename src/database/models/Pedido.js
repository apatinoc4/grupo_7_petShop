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
      type: dataTypes.INTEGER(11),
    },
    cantidad: {
      type: dataTypes.INTEGER(11),
    },
    estado: {
      type: dataTypes.INTEGER(11),
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
    Pedido.belongsToMany(models.Usuario, {
      as: "usuario",
      through: "usuario_pedido",
      foreignKey: "pedido_id",
      otherKey: "usuario_id",
      timestamps: false,
    });
    Pedido.belongsToMany(models.Producto, {
      as: "producto",
      through: "pedido_producto",
      foreignKey: "pedido_id",
      otherKey: "producto_id",
      timestamps: false,
    });
  };
  return Pedido;
};
