const db = require('../models/db'); // Example: requiring your database connection
const Entity = require('../models/Doctors'); // Example: requiring your entity model
// Create a new entity
const createEntity = (req, res) => {
    const entityData = req.body; // Get entity data from request body
  
    // Create a new instance of your entity model with the received data
    const newEntity = new Entity(entityData);
  
    // Save the new entity to the database
    newEntity.save()
      .then(entity => {
        res.status(201).json(entity); // Send the created entity as response
      })
      .catch(error => {
        res.status(500).json({ error: error.message }); // Send error message as response
      });
  };
  
  // Read all entities
  const readEntities = (req, res) => {
    // Find all entities in the database
    Entity.find()
      .then(entities => {
        res.status(200).json(entities); // Send all entities as response
      })
      .catch(error => {
        res.status(500).json({ error: error.message }); // Send error message as response
      });
  };
  
  // Read a single entity by ID
  const readEntityById = (req, res) => {
    const entityId = req.params.id; // Get entity ID from request parameters
  
    // Find the entity by ID in the database
    Entity.findById(entityId)
      .then(entity => {
        if (!entity) {
          res.status(404).json({ error: 'Entity not found' }); // Send error message as response
        } else {
          res.status(200).json(entity); // Send entity as response
        }
      })
      .catch(error => {
        res.status(500).json({ error: error.message }); // Send error message as response
      });
  };
  
  // Update a single entity by ID
  const updateEntityById = (req, res) => {
    const entityId = req.params.id; // Get entity ID from request parameters
    const entityData = req.body; // Get entity data from request body
  
    // Find the entity by ID in the database and update it with the received data
    Entity.findByIdAndUpdate(entityId, entityData, { new: true })
      .then(entity => {
        if (!entity) {
          res.status(404).json({ error: 'Entity not found' }); // Send error message as response
        } else {
          res.status(200).json(entity); // Send updated entity as response
        }
      })
      .catch(error => {
        res.status(500).json({ error: error.message }); // Send error message as response
      });
  };
  
  // Delete a single entity by ID
const deleteEntityById = (req, res) => {
    const entityId = req.params.id; // Get entity ID from request parameters
  
    // Find the entity by ID in the database and remove it
    Entity.findByIdAndRemove(entityId)
      .then(entity => {
        if (!entity) {
          res.status(404).json({ error: 'Entity not found' }); // Send error message as response
        } else {
          res.status(200).json({ message: 'Entity deleted successfully' }); // Send success message as response
        }
      })
      .catch(error => {
        res.status(500).json({ error: error.message }); // Send error message as response
      });
  };
  
  module.exports = {
    createEntity,
    readEntities,
    readEntityById,
    updateEntityById,
    deleteEntityById
  };
  