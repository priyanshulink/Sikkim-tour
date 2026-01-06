const mongoose = require('mongoose');

const educationCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  icon: {
    type: String,
    default: '📚'
  },
  color: {
    type: String,
    default: '#667eea'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('EducationCategory', educationCategorySchema);
