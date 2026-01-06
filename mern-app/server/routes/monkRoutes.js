const express = require('express');
const router = express.Router();
const {
  getAllMonks,
  getMonkById,
  createMonk,
  updateMonk,
  deleteMonk,
  monkLogin,
  updateMonkProfile
} = require('../controllers/monkController');
const { getMonkPostsByMonkId } = require('../controllers/monkPostController');
const { protect, adminOnly, isMonk } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', getAllMonks);
router.post('/login', monkLogin);

// Monk profile update (protected, monk only) - with file upload
// IMPORTANT: This must come BEFORE /:id route to avoid conflicts
router.put('/profile', protect, isMonk, upload.single('photo'), updateMonkProfile);

// Public routes with ID parameter
router.get('/:id', getMonkById);
router.get('/:id/posts', getMonkPostsByMonkId);

// Admin only routes
router.post('/', protect, adminOnly, createMonk);
router.put('/:id', protect, adminOnly, updateMonk);
router.delete('/:id', protect, adminOnly, deleteMonk);

module.exports = router;
