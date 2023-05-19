const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const session = require('express-session');

router.use(session({
  secret:process.env.JWT_SECRET,
  resave:false,
  saveUnitialized:false
}))

router.post('/login',async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user with the given email
    const encryptedUser = await User.findOne({ where: { email } });
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
router.post('/logout', (req, res) => {
  // Destroy the user's session data
  req.session.destroy();
  res.json({ success: true });
});
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const role = "pacient"
  try {
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      role,
    });
    const message = "Register successful";
    res.status(201).json({ user, message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { firstname, lastname, email, password, role } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({
      firstname,
      lastname,
      email,
      password,
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
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
