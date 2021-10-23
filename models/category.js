'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    static associate(models) {
      category.hasMany(models.post, {
        foreignKey: 'categoryId',
        as: 'post',
      });
    }
  }
  category.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'category',
    }
  );
  return category;
};
