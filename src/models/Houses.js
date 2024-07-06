const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
require('dotenv').config();

const { SERVER_URL } = process.env;

const Houses = sequelize.define('Houses', {
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  releaseDate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  details: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field
  },
  sellerName: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field
  },
});

module.exports = Houses;
