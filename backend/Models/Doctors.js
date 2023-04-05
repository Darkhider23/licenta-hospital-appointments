// Import dependencies
const mongoose = require('mongoose');

// Create a schema for the entity
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  // Add more properties to your entity schema as needed
});

// Create a model for the entity using the schema
const Doctors = mongoose.model('Doctors', doctorSchema);

module.exports = Doctors;
