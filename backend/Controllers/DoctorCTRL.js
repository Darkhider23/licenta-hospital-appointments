const db = require('../Models');
const Doctor = db.Doctor;

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.status(200).json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a single doctor
exports.getDoctorById = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findByPk(id);
    if (doctor) {
      res.status(200).json(doctor);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new doctor
exports.createDoctor = async (req, res) => {
  const { name, surname, specialization, image, rating } = req.body;
  try {
    const newDoctor = await Doctor.create({ name, surname, specialization, image, rating });
    res.status(201).json(newDoctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a doctor
exports.updateDoctor = async (req, res) => {
  const id = req.params.id;
  const { name, surname, specialization, image, rating } = req.body;
  try {
    const doctor = await Doctor.findByPk(id);
    if (doctor) {
      doctor.name = name;
      doctor.surname = surname;
      doctor.specialization = specialization;
      doctor.image = image;
      doctor.rating = rating;
      await doctor.save();
      res.status(200).json(doctor);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a doctor
exports.deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findByPk(id);
    if (doctor) {
      await doctor.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
