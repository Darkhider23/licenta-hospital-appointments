const express = require('express');
const router = express.Router();
const Treatment = require('../Models/Treatment');
const Diseases = require('../Models/Diseases');


// Get all treatments
router.get('/', async (req, res) => {
    try {
      const treatments = await Treatment.findAll({
        include: Diseases, // Include the associated Diseases model
      });
      res.json(treatments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Get a specific treatment by ID
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const treatment = await Treatment.findByPk(id, {
        include: Diseases, // Include the associated Diseases model
      });
      if (treatment) {
        res.json(treatment);
      } else {
        res.status(404).json({ error: 'Treatment not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error',message:error.message });
    }
  });
  
  // Create a new treatment
  router.post('/', async (req, res) => {
    const { name, description, diseasesId } = req.body;
    try {
      const treatment = await Treatment.create({
        name,
        description,
        diseasesId,
      });
      res.status(201).json(treatment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Update a treatment
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, diseasesId } = req.body;
    try {
      const treatment = await Treatment.findByPk(id);
      if (treatment) {
        treatment.name = name;
        treatment.description = description;
        treatment.diseasesId = diseasesId;
        await treatment.save();
        res.json(treatment);
      } else {
        res.status(404).json({ error: 'Treatment not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Delete a treatment
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const treatment = await Treatment.findByPk(id);
      if (treatment) {
        await treatment.destroy();
        res.json({ message: 'Treatment deleted successfully' });
      } else {
        res.status(404).json({ error: 'Treatment not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;
  