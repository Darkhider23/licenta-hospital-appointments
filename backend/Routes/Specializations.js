const express = require('express');
const router = express.Router();
const  Specializations  = require('../Models/Specializations');

const { Op } = require('sequelize');

router.get('/search', async (req, res) => {
  const { query } = req.query;
  const results = await Specializations.findAll({
    where: {
      name: {
        [Op.like]: `%${query}%`,
      },
    },
    limit: 10,
  });
  res.json({ results });
});

// Get all specializations
router.get('/', async (req, res) => {
  try {
    const specializations = await Specializations.findAll();
    res.json(specializations);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single specialization
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const specialization = await Specializations.findByPk(id);
    if (!specialization) {
      return res.status(404).json({ message: 'Specialization not found' });
    }
    res.json(specialization);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new specialization
router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const specialization = await Specializations.create({ name });
    res.status(201).json(specialization);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a specialization
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const specialization = await Specializations.findByPk(id);
    if (!specialization) {
      return res.status(404).json({ message: 'Specialization not found' });
    }
    specialization.name = name;
    await specialization.save();
    res.json(specialization);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a specialization
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const specialization = await Specializations.findByPk(id);
    if (!specialization) {
      return res.status(404).json({ message: 'Specialization not found' });
    }
    await specialization.destroy();
    res.json({ message: 'Specialization deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
