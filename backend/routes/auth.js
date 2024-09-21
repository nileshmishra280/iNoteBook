const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'nileshisagoodboy';

// Route 1: Create a new user using POST "/api/auth/createuser"
router.post("/createuser", [
  // Email validation
  body('email')
    .isEmail().withMessage('Invalid email format')
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject('Email already exists');
      }
    }),
  // Name validation
  body('name')
    .isLength({ min: 5 }).withMessage('Name must be at least 5 characters'),
  // Password validation
  body('password')
    .isLength({ min: 5 }).withMessage('Password must be at least 5 characters')
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({ email, name, password: hashPassword });

    // Prepare payload for JWT token
    const data = {
      user: {
        id: user.id
      }
    };

    // Sign and create the JWT token
    const authtoken = jwt.sign(data, JWT_SECRET);
    await user.save();

    // Send the auth token as response
    res.status(201).json(authtoken);

  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'An error occurred while saving the user' });
  }
});

// Route 2: Authenticate user using POST "/api/auth/login"
router.post("/login", [
  // Email validation
  body('email').isEmail().withMessage('Invalid email format'),
  // Password validation
  body('password').exists().withMessage('Password cannot be blank'),
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ errors: "Please enter valid credentials!" });
    }

    // Compare the provided password with the stored hashed password
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(404).json({ errors: "Please enter valid credentials!" });
    }

    // Prepare payload for JWT token
    const data = {
      user: {
        id: user.id
      }
    };

    // Sign and create the JWT token
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json(authtoken);

  } catch (error) {
    console.error('Some error has occurred');
    res.status(500).json({ error: 'Internal server error occurred' });
  }
});

//Route 3: Get Logged in User Details using : POST "/api/auth/getuser".Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);

  } catch (error) {
    console.error('Some error has occurred');
    res.status(500).json({ error: 'Internal server error occurred' });
  }
});
module.exports = router;
