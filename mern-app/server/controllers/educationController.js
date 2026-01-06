const EducationCategory = require('../models/EducationCategory');
const EducationContent = require('../models/EducationContent');

// @desc    Get all education categories
// @route   GET /api/education/categories
// @access  Public
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await EducationCategory.find().sort({ name: 1 });
    
    res.status(200).json({
      success: true,
      count: categories.length,
      categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

// @desc    Get education content by type
// @route   GET /api/education/content?type=spin&category=123
// @access  Public
exports.getContent = async (req, res) => {
  try {
    const { type, category } = req.query;
    const filter = {};
    
    if (type) filter.type = type;
    if (category) filter.category = category;
    
    const content = await EducationContent.find(filter)
      .populate('category', 'name description icon color')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: content.length,
      content
    });
  } catch (error) {
    console.error('Get content error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching content',
      error: error.message
    });
  }
};

// @desc    Get random content by type
// @route   GET /api/education/random?type=spin
// @access  Public
exports.getRandomContent = async (req, res) => {
  try {
    const { type, category } = req.query;
    const filter = {};
    
    if (type) filter.type = type;
    if (category) filter.category = category;
    
    const count = await EducationContent.countDocuments(filter);
    
    if (count === 0) {
      return res.status(404).json({
        success: false,
        message: 'No content found matching the criteria'
      });
    }
    
    const random = Math.floor(Math.random() * count);
    
    const content = await EducationContent.findOne(filter)
      .populate('category', 'name description icon color')
      .skip(random);
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.status(200).json({
      success: true,
      content
    });
  } catch (error) {
    console.error('Get random content error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching random content',
      error: error.message
    });
  }
};

// @desc    Create education content (Admin only)
// @route   POST /api/education/content
// @access  Private/Admin
exports.createContent = async (req, res) => {
  try {
    const { category, title, description, type, question, options, correctAnswer, explanation } = req.body;
    
    const contentData = {
      category,
      title,
      description,
      type,
      question,
      options,
      correctAnswer,
      explanation
    };
    
    // If file uploaded, add image URL
    if (req.file) {
      contentData.image = `/uploads/${req.file.filename}`;
    }
    
    const content = await EducationContent.create(contentData);
    
    const populatedContent = await EducationContent.findById(content._id)
      .populate('category', 'name description icon color');
    
    res.status(201).json({
      success: true,
      message: 'Content created successfully',
      content: populatedContent
    });
  } catch (error) {
    console.error('Create content error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating content',
      error: error.message
    });
  }
};

// @desc    Update education content (Admin only)
// @route   PUT /api/education/content/:id
// @access  Private/Admin
exports.updateContent = async (req, res) => {
  try {
    const { category, title, description, type, question, options, correctAnswer, explanation } = req.body;
    
    const updateData = {
      category,
      title,
      description,
      type,
      question,
      options,
      correctAnswer,
      explanation
    };
    
    // If file uploaded, add image URL
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    
    const content = await EducationContent.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category', 'name description icon color');
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Content updated successfully',
      content
    });
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating content',
      error: error.message
    });
  }
};

// @desc    Delete education content (Admin only)
// @route   DELETE /api/education/content/:id
// @access  Private/Admin
exports.deleteContent = async (req, res) => {
  try {
    const content = await EducationContent.findByIdAndDelete(req.params.id);
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    console.error('Delete content error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting content',
      error: error.message
    });
  }
};

// @desc    Create education category (Admin only)
// @route   POST /api/education/categories
// @access  Private/Admin
exports.createCategory = async (req, res) => {
  try {
    const { name, description, icon, color } = req.body;
    
    const category = await EducationCategory.create({
      name,
      description,
      icon,
      color
    });
    
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating category',
      error: error.message
    });
  }
};
