const express = require('express');
const { Op } = require('sequelize');
const Diseases = require('../Models/Diseases');
const router = express.Router();

// GET /api/diseases
// Get all diseases
router.get('/', async (req, res) => {
    try {
        const diseases = await Diseases.findAll();
        res.json(diseases);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET /api/diseases/:id
// Get a disease by id
router.get('/:id', async (req, res) => {
    try {
        const disease = await Diseases.findByPk(req.params.id);
        if (!disease) {
            return res.status(404).json({ message: 'Disease not found' });
        }
        res.json(disease);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/diseases
// Create a new disease
router.post('/', async (req, res) => {
    try {
        const { name, description, treatment, specializationsId } = req.body;
        const disease = await Diseases.create({ name, description, treatment, specializationsId });
        res.status(201).json(disease);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// PUT /api/diseases/:id
// Update a disease by id
router.put('/:id', async (req, res) => {
    try {
        const disease = await Diseases.findByPk(req.params.id);
        if (!disease) {
            return res.status(404).json({ message: 'Disease not found' });
        }
        const { name, description, treatment, specializationsId } = req.body;
        disease.name = name;
        disease.description = description;
        disease.treatment = treatment;
        disease.specializationsId = specializationsId;
        await disease.save();
        res.json(disease);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE /api/diseases/:id
// Delete a disease by id
router.delete('/:id', async (req, res) => {
    try {
        const disease = await Diseases.findByPk(req.params.id);
        if (!disease) {
            return res.status(404).json({ message: 'Disease not found' });
        }
        await disease.destroy();
        res.json({ message: 'Disease deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;