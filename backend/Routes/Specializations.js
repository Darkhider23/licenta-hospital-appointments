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

router.get('/', async (req, res) => {
  try {
    const specializations = await Specializations.findAll();
    res.json(specializations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a specific specialization
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const specialization = await Specializations.findByPk(id);
    if (!specialization) {
      return res.status(404).json({ message: 'Specialization not found' });
    }
    res.json(specialization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new specialization
router.post('/', async (req, res) => {
  const { name, description } = req.body;

  try {
    const specialization = await Specializations.create({ name, description });
    res.status(201).json(specialization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a specialization
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const specialization = await Specializations.findByPk(id);
    if (!specialization) {
      return res.status(404).json({ message: 'Specialization not found' });
    }
    specialization.name = name;
    specialization.description = description;
    await specialization.save();

    res.json(specialization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
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

    res.json({ message: 'Specialization deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
