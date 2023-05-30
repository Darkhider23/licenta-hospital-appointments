const express = require('express');
const router = express.Router();
const Diagnosis = require('../models/Diagnosis');

// Create a new diagnosis
router.post('/diagnoses', async (req, res) => {
  try {
    const { name, date, userId } = req.body;
    const diagnosis = await Diagnosis.create({
      name,
      date,
      userId,
    });
    res.status(201).json(diagnosis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all diagnoses
router.get('/diagnoses', async (req, res) => {
  try {
    const diagnoses = await Diagnosis.findAll();
    res.json(diagnoses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a specific diagnosis
router.get('/diagnoses/:id', async (req, res) => {
  try {
    const diagnosis = await Diagnosis.findByPk(req.params.id);
    if (!diagnosis) {
      return res.status(404).json({ message: 'Diagnosis not found' });
    }
    res.json(diagnosis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a diagnosis
router.put('/diagnoses/:id', async (req, res) => {
  try {
    const { name, date, userId } = req.body;
    const diagnosis = await Diagnosis.findByPk(req.params.id);
    if (!diagnosis) {
      return res.status(404).json({ message: 'Diagnosis not found' });
    }
    diagnosis.name = name;
    diagnosis.date = date;
    diagnosis.userId = userId;
    await diagnosis.save();
    res.json(diagnosis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a diagnosis
router.delete('/diagnoses/:id', async (req, res) => {
  try {
    const diagnosis = await Diagnosis.findByPk(req.params.id);
    if (!diagnosis) {
      return res.status(404).json({ message: 'Diagnosis not found' });
    }
    await diagnosis.destroy();
    res.json({ message: 'Diagnosis deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
