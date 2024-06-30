const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
require('dotenv').config();

const { SERVER_URL } = process.env;

const News = sequelize.define('News', {
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  releaseDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field
  },
}, {
  // Other model options go here
  hooks: {
    beforeValidate: (news, options) => {
      if (news.imagePath) {
        news.imagePath = `${SERVER_URL}/api/photos/${news.imagePath}`;
      }
    },
  },
});

module.exports = News;
