"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile);
      // many to many
      User.hasMany(models.Cart);
      User.belongsToMany(models.Product, { through: models.Cart });
    }
  }
  User.init(
    {
      username: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "password gak boleh null"
          },
          notEmpty: {
            args: true,
            msg: "password gak boleh empty"
          }
        }
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "email gak boleh null"
          },
          notEmpty: {
            args: true,
            msg: "email gak boleh empty"
          }
        }
      },

      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "role gak boleh null"
          },
          notEmpty: {
            args: true,
            msg: "role gak boleh empty"
          }
        }
      }
    },
    {
      sequelize,
      modelName: "User",
    }
  );

      User.addHook('beforeCreate', (instance, options) => {
        
      if (instance.email === 'admin@map.com') { 
        instance.role = "Admin"
      }
      else {
        instance.role = "Customer"
      }
      
    })
  return User;
};
