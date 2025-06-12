// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const loginUser = async (req, res) => {
  console.log('Login request received:', req.body);
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    console.log('User found in database:', user ? {
      email: user.email,
      role: user.role,
      hasPassword: !!user.password
    } : 'No user found');

    if (!user) {
      console.log('Login failed: User not found');
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log('Password comparison result:', isPasswordMatch);

    if (!isPasswordMatch) {
      console.log('Login failed: Incorrect password');
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = `fake-jwt-token-for-${user.email}`;
    console.log('Login successful for user:', user.email);

    return res.status(200).json({
      message: 'Login successful',
      user: {
        email: user.email,
        role: user.role,
        name: user.name
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { loginUser };
