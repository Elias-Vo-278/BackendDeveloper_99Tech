const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');
class Resources extends Model {}

Resources.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize, 
    modelName: 'Resources', 
    tableName: 'resources', 
    timestamps: true,
    paranoid: true
  }
);

module.exports = Resources;

