const express = require('express');
const router = express.Router();
const { Symptoms, Diseases } = require('../models');

// Get all symptoms
router.get('/', async (req, res) => {
  try {
    const symptoms = await Symptoms.findAll({ include: Diseases });
    res.json(symptoms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a symptom
router.post('/', async (req, res) => {
  const { name, diseaseId } = req.body;
  try {
    const disease = await Diseases.findByPk(diseaseId);
    if (!disease) {
      return res.status(400).json({ msg: 'Invalid disease ID' });
    }
    const symptom = await Symptoms.create({ name, diseaseId });
    res.json(symptom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a symptom
router.put('/:id', async (req, res) => {
  const { name, diseaseId } = req.body;
  const id = req.params.id;
  try {
    const symptom = await Symptoms.findByPk(id);
    if (!symptom) {
      return res.status(404).json({ msg: 'Symptom not found' });
    }
    const disease = await Diseases.findByPk(diseaseId);
    if (!disease) {
      return res.status(400).json({ msg: 'Invalid disease ID' });
    }
    symptom.name = name;
    symptom.diseaseId = diseaseId;
    await symptom.save();
    res.json(symptom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a symptom
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const symptom = await Symptoms.findByPk(id);
    if (!symptom) {
      return res.status(404).json({ msg: 'Symptom not found' });
    }
    await symptom.destroy();
    res.json({ msg: 'Symptom deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
