module.exports = (sequelize, dataTypes) => {
  let alias = "Producto";
  let cols = {
    id: {
      type: dataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      type: dataTypes.STRING,
    },
    imagen: {
      type: dataTypes.STRING,
    },
    descripcion: {
      type: dataTypes.STRING,
    },
    precio: {
      type: dataTypes.INTEGER,
    },
    tipo_id: {
      type: dataTypes.INTEGER,
    },
  };

  const config = {
    tableName: "productos",
    underscored: true,
    timestamps: false,
    paranoid: false,
  };

  const Producto = sequelize.define(alias, cols, config);

  Producto.associate = (models) => {
    Producto.belongsTo(models.Tipo, {
      as: "tipo",
      foreignKey: "tipo_id",
    });
    Producto.belongsToMany(models.Pedido, {
      as: "pedido",
      through: "pedido_producto",
      foreignKey: "producto_id",
      otherKey: "pedido_id",
      timestamps: false,
    });
  };
  return Producto;
};
