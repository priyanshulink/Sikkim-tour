import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { monkPostAPI, monkAPI } from '../services/api';
import Navbar from '../components/Navbar';
import FloatingChatbot from '../components/FloatingChatbot';

const MonkDashboard = () => {
  const { user, setUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'teaching'
  });
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    photo: user?.photo || '',
    bio: user?.bio || ''
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const categories = [
    { value: 'teaching', label: '📚 Teachings', icon: '📚', color: '#667eea' },
    { value: 'daily_routine', label: '📅 Daily Routine', icon: '📅', color: '#f093fb' },
    { value: 'discipline', label: '🕉️ Discipline', icon: '🕉️', color: '#fa709a' },
    { value: 'meditation', label: '☸️ Meditation', icon: '☸️', color: '#4facfe' },
    { value: 'silence', label: '🤫 Silence', icon: '🤫', color: '#f6d365' },
    { value: 'compassion', label: '❤️ Compassion', icon: '❤️', color: '#ff6b6b' },
    { value: 'wisdom', label: '💡 Wisdom', icon: '💡', color: '#feca57' },
    { value: 'general', label: '📝 General', icon: '📝', color: '#a29bfe' }
  ];

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      // Fetch posts by current monk ID
      const response = await monkAPI.getMonkPosts(user._id);
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingPost) {
        await monkPostAPI.updateMonkPost(editingPost._id, formData);
        alert('Post updated successfully!');
      } else {
        await monkPostAPI.createMonkPost(formData);
        alert('Post created successfully!');
      }
      
      setShowCreateModal(false);
      setEditingPost(null);
      setFormData({ title: '', content: '', category: 'teaching' });
      fetchMyPosts();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save post');
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      category: post.category
    });
    setShowCreateModal(true);
  };

  const handleDelete = async (postId, postTitle) => {
    if (window.confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      try {
        await monkPostAPI.deleteMonkPost(postId);
        alert('Post deleted successfully!');
        fetchMyPosts();
      } catch (error) {
        alert('Failed to delete post');
      }
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('name', profileData.name);
      formData.append('bio', profileData.bio);
      
      if (photoFile) {
        formData.append('photo', photoFile);
      }

      const response = await monkAPI.updateMonkProfile(formData);
      alert('Profile updated successfully!');
      setUser(response.data.monk);
      setShowProfileModal(false);
      setPhotoFile(null);
      setPhotoPreview(null);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCategoryInfo = (categoryValue) => {
    return categories.find(cat => cat.value === categoryValue) || categories[categories.length - 1];
  };

  return (
    <>
      <Navbar />
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        paddingTop: '80px',
        paddingBottom: '60px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          
          {/* Header */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            marginBottom: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {/* Profile Picture */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '4px solid #667eea',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
                onClick={() => {
                  setProfileData({
                    name: user?.name || '',
                    photo: user?.photo || '',
                    bio: user?.bio || ''
                  });
                  setPhotoFile(null);
                  setPhotoPreview(null);
                  setShowProfileModal(true);
                }}
                >
                  <img
                    src={(user?.photo && user?.photo.trim()) ? user?.photo : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Monk')}&background=667eea&color=fff&size=150`}
                    alt={user?.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Monk')}&background=667eea&color=fff&size=150`;
                    }}
                  />
                </div>

                <div>
                  <h1 style={{ margin: '0 0 10px', color: '#2c3e50', fontSize: '2.5rem' }}>
                    🙏 Monk Dashboard
                  </h1>
                  <p style={{ margin: 0, color: '#666', fontSize: '1.1rem' }}>
                    Welcome back, {user?.name}
                  </p>
                  <p style={{ margin: '5px 0 0', color: '#667eea', fontSize: '0.95rem', fontWeight: '600' }}>
                    🏛️ {user?.monastery || 'Monastery'}
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    setProfileData({
                      name: user?.name || '',
                      photo: user?.photo || '',
                      bio: user?.bio || ''
                    });
                    setPhotoFile(null);
                    setPhotoPreview(null);
                    setShowProfileModal(true);
                  }}
                  style={{
                    background: '#4facfe',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  👤 Edit Profile
                </button>

                <button
                  onClick={() => {
                    setEditingPost(null);
                    setFormData({ title: '', content: '', category: 'teaching' });
                    setShowCreateModal(true);
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  ✍️ Create New Post
                </button>
              </div>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginTop: '30px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '20px',
                borderRadius: '12px',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{posts.length}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total Posts</div>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                padding: '20px',
                borderRadius: '12px',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  {posts.reduce((sum, post) => sum + (post.likes || 0), 0)}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total Likes</div>
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{ margin: '0 0 30px', color: '#2c3e50' }}>My Posts</h2>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                Loading posts...
              </div>
            ) : posts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📝</div>
                <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>No posts yet</p>
                <p style={{ fontSize: '0.95rem' }}>Start sharing your teachings and wisdom with the community</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '20px' }}>
                {posts.map((post) => {
                  const categoryInfo = getCategoryInfo(post.category);
                  return (
                    <div
                      key={post._id}
                      style={{
                        border: '2px solid #e0e0e0',
                        borderRadius: '12px',
                        padding: '25px',
                        transition: 'all 0.3s',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = categoryInfo.color;
                        e.currentTarget.style.boxShadow = `0 4px 15px ${categoryInfo.color}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e0e0e0';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            display: 'inline-block',
                            background: categoryInfo.color,
                            color: 'white',
                            padding: '5px 15px',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            marginBottom: '10px'
                          }}>
                            {categoryInfo.icon} {categoryInfo.label.split(' ')[1]}
                          </div>
                          
                          <h3 style={{ margin: '0 0 10px', color: '#2c3e50', fontSize: '1.4rem' }}>
                            {post.title}
                          </h3>
                          
                          <p style={{
                            color: '#666',
                            fontSize: '0.95rem',
                            lineHeight: '1.6',
                            marginBottom: '15px',
                            maxHeight: '60px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {post.content}
                          </p>
                          
                          <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', color: '#999' }}>
                            <span>❤️ {post.likes || 0} likes</span>
                            <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '10px', marginLeft: '20px' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(post);
                            }}
                            style={{
                              background: '#4facfe',
                              color: 'white',
                              border: 'none',
                              padding: '8px 16px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '0.9rem',
                              fontWeight: '600'
                            }}
                          >
                            ✏️ Edit
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(post._id, post.title);
                            }}
                            style={{
                              background: '#dc3545',
                              color: 'white',
                              border: 'none',
                              padding: '8px 16px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '0.9rem',
                              fontWeight: '600'
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create/Edit Post Modal */}
      {showCreateModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '20px',
            overflow: 'auto'
          }}
          onClick={() => {
            setShowCreateModal(false);
            setEditingPost(null);
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ margin: '0 0 30px', color: '#2c3e50', textAlign: 'center' }}>
              {editingPost ? '✏️ Edit Post' : '✍️ Create New Post'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              {/* Category Selection */}
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '12px', fontWeight: 'bold', color: '#333', fontSize: '1.05rem' }}>
                  Category <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: '10px'
                }}>
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat.value })}
                      style={{
                        padding: '12px',
                        border: formData.category === cat.value ? `3px solid ${cat.color}` : '2px solid #e0e0e0',
                        borderRadius: '10px',
                        background: formData.category === cat.value ? `${cat.color}15` : 'white',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: formData.category === cat.value ? 'bold' : 'normal',
                        color: formData.category === cat.value ? cat.color : '#666',
                        transition: 'all 0.2s',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{cat.icon}</div>
                      <div>{cat.label.split(' ')[1]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                  Post Title <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter a compelling title for your post..."
                  required
                  maxLength={200}
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '10px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
                <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#999', marginTop: '5px' }}>
                  {formData.title.length}/200
                </div>
              </div>

              {/* Content */}
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                  Content <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Share your wisdom, teachings, and experiences..."
                  required
                  rows={12}
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '10px',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingPost(null);
                    setFormData({ title: '', content: '', category: 'teaching' });
                  }}
                  style={{
                    flex: 1,
                    padding: '15px',
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '15px'
                  }}
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '15px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                  }}
                >
                  {editingPost ? 'Update Post' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Edit Modal */}
      {showProfileModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '20px',
            overflow: 'auto'
          }}
          onClick={() => setShowProfileModal(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ margin: '0 0 30px', color: '#2c3e50', textAlign: 'center' }}>
              👤 Edit Profile
            </h2>
            
            {/* Profile Picture Preview */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #667eea',
                margin: '0 auto 15px',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
              }}>
                <img
                  src={photoPreview || (user?.photo && user?.photo.trim() ? user?.photo : `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name || 'Monk')}&background=667eea&color=fff&size=200`)}
                  alt={profileData.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name || 'Monk')}&background=667eea&color=fff&size=200`;
                  }}
                />
              </div>
              
              {/* Upload Button */}
              <label style={{
                display: 'inline-block',
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                📸 Choose Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                />
              </label>
              
              {photoFile && (
                <p style={{
                  fontSize: '0.85rem',
                  color: '#667eea',
                  marginTop: '10px',
                  fontWeight: '600'
                }}>
                  ✓ {photoFile.name}
                </p>
              )}
            </div>

            <form onSubmit={handleProfileUpdate}>
              {/* Name */}
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                  Name <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  placeholder="Your full name"
                  required
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '10px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Bio */}
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                  Biography <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  placeholder="Tell the community about yourself, your journey, and teachings..."
                  required
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '10px',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  style={{
                    flex: 1,
                    padding: '15px',
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '15px'
                  }}
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '15px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                  }}
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <FloatingChatbot />
    </>
  );
};

export default MonkDashboard;
