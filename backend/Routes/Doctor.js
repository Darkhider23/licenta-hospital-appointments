const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Doctor = require('../Models/Doctor');
const Specializations = require('../Models/Specializations')


router.post('/login',async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find the user with the given email
      const encryptedUser = await Doctor.findOne({ where: { email } });
      if (!encryptedUser) {
        return res.status(401).json({ message: 'Invalid email' });
      }
      // Check if the decrypted password matches the one from the request
      if (encryptedUser.password !== password) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Generate a JWT for the user
      const token = jwt.sign({ id: encryptedUser.id }, process.env.JWT_SECRET);
      const message="Login successful";
      const id = encryptedUser.id;
      const role = encryptedUser.role;
      // Send the JWT in the response
      res.status(200).json({ token, message, id,role});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
router.get('/specializations/:specializationId', async (req, res) => {
  const { specializationId } = req.params;

  try {
    const specialization = await Specializations.findByPk(specializationId);
    if (!specialization) {
      return res.status(404).json({ message: 'Specialization not found' });
    }

    const doctors = await Doctor.findAll({
      include: [
        {
          model: Specializations,
          where: { id: specializationId },
        },
      ],
    });

    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
router.get('/', async (req, res) => {
    try {
        const users = await Doctor.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/register', async (req, res) => {
    const { firstname, lastname, email, password, specializationId, rating } = req.body;
    const role ="doctor";

    try {
        const doctor = await Doctor.create({
            firstname,
            lastname,
            email,
            password,
            specializationId,
            rating,
            role,
        });

        res.status(201).json(doctor);
    } catch (error) {
        // if(error.name==="Validation error"){
        //     res.status(500).json({message:error.message,errors:error.errors})
        // }
        res.status(500).json({message:error.message,errors:error.errors});
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await Doctor.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { firstname, lastname, email, password, specializationId, rating,role } = req.body;

    try {
        const user = await Doctor.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        await user.update({
            firstname,
            lastname,
            email,
            password,
            specializationId,
            rating,
            role,
        });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await Doctor.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        await user.destroy();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
