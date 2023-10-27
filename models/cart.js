"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.Product);
      Cart.belongsTo(models.User);
    }

    async totalPrice() {
      const productData = sequelize.models.Product
      const product = await productData.findByPk(this.ProductId)
      return product.price * this.quantity
    }

  }
  Cart.init(
    {
      ProductId: DataTypes.INTEGER, // fk - product
      UserId: DataTypes.INTEGER,
      quantity : DataTypes.INTEGER // fk - product
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
