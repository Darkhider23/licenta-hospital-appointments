const express = require('express');
const router = express.Router();
const Doctor = require('../Models/Doctor');
const login = require('../controllers/Login');


router.post('/login', login);

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
