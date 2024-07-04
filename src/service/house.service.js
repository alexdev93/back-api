const Houses = require('../models/Houses');

// Create a new user
const createHouse = async (req, res) => {
  const houseDetail = await req.body;
  try {
    const house = await Houses.create(houseDetail);
    res.status(201).json(house);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a user by ID
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

// Update a user by ID
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

// Delete a user by ID
const deleteHouseById = async (req, res) => {
  const { id } = req.params;
  try {
    const house = await Houses.findByPk(id);
    if (house) {
      await house.destroy();
      res.status(200).json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users
const getAllHouses = async (req, res) => {
  try {
    const house = await Houses.findAll();
    res.status(200).json(house);
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
};