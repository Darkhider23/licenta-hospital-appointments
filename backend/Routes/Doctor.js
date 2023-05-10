const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Doctor = require('../Models/Doctor');


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
      // Send the JWT in the response
      res.status(200).json({ token, message});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

router.get('/', async (req, res) => {
    try {
        const users = await Doctor.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/register', async (req, res) => {
    const { firstname, lastname, email, password, specialization, rating } = req.body;

    try {
        const user = await Doctor.create({
            firstname,
            lastname,
            email,
            password,
            specialization,
            rating,
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
    const { firstname, lastname, email, password, specialization, rating } = req.body;

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
            specialization,
            rating,
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
