const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Farmer = require('../models/Farmer');
require('dotenv').config();

const signup = async (req, res) => {
  const { username, password, farmerName, email, farmLocation, farmerNumber } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const farmer = new Farmer({
      username,
      password: hashedPassword,
      farmerName,
      email,
      farmLocation,
      farmerNumber,
    });

    await farmer.save();
    res.status(201).json({ message: 'Sign-up successful.' });
  } catch (error) {
    res.status(500).json({ message: 'Error during sign-up.', error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const farmer = await Farmer.findOne({ username });
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found.' });
    }

    const isMatch = await bcrypt.compare(password, farmer.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: farmer._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    res.status(500).json({ message: 'Error during login.', error: error.message });
  }
};

module.exports = { signup, login };
