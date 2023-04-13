const express = require('express');
const router = express.Router();
const doctorController = require('../Controllers/DoctorCTRL');

// Route to get all doctors
router.get('/', doctorController.getAllDoctors);

// Route to get a single doctor by ID
router.get('/:id', doctorController.getDoctorById);

// Route to create a new doctor
router.post('/', doctorController.createDoctor);

// Route to update an existing doctor
router.put('/:id', doctorController.updateDoctor);

// Route to delete a doctor by ID
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;
