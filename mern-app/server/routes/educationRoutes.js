const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getContent,
  getRandomContent,
  createContent,
  updateContent,
  deleteContent,
  createCategory
} = require('../controllers/educationController');
const { protect, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/categories', getAllCategories);
router.get('/content', getContent);
router.get('/random', getRandomContent);

// Admin only routes
router.post('/categories', protect, isAdmin, createCategory);
router.post('/content', protect, isAdmin, upload.single('image'), createContent);
router.put('/content/:id', protect, isAdmin, upload.single('image'), updateContent);
router.delete('/content/:id', protect, isAdmin, deleteContent);

module.exports = router;
