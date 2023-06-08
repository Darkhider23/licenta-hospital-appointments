const express = require('express');
const router = express.Router();
const MedicalRecord = require('../Models/MedicalRecord');

// Create a new medical record
router.post('/', async (req, res) => {
  try {
    const { userId, height, weight, age, diagnosis } = req.body;
    const medicalRecord = await MedicalRecord.create({
      userId,
      height,
      weight,
      age,
      diagnosis,
    });
    res.status(201).json(medicalRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all medical records
router.get('/', async (req, res) => {
  try {
    const medicalRecords = await MedicalRecord.findAll();
    res.json(medicalRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a specific medical record
router.get('/:id', async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findByPk(req.params.id);
    if (!medicalRecord) {
      return res.status(404).json({ message: 'Medical Record not found' });
    }
    res.json(medicalRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
// Get a specific medical record
router.get('/user/:userId', async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findOne({
      where: { userId: req.params.userId },
    });

    if (!medicalRecord) {
      return res.status(404).json({ message: 'Medical Record not found' });
    }

    res.json(medicalRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a medical record
router.put('/:id', async (req, res) => {
  try {
    const { userId, height, weight, age, diagnosis, gender, treatment } = req.body;
    const medicalRecord = await MedicalRecord.findByPk(req.params.id);
    if (!medicalRecord) {
      return res.status(404).json({ message: 'Medical Record not found' });
    }
    medicalRecord.userId = userId;
    medicalRecord.height = height;
    medicalRecord.weight = weight;
    medicalRecord.age = age;
    medicalRecord.diagnosis = diagnosis;
    medicalRecord.gender = gender;
    medicalRecord.treatment = treatment;
    await medicalRecord.save();
    res.json({message:'Information updated'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a medical record
router.delete('/medical-records/:id', async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findByPk(req.params.id);
    if (!medicalRecord) {
      return res.status(404).json({ message: 'Medical Record not found' });
    }
    await medicalRecord.destroy();
    res.json({ message: 'Medical Record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
