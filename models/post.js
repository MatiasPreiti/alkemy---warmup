'use strict';
const { Model } = require('sequelize');
const category = require('./category');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    static associate(models) {
      post.belongsTo(models.category, {
        foreignKey: 'fk_category',
        targetKey: 'title',
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
