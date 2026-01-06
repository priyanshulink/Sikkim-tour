const MonkPost = require('../models/MonkPost');
const Monk = require('../models/Monk');

// @desc    Get all monk posts
// @route   GET /api/monk-posts
// @access  Public
exports.getAllMonkPosts = async (req, res) => {
  try {
    const { monastery, category, monk } = req.query;
    const filter = { isPublished: true };

    if (monastery) filter.monastery = monastery;
    if (category) filter.category = category;
    if (monk) filter.monk = monk;

    const posts = await MonkPost.find(filter)
      .populate('monk', 'name photo monastery')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts
    });
  } catch (error) {
    console.error('Get all monk posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching monk posts',
      error: error.message
    });
  }
};

// @desc    Get monk posts by monk ID
// @route   GET /api/monks/:id/posts
// @access  Public
exports.getMonkPostsByMonkId = async (req, res) => {
  try {
    const posts = await MonkPost.find({
      monk: req.params.id,
      isPublished: true
    })
      .populate('monk', 'name photo monastery')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts
    });
  } catch (error) {
    console.error('Get monk posts by monk ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching monk posts',
      error: error.message
    });
  }
};

// @desc    Get single monk post
// @route   GET /api/monk-posts/:id
// @access  Public
exports.getMonkPostById = async (req, res) => {
  try {
    const post = await MonkPost.findById(req.params.id)
      .populate('monk', 'name photo monastery bio');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.status(200).json({
      success: true,
      post
    });
  } catch (error) {
    console.error('Get monk post by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching post',
      error: error.message
    });
  }
};

// @desc    Create monk post (Monk only)
// @route   POST /api/monk-posts
// @access  Private/Monk
exports.createMonkPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    // Get monk info from authenticated user
    const userId = req.user._id || req.user.id;
    const monk = await Monk.findById(userId);
    
    if (!monk) {
      return res.status(404).json({
        success: false,
        message: 'Monk not found'
      });
    }

    const post = await MonkPost.create({
      monk: monk._id,
      monkName: monk.name,
      monkPhoto: monk.photo,
      monastery: monk.monastery,
      title,
      content,
      category: category || 'general'
    });

    // Increment monk's total posts count
    monk.totalPosts += 1;
    await monk.save();

    const populatedPost = await MonkPost.findById(post._id)
      .populate('monk', 'name photo monastery');

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post: populatedPost
    });
  } catch (error) {
    console.error('Create monk post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating post',
      error: error.message
    });
  }
};

// @desc    Update monk post
// @route   PUT /api/monk-posts/:id
// @access  Private/Monk (own posts only)
exports.updateMonkPost = async (req, res) => {
  try {
    const { title, content, category, isPublished } = req.body;

    let post = await MonkPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check if the monk owns this post
    const userId = req.user._id || req.user.id;
    if (post.monk.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post'
      });
    }

    post = await MonkPost.findByIdAndUpdate(
      req.params.id,
      { title, content, category, isPublished },
      { new: true, runValidators: true }
    ).populate('monk', 'name photo monastery');

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      post
    });
  } catch (error) {
    console.error('Update monk post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating post',
      error: error.message
    });
  }
};

// @desc    Delete monk post
// @route   DELETE /api/monk-posts/:id
// @access  Private/Monk (own posts) or Admin
exports.deleteMonkPost = async (req, res) => {
  try {
    const post = await MonkPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check if the monk owns this post or user is admin
    const userId = req.user._id || req.user.id;
    if (post.monk.toString() !== userId.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post'
      });
    }

    await post.deleteOne();

    // Decrement monk's total posts count
    const monk = await Monk.findById(post.monk);
    if (monk && monk.totalPosts > 0) {
      monk.totalPosts -= 1;
      await monk.save();
    }

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete monk post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting post',
      error: error.message
    });
  }
};

// @desc    Like/Unlike monk post
// @route   POST /api/monk-posts/:id/like
// @access  Public
exports.likeMonkPost = async (req, res) => {
  try {
    const { userId } = req.body; // userId can be from auth or generated visitor ID

    const post = await MonkPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check if user already liked
    const alreadyLiked = post.likedBy.includes(userId);

    if (alreadyLiked) {
      // Unlike
      post.likedBy = post.likedBy.filter(id => id !== userId);
      post.likes = Math.max(0, post.likes - 1);
    } else {
      // Like
      post.likedBy.push(userId);
      post.likes += 1;
    }

    await post.save();

    res.status(200).json({
      success: true,
      likes: post.likes,
      isLiked: !alreadyLiked
    });
  } catch (error) {
    console.error('Like monk post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error liking post',
      error: error.message
    });
  }
};
