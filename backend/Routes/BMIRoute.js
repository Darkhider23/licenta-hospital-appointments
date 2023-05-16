const express = require('express');
const router = express.Router();

router.use(express.json());

router.post('/calculate-bmi', (req, res) => {
  const { height, weight } = req.body;

  // Calculate BMI
  const bmi = weight / Math.pow(height, 2);

  // Return the calculated BMI
  res.json({ bmi });
});

module.exports = router;
