const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/signup', async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already registered',
      });
    }

    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
    });

    const savedUser = await newUser.save();

    if (savedUser) {
      return res.status(201).json({
        user: savedUser,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: 'Something went wrong',
    });
  }
});

module.exports = router;
