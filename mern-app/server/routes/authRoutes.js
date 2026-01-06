const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  register,
  login,
  getMe,
  updateProfile,
  getAllUsers,
  deleteUser,
  createMonk
} = require('../controllers/authController');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, upload.single('avatar'), updateProfile);

// Admin routes
router.get('/users', protect, isAdmin, getAllUsers);
router.post('/create-monk', protect, isAdmin, createMonk);
router.delete('/users/:id', protect, isAdmin, deleteUser);

module.exports = router;
