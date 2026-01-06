import React, { useState, useEffect } from 'react';
import { monkPostAPI } from '../services/api';

const MonkPostCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Get or create visitor ID
    let visitorId = localStorage.getItem('visitorId');
    if (!visitorId) {
      visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('visitorId', visitorId);
    }
    setUserId(visitorId);

    // Check if user already liked this post
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    setIsLiked(likedPosts.includes(post._id));
  }, [post._id]);

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      const response = await monkPostAPI.likeMonkPost(post._id, userId);
      setLikeCount(response.data.likes);
      setIsLiked(response.data.isLiked);

      // Update local storage
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      if (response.data.isLiked) {
        likedPosts.push(post._id);
      } else {
        const index = likedPosts.indexOf(post._id);
        if (index > -1) likedPosts.splice(index, 1);
      }
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };
  const getCategoryEmoji = (category) => {
    const emojiMap = {
      teaching: '📖',
      daily_routine: '🌅',
      discipline: '🧘',
      meditation: '🕉️',
      silence: '🤫',
      compassion: '❤️',
      wisdom: '💡',
      general: '✨'
    };
    return emojiMap[category] || '✨';
  };

  const getCategoryLabel = (category) => {
    const labelMap = {
      teaching: 'Teaching',
      daily_routine: 'Daily Routine',
      discipline: 'Discipline',
      meditation: 'Meditation',
      silence: 'Silence',
      compassion: 'Compassion',
      wisdom: 'Wisdom',
      general: 'General'
    };
    return labelMap[category] || 'General';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '15px',
      padding: '30px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
      border: '1px solid #f0f0f0',
      marginBottom: '20px',
      cursor: 'pointer'
    }}
    onClick={handleExpand}
    >
      {/* Category Badge */}
      <div style={{
        display: 'inline-block',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '6px 15px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '600',
        marginBottom: '15px'
      }}>
        {getCategoryEmoji(post.category)} {getCategoryLabel(post.category)}
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: '1.5rem',
        color: '#2c3e50',
        marginBottom: '15px',
        fontWeight: 'bold',
        lineHeight: '1.4'
      }}>
        {post.title}
      </h3>

      {/* Content */}
      <div style={{
        color: '#555',
        fontSize: '1.05rem',
        lineHeight: '1.8',
        marginBottom: '20px',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
      }}>
        {expanded ? post.content : post.content.substring(0, 150) + (post.content.length > 150 ? '...' : '')}
      </div>
      
      {/* Read More Button */}
      {post.content.length > 150 && (
        <div style={{
          color: '#667eea',
          fontSize: '0.95rem',
          fontWeight: '600',
          marginBottom: '15px'
        }}>
          {expanded ? '▼ Show Less' : '▶ Read More'}
        </div>
      )}

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '20px',
        borderTop: '2px solid #f5f5f5',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        {/* Date */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#999',
          fontSize: '0.9rem'
        }}>
          <span>📅</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {/* Like Button */}
          <button
            onClick={handleLike}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem',
              color: isLiked ? '#e74c3c' : '#999',
              transition: 'all 0.3s ease',
              padding: '5px 10px',
              borderRadius: '20px'
            }}
            onMouseEnter={(e) => e.target.style.background = '#f8f8f8'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            <span style={{ fontSize: '1.2rem' }}>{isLiked ? '❤️' : '🤍'}</span>
            <span style={{ fontWeight: '600' }}>{likeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonkPostCard;
