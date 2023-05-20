const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Appointment = require('../Models/Appointments');

// Create a new appointment
router.post('/', async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json({ message: 'Success', appointment });
  } catch (error) {
    console.error(error);
    const messageError = error.errors[0].message;
    const objerror = error.schedules;
    res.status(500).json({ message: 'Server Error', messageError, objerror });
  }
});

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

//Get the appointments of doctor
router.get('/doctor-appointments/:doctorId', async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.findAll({
      where: {
        doctorId: doctorId
      }
    });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
})
router.put('/cancel/:id',async(req,res)=>{
  try{
    const{id} = req.params;
    const appointment = await Appointment.findByPk(id);
    if (appointment) {
      appointment.status = 'canceled';
      await appointment.save();
      res.status(200).json({message:'Status Updated'});
  }else{
    req.status(404).json({message:'Appointment not found'});
  }
}catch(error){
  res.status(500).json({message:'Server Error'});
}
});
router.put('/confirm/:id',async(req,res)=>{
  try{
    const{id} = req.params;
    const appointment = await Appointment.findByPk(id);
    if (appointment) {
      appointment.status = 'confirmed';
      await appointment.save();
      res.status(200).json({message:'Status Updated'});
  }else{
    req.status(404).json({message:'Appointment not found'});
  }
}catch(error){
  console.error(error);
  res.status(500).json({message:'Server Error'});
}
});
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const appointments = await Appointment.findAll({
      where: {
        userId: userId
      }
    });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (appointment) {
      res.json(appointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a appointment
router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (appointment) {
      await appointment.update(req.body);
      res.status(200).json({message:'Appointment Updated',appointment});
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error',errors:error.errors });
  }
});

// Delete a appointment
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (appointment) {
      await appointment.destroy();
      res.json({ message: 'Appointment deleted successfully' });
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' }); 
  }
});

module.exports = router;
