"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category);

      // many to many
      Product.hasMany(models.Cart);
      Product.belongsToMany(models.User, { through: models.Cart });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "name gak boleh null"
          },
          notEmpty: {
            args: true,
            msg: "name gak boleh empty"
          }
        }
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "description gak boleh null"
          },
          notEmpty: {
            args: true,
            msg: "description gak boleh empty"
          }
        }
      },

      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "price gak boleh null"
          },
          notEmpty: {
            args: true,
            msg: "price gak boleh empty"
          }
        }
      },

      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "imageUrl gak boleh null"
          },
          notEmpty: {
            args: true,
            msg: "imageUrl gak boleh empty"
          }
        }
      },
      
      // fk category
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "username gak boleh null"
          },
          notEmpty: {
            args: true,
            msg: "username gak boleh empty"
          }
        }
      }
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
