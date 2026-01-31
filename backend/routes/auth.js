const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (admin.status !== 'active') {
      return res.status(403).json({ message: 'Account is inactive' });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Create token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register (for setup only)
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = new Admin({
      email,
      password,
      name,
      role: role || 'admin',
      permissions: ['all'],
    });

    await admin.save();

    res.status(201).json({
      message: 'Admin created successfully',
      admin: { id: admin._id, email: admin.email },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
