const mongoose = require('mongoose');

const monkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Monk name is required'],
    trim: true
  },
  photo: {
    type: String,
    default: ''
  },
  monastery: {
    type: String,
    required: [true, 'Monastery name is required'],
    trim: true
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    default: 'MONK',
    immutable: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  totalPosts: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Hash password before saving
const bcrypt = require('bcryptjs');

monkSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
monkSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
monkSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// Index for faster queries
monkSchema.index({ monastery: 1, isActive: 1 });

module.exports = mongoose.model('Monk', monkSchema);
