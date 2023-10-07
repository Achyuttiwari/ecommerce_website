const User = require('../models/user');
const jwt = require('jsonwebtoken');

//Sign-up
exports.signup = async (req, res) => {
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
            message : 'User created Successfully..!'
          });
        }
      } catch (error) {
        return res.status(400).json({
          message: 'Something went wrong',
        });
    }
}

//Sign-in 
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();

    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const { firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: { firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(400).json({
          message: "Invalid password",
        });
      }
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
