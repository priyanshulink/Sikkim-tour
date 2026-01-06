const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Monk = require('../models/Monk');

// Optional auth - doesn't fail if no token, just sets req.user if valid token exists
exports.optionalAuth = async (req, res, next) => {
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from token
        req.user = await User.findById(decoded.id).select('-password');
      } catch (error) {
        // Token invalid, but don't block the request
        console.log('Invalid token in optional auth:', error.message);
      }
    }
    
    next();
  } catch (error) {
    // Don't block request, just continue without user
    next();
  }
};

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Please login.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user is a monk or regular user/admin
    if (decoded.role === 'MONK') {
      const monk = await Monk.findById(decoded.id).select('-password');
      if (monk) {
        // Convert to plain object and add role
        req.user = monk.toObject();
        req.user.role = 'MONK';
        req.user.id = monk._id; // Add id property for consistency
      }
    } else {
      req.user = await User.findById(decoded.id).select('-password');
    }
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. Invalid token.'
    });
  }
};

// Check if user is admin
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin only route.'
    });
  }
};

// Admin only alias
exports.adminOnly = exports.isAdmin;

// Check if user is a monk
exports.isMonk = (req, res, next) => {
  if (req.user && req.user.role === 'MONK') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Monk only route.'
    });
  }
};

// Check if user is authenticated (User or Admin)
exports.isUser = (req, res, next) => {
  if (req.user && (req.user.role === 'User' || req.user.role === 'Admin')) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. User authentication required.'
    });
  }
};
