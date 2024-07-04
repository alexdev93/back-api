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
    type: DataTypes.TEXT,
    allowNull: true,
  },
  releaseDate: {
    type: DataTypes.DATE,
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
});

module.exports = Houses;
