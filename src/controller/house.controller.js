const express = require('express');
const {
    createHouse,
    getAllHouses,
    updateHouseById,
    deleteHouseById,
    getHouseById,
  } = require('../service/house.service');
const houseRoutes = express.Router();
const authenticateToken = require('./../middleware/authMiddleware')

houseRoutes.post('/', authenticateToken, createHouse);
houseRoutes.get('/',authenticateToken, getAllHouses);
houseRoutes.get('/:id', authenticateToken, getHouseById);
houseRoutes.put('/:id', authenticateToken, updateHouseById);
houseRoutes.delete('/:id', authenticateToken, deleteHouseById);


module.exports = houseRoutes;