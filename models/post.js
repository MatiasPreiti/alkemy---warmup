'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    static associate(models) {
      post.belongsTo(models.category, {
        foreignKey: 'categoryId',
        targetKey: 'id',
      });
    }
  }
  post.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      text: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      creationDate: {
        allowNull: false,
        defaultValue: sequelize.NOW,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'post',
    }
  );
  return post;
};
