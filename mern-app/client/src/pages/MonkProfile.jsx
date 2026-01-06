import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FloatingChatbot from '../components/FloatingChatbot';
import MonkPostCard from '../components/MonkPostCard';
import { monkAPI } from '../services/api';

const MonkProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [monk, setMonk] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchMonkData();
  }, [id]);

  const fetchMonkData = async () => {
    try {
      setLoading(true);
      const [monkResponse, postsResponse] = await Promise.all([
        monkAPI.getMonkById(id),
        monkAPI.getMonkPosts(id)
      ]);

      setMonk(monkResponse.data.monk);
      setPosts(postsResponse.data.posts);
      setError(null);
    } catch (error) {
      console.error('Error fetching monk data:', error);
      setError('Failed to load monk profile. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getFilteredPosts = () => {
    if (activeFilter === 'all') return posts;
    return posts.filter(post => post.category === activeFilter);
  };

  const categories = [
    { value: 'all', label: 'All Posts', emoji: '📚' },
    { value: 'teaching', label: 'Teachings', emoji: '📖' },
    { value: 'daily_routine', label: 'Daily Routine', emoji: '🌅' },
    { value: 'discipline', label: 'Discipline', emoji: '🧘' },
    { value: 'meditation', label: 'Meditation', emoji: '🕉️' },
    { value: 'silence', label: 'Silence', emoji: '🤫' },
    { value: 'compassion', label: 'Compassion', emoji: '❤️' },
    { value: 'wisdom', label: 'Wisdom', emoji: '💡' }
  ];

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <video autoPlay muted loop style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -2
          }}>
            <source src="/video/background_vid.mp4" type="video/mp4" />
          </video>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            zIndex: -1
          }}></div>
          <div style={{
            textAlign: 'center',
            color: 'white',
            fontSize: '1.5rem',
            background: 'rgba(0,0,0,0.5)',
            padding: '40px',
            borderRadius: '20px'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🕉️</div>
            <p>Loading monk profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !monk) {
    return (
      <>
        <Navbar />
        <div style={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <video autoPlay muted loop style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -2
          }}>
            <source src="/video/background_vid.mp4" type="video/mp4" />
          </video>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            zIndex: -1
          }}></div>
          <div style={{
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '60px 40px',
            borderRadius: '20px',
            maxWidth: '500px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>⚠️</div>
            <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>Error</h2>
            <p style={{ color: '#666', marginBottom: '25px' }}>
              {error || 'Monk not found'}
            </p>
            <button
              onClick={() => navigate('/monks')}
              style={{
                padding: '12px 30px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Back to Monks List
            </button>
          </div>
        </div>
      </>
    );
  }

  const filteredPosts = getFilteredPosts();

  return (
    <>
      <Navbar />
      
      <div style={{
        minHeight: '100vh',
        position: 'relative',
        paddingTop: '80px',
        paddingBottom: '60px'
      }}>
        <video autoPlay muted loop style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -2
        }}>
          <source src="/video/background_vid.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.5)',
          zIndex: -1
        }}></div>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          
          {/* Back Button */}
          <button
            onClick={() => navigate('/monks')}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid white',
              color: 'white',
              padding: '12px 25px',
              borderRadius: '30px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '30px',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'translateX(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            ← Back to All Monks
          </button>

          {/* Monk Profile Header */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '50px',
            marginBottom: '40px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            display: 'flex',
            gap: '40px',
            alignItems: 'flex-start',
            flexWrap: 'wrap'
          }}>
            {/* Photo */}
            <div style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '6px solid #667eea',
              boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
              flexShrink: 0
            }}>
              <img
                src={(monk.photo && monk.photo.trim()) ? monk.photo : `https://ui-avatars.com/api/?name=${encodeURIComponent(monk.name)}&background=667eea&color=fff&size=300`}
                alt={monk.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(monk.name)}&background=667eea&color=fff&size=300`;
                }}
              />
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h1 style={{
                fontSize: '2.8rem',
                color: '#2c3e50',
                marginBottom: '15px',
                fontWeight: 'bold'
              }}>
                {monk.name}
              </h1>

              <div style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '10px 25px',
                borderRadius: '25px',
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '25px',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
              }}>
                🏛️ {monk.monastery}
              </div>

              <p style={{
                color: '#555',
                fontSize: '1.15rem',
                lineHeight: '1.8',
                marginBottom: '25px'
              }}>
                {monk.bio}
              </p>

              <div style={{
                display: 'flex',
                gap: '25px',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#667eea',
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>📝</span>
                  <span>{monk.totalPosts || 0} Posts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div style={{
            marginBottom: '30px',
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveFilter(category.value)}
                style={{
                  padding: '12px 25px',
                  borderRadius: '25px',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: activeFilter === category.value
                    ? 'white'
                    : 'rgba(255, 255, 255, 0.2)',
                  color: activeFilter === category.value ? '#667eea' : 'white',
                  backdropFilter: 'blur(10px)',
                  boxShadow: activeFilter === category.value
                    ? '0 5px 15px rgba(0,0,0,0.2)'
                    : 'none'
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== category.value) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== category.value) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  }
                }}
              >
                {category.emoji} {category.label}
              </button>
            ))}
          </div>

          {/* Posts Section */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            {filteredPosts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#666'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📝</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#2c3e50' }}>
                  No Posts Yet
                </h3>
                <p style={{ fontSize: '1.1rem' }}>
                  {activeFilter === 'all'
                    ? 'This monk hasn\'t shared any teachings yet.'
                    : `No posts in the ${categories.find(c => c.value === activeFilter)?.label} category.`}
                </p>
              </div>
            ) : (
              <>
                <div style={{
                  textAlign: 'center',
                  marginBottom: '30px',
                  color: '#667eea',
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}>
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'Post' : 'Posts'}
                  {activeFilter !== 'all' && ` in ${categories.find(c => c.value === activeFilter)?.label}`}
                </div>

                {filteredPosts.map((post) => (
                  <MonkPostCard key={post._id} post={post} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      
      <FloatingChatbot />
    </>
  );
};

export default MonkProfile;
