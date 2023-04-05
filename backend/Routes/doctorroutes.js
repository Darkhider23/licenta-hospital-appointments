// Import dependencies
const express = require('express');
const router = express.Router();
const entityController = require('../controllers/entityController');

// Define routes for CRUD operations
router.post('/entities', entityController.createEntity); // Create entity
router.get('/entities', entityController.getAllEntities); // Read all entities
router.get('/entities/:id', entityController.getEntityById); // Read entity by ID
router.put('/entities/:id', entityController.updateEntity); // Update entity by ID
router.delete('/entities/:id', entityController.deleteEntity); // Delete entity by ID

module.exports = router;
