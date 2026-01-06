const express = require('express');
const router = express.Router();
const {
  getAllMonkPosts,
  getMonkPostById,
  createMonkPost,
  updateMonkPost,
  deleteMonkPost,
  likeMonkPost
} = require('../controllers/monkPostController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getAllMonkPosts);
router.get('/:id', getMonkPostById);
router.post('/:id/like', likeMonkPost);

// Protected routes (Monk only for create/update, Admin can delete)
router.post('/', protect, createMonkPost);
router.put('/:id', protect, updateMonkPost);
router.delete('/:id', protect, deleteMonkPost);

module.exports = router;
