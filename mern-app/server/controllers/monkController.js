const Monk = require('../models/Monk');
const MonkPost = require('../models/MonkPost');
const jwt = require('jsonwebtoken');

// @desc    Get all monks
// @route   GET /api/monks
// @access  Public
exports.getAllMonks = async (req, res) => {
  try {
    const monks = await Monk.find({ isActive: true })
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: monks.length,
      monks
    });
  } catch (error) {
    console.error('Get all monks error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching monks',
      error: error.message
    });
  }
};

// @desc    Get monk by ID
// @route   GET /api/monks/:id
// @access  Public
exports.getMonkById = async (req, res) => {
  try {
    const monk = await Monk.findById(req.params.id).select('-password');

    if (!monk) {
      return res.status(404).json({
        success: false,
        message: 'Monk not found'
      });
    }

    res.status(200).json({
      success: true,
      monk
    });
  } catch (error) {
    console.error('Get monk by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching monk',
      error: error.message
    });
  }
};

// @desc    Create new monk (Admin only)
// @route   POST /api/monks
// @access  Private/Admin
exports.createMonk = async (req, res) => {
  try {
    const { name, email, password, photo, monastery, bio } = req.body;

    // Check if monk with email already exists
    const existingMonk = await Monk.findOne({ email });
    if (existingMonk) {
      return res.status(400).json({
        success: false,
        message: 'Monk with this email already exists'
      });
    }

    const monk = await Monk.create({
      name,
      email,
      password,
      photo,
      monastery,
      bio
    });

    res.status(201).json({
      success: true,
      message: 'Monk account created successfully',
      monk
    });
  } catch (error) {
    console.error('Create monk error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating monk',
      error: error.message
    });
  }
};

// @desc    Update monk
// @route   PUT /api/monks/:id
// @access  Private/Admin
exports.updateMonk = async (req, res) => {
  try {
    const { name, photo, monastery, bio, isActive } = req.body;

    const monk = await Monk.findByIdAndUpdate(
      req.params.id,
      { name, photo, monastery, bio, isActive },
      { new: true, runValidators: true }
    ).select('-password');

    if (!monk) {
      return res.status(404).json({
        success: false,
        message: 'Monk not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Monk updated successfully',
      monk
    });
  } catch (error) {
    console.error('Update monk error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating monk',
      error: error.message
    });
  }
};

// @desc    Delete monk
// @route   DELETE /api/monks/:id
// @access  Private/Admin
exports.deleteMonk = async (req, res) => {
  try {
    const monk = await Monk.findByIdAndDelete(req.params.id);

    if (!monk) {
      return res.status(404).json({
        success: false,
        message: 'Monk not found'
      });
    }

    // Also delete all posts by this monk
    await MonkPost.deleteMany({ monk: req.params.id });

    res.status(200).json({
      success: true,
      message: 'Monk and associated posts deleted successfully'
    });
  } catch (error) {
    console.error('Delete monk error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting monk',
      error: error.message
    });
  }
};

// @desc    Update monk profile (by monk themselves)
// @route   PUT /api/monks/profile
// @access  Private/Monk
exports.updateMonkProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;

    // Find monk by ID from JWT token (use _id or id)
    const monkId = req.user._id || req.user.id;
    const monk = await Monk.findById(monkId);

    if (!monk) {
      return res.status(404).json({
        success: false,
        message: 'Monk not found'
      });
    }

    // Update only allowed fields
    if (name) monk.name = name;
    if (bio) monk.bio = bio;
    
    // If photo file is uploaded
    if (req.file) {
      monk.photo = `/uploads/${req.file.filename}`;
    }

    await monk.save();

    // Remove password from response
    monk.password = undefined;

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      monk
    });
  } catch (error) {
    console.error('Update monk profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};

// @desc    Monk login
// @route   POST /api/monks/login
// @access  Public
exports.monkLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find monk with password field
    const monk = await Monk.findOne({ email }).select('+password');

    if (!monk) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if monk is active
    if (!monk.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is inactive'
      });
    }

    // Verify password
    const isMatch = await monk.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: monk._id, role: 'MONK', name: monk.name },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Remove password from response
    monk.password = undefined;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      monk
    });
  } catch (error) {
    console.error('Monk login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
};
