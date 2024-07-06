const Houses = require('../models/Houses');

// Create a new house
const createHouse = async (req, res) => {
  const houseDetail = await req.body;
  try {
    const house = await Houses.create(houseDetail);
    res.status(201).json(house);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a house by ID
const getHouseById = async (req, res) => {
  const { id } = req.params;
  try {
    const house = await Houses.findByPk(id);
    if (house) {
      res.status(200).json(house);
    } else {
      res.status(404).json({ message: 'House not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a house by ID
const updateHouseById = async (req, res) => {
  const { id } = req.params;
  const updatedHouse = req.body;
  try {
    const house = await Houses.findByPk(id);
    if (house) {
      await house.update(updatedHouse);
      res.status(200).json(house);
    } else {
      res.status(404).json({ message: 'House not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a house by ID
const deleteHouseById = async (req, res) => {
  const { id } = req.params;
  try {
    const house = await Houses.findByPk(id);
    if (house) {
      await house.destroy();
      res.status(200).json({ message: 'House deleted' });
    } else {
      res.status(404).json({ message: 'House not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all houses
const getAllHouses = async (req, res) => {
  try {
    const houses = await Houses.findAll();
    res.status(200).json(houses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete all houses
const deleteAllHouses = async (req, res) => {
  try {
    await Houses.destroy({ where: {} });
    res.status(200).json({ message: 'All houses deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createHouse,
  getAllHouses,
  updateHouseById,
  deleteHouseById,
  getHouseById,
  deleteAllHouses,
};
