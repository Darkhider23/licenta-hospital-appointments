const express = require('express');
const router = express.Router();
const AnalysisPrice = require('../Models/AnalisysPrice');


// Get all analysis prices
router.get('/', async (req, res) => {
    try {
      const analysisPrices = await AnalysisPrice.findAll();
      res.json(analysisPrices);
    } catch (error) {
      console.error('Error getting analysis prices:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Create a new analysis price
  router.post('/', async (req, res) => {
    const { name, price } = req.body;
    try {
      const analysisPrice = await AnalysisPrice.create({ name, price });
      res.status(201).json(analysisPrice);
    } catch (error) {
      console.error('Error creating analysis price:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Get a single analysis price by ID
  router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const analysisPrice = await AnalysisPrice.findByPk(id);
      if (analysisPrice) {
        res.json(analysisPrice);
      } else {
        res.status(404).json({ error: 'Analysis price not found' });
      }
    } catch (error) {
      console.error('Error getting analysis price:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Update an analysis price
  router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { name, price } = req.body;
    try {
      const analysisPrice = await AnalysisPrice.findByPk(id);
      if (analysisPrice) {
        analysisPrice.name = name;
        analysisPrice.price = price;
        await analysisPrice.save();
        res.json(analysisPrice);
      } else {
        res.status(404).json({ error: 'Analysis price not found' });
      }
    } catch (error) {
      console.error('Error updating analysis price:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Delete an analysis price
  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const analysisPrice = await AnalysisPrice.findByPk(id);
      if (analysisPrice) {
        await analysisPrice.destroy();
        res.json({ message: 'Analysis price deleted' });
      } else {
        res.status(404).json({ error: 'Analysis price not found' });
      }
    } catch (error) {
      console.error('Error deleting analysis price:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  module.exports = router;