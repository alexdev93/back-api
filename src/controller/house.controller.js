const express = require('express');
const {
    createHouse,
    getAllHouses,
    updateHouseById,
    deleteHouseById,
    getHouseById,
    deleteAllHouses
  } = require('../service/house.service');
const houseRoutes = express.Router();
const { houseImageUpload } = require('../config/upload')
const authenticateToken = require('./../middleware/authMiddleware')

houseRoutes.post('/',houseImageUpload.single('file'), authenticateToken, createHouse);
houseRoutes.get('/', getAllHouses);
houseRoutes.get('/:id', getHouseById);
houseRoutes.put('/:id', authenticateToken, updateHouseById);
houseRoutes.delete('/:id', authenticateToken, deleteHouseById);
houseRoutes.delete('/', authenticateToken, deleteAllHouses);
houseRoutes.get('/photos/:photoName', (req, res) => {
  const photoName = req.params.photoName;
  const filePath = path.join(__dirname, '..', 'houseImageDIR', photoName);

  res.sendFile(filePath);
});


module.exports = houseRoutes;