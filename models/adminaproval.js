'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminAproval extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdminAproval.init({
    UserId:DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AdminAproval',
  });
  return AdminAproval;
};