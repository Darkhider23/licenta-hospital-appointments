const jwt = require('jsonwebtoken');
// const { encrypt, decrypt } = require('../utils/crypto');
const User = require('../Models/User');

const login = async (req, res) => {
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
    // Send the JWT in the response
    res.status(200).json({ token, message  });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const register = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // Encrypt the password before storing it in the database
//     const encryptedPassword = encrypt(password);
//     await User.create({ email, password: encryptedPassword });
//     res.status(201).json({ message: 'User created' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = login;
