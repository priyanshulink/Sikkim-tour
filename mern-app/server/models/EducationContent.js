const mongoose = require('mongoose');

const educationContentSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EducationCategory',
    required: [true, 'Category is required']
  },
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['spin', 'flashcard', 'quiz'],
    required: [true, 'Type is required']
  },
  // For quiz type content
  question: {
    type: String,
    default: ''
  },
  options: [{
    type: String
  }],
  correctAnswer: {
    type: Number,
    default: 0
  },
  explanation: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for faster queries
educationContentSchema.index({ category: 1, type: 1 });

module.exports = mongoose.model('EducationContent', educationContentSchema);
