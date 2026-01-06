const mongoose = require('mongoose');

const monkPostSchema = new mongoose.Schema({
  monk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Monk',
    required: [true, 'Monk reference is required']
  },
  monkName: {
    type: String,
    required: true
  },
  monkPhoto: {
    type: String,
    default: ''
  },
  monastery: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Post content is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['teaching', 'daily_routine', 'discipline', 'meditation', 'silence', 'compassion', 'wisdom', 'general'],
    default: 'general'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: String
  }],
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster queries
monkPostSchema.index({ monk: 1, createdAt: -1 });
monkPostSchema.index({ monastery: 1, createdAt: -1 });
monkPostSchema.index({ category: 1, createdAt: -1 });

module.exports = mongoose.model('MonkPost', monkPostSchema);
