import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { storyAPI, analyticsAPI, authAPI } from '../services/api';
import Navbar from '../components/Navbar';
import FloatingChatbot from '../components/FloatingChatbot';

const UserDashboard = () => {
  const { user, setUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [myStories, setMyStories] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    monastery: '',
    type: 'story'
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchStats();
    fetchMyStories();
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const response = await analyticsAPI.getUserStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchMyStories = async () => {
    try {
      const response = await storyAPI.getMyStories();
      setMyStories(response.data.stories);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('content', formData.content);
    submitData.append('monastery', formData.monastery);
    submitData.append('type', formData.type);
    if (file) {
      submitData.append('media', file);
    }

    try {
      await storyAPI.createStory(submitData);
      const message = user?.role === 'Monk' 
        ? 'Educational content posted successfully!' 
        : 'Story submitted successfully! Awaiting admin approval.';
      alert(message);
      setShowUploadForm(false);
      setFormData({ title: '', content: '', monastery: '', type: 'story' });
      setFile(null);
      fetchMyStories();
      fetchStats();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit story');
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    const updateData = new FormData();
    updateData.append('name', profileData.name);
    updateData.append('email', profileData.email);
    if (avatarFile) {
      updateData.append('avatar', avatarFile);
    }

    try {
      const response = await authAPI.updateProfile(updateData);
      alert('Profile updated successfully!');
      setUser(response.data.user);
      setShowProfileForm(false);
      setAvatarFile(null);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const isMonk = user?.role === 'Monk';

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          <div style={{
            background: isMonk ? 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '30px',
            borderRadius: '15px',
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid white',
                background: 'white'
              }}>
                <img
                  src={user?.avatar ? (user.avatar.startsWith('http') ? user.avatar : `${window.location.origin}${user.avatar}`) : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=667eea&color=fff&size=200`}
                  alt={user?.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=667eea&color=fff&size=200`;
                  }}
                />
              </div>
              <div>
                <h1 style={{ margin: 0, marginBottom: '10px' }}>
                  {isMonk ? 'Monk Dashboard' : 'User Dashboard'}
                </h1>
                <p style={{ margin: 0, opacity: 0.9 }}>
                  Welcome, {user?.name}! {isMonk && '🙏 Share teachings and monastery insights'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowProfileForm(!showProfileForm)}
              style={{
                padding: '10px 20px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid white',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {showProfileForm ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* Profile Update Form */}
          {showProfileForm && (
            <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
              <h2>Update Profile</h2>
              <form onSubmit={handleProfileUpdate}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatarFile(e.target.files[0])}
                    style={{ width: '100%', padding: '10px' }}
                  />
                  {avatarFile && (
                    <p style={{ marginTop: '10px', color: '#28a745' }}>✓ New profile picture selected</p>
                  )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                  />
                </div>

                <button type="submit" style={{ width: '100%', padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Update Profile
                </button>
              </form>
            </div>
          )}

          {/* Stats Cards */}
          {stats && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#007bff' }}>{stats.contributions.stories}</h3>
                <p>Stories Shared</p>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#28a745' }}>{stats.stories.approved}</h3>
                <p>Approved</p>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#ffc107' }}>{stats.stories.pending}</h3>
                <p>Pending</p>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#17a2b8' }}>{stats.itineraries}</h3>
                <p>Itineraries</p>
              </div>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            style={{
              padding: '12px 24px',
              background: isMonk ? '#ff6a88' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '30px'
            }}
          >
            {showUploadForm ? 'Cancel' : (isMonk ? 'Post Educational Content' : 'Share Your Experience')}
          </button>

          {/* Upload Form */}
          {showUploadForm && (
            <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
              <h2>{isMonk ? 'Share Monastery Teachings' : 'Share Your Experience'}</h2>
              {isMonk && (
                <div style={{
                  background: '#fff3cd',
                  padding: '15px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  borderLeft: '4px solid #ffc107'
                }}>
                  <p style={{ margin: 0, color: '#856404' }}>
                    <strong>📿 Monk Note:</strong> Your educational content will be automatically approved and published immediately.
                  </p>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                  >
                    <option value="story">Story</option>
                    <option value="photo">Photo</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Monastery</label>
                  <input
                    type="text"
                    value={formData.monastery}
                    onChange={(e) => setFormData({ ...formData, monastery: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                    rows="5"
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                  />
                </div>

                {(formData.type === 'photo' || formData.type === 'video') && (
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Upload File</label>
                    <input
                      type="file"
                      accept={formData.type === 'photo' ? 'image/*' : 'video/*'}
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ width: '100%', padding: '10px' }}
                    />
                  </div>
                )}

                <button type="submit" style={{ width: '100%', padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Submit
                </button>
              </form>
            </div>
          )}

          {/* My Stories */}
          <h2 style={{ marginBottom: '20px' }}>My Contributions</h2>
          <div style={{ display: 'grid', gap: '20px' }}>
            {myStories.length === 0 ? (
              <p>No contributions yet. Share your first experience!</p>
            ) : (
              myStories.map((story) => (
                <div key={story._id} style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <h3>{story.title}</h3>
                  <p><strong>Status:</strong> <span style={{ color: story.status === 'approved' ? '#28a745' : story.status === 'pending' ? '#ffc107' : '#dc3545' }}>{story.status.toUpperCase()}</span></p>
                  <p><strong>Monastery:</strong> {story.monastery}</p>
                  <p>{story.content}</p>
                  {story.rejectionReason && (
                    <p style={{ color: '#dc3545' }}><strong>Rejection Reason:</strong> {story.rejectionReason}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      <FloatingChatbot />
    </>
  );
};

export default UserDashboard;
