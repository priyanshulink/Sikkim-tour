import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FloatingChatbot from '../components/FloatingChatbot';
import { educationAPI } from '../services/api';

const EducationHome = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await educationAPI.getAllCategories();
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      title: 'Spin the Wheel',
      description: 'Spin to discover random facts about Sikkim\'s culture, monasteries, and heritage',
      icon: '🎡',
      path: '/learn/spin',
      color: '#ff9a56'
    },
    {
      title: 'Flash Cards',
      description: 'Learn through interactive flash cards with beautiful visuals and detailed explanations',
      icon: '🃏',
      path: '/learn/flashcards',
      color: '#667eea'
    },
    {
      title: 'Quiz Time',
      description: 'Test your knowledge and learn fascinating facts about Sikkim',
      icon: '🧠',
      path: '/learn/quiz',
      color: '#28a745'
    }
  ];

  return (
    <>
      <Navbar />
      <FloatingChatbot />
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        paddingTop: '80px',
        paddingBottom: '60px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          
          {/* Hero Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <h1 style={{
              fontSize: '3.5rem',
              color: '#2c3e50',
              marginBottom: '20px',
              fontWeight: 'bold'
            }}>
              📚 Learn Sikkim
            </h1>
            <p style={{
              fontSize: '1.4rem',
              color: '#666',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.8'
            }}>
              Discover the rich heritage, culture, and natural beauty of Sikkim through interactive learning experiences
            </p>
          </div>

          {/* Learning Features */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginBottom: '60px'
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => navigate(feature.path)}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '40px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '3px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
                  e.currentTarget.style.borderColor = feature.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '20px'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.8rem',
                  color: '#2c3e50',
                  marginBottom: '15px',
                  fontWeight: 'bold'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Categories Section */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              color: '#2c3e50',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Explore Topics
            </h2>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>⏳</div>
                <p>Loading categories...</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
              }}>
                {categories.map((category) => (
                  <div
                    key={category._id}
                    onClick={() => {
                      // Special handling for Monasteries - redirect directly
                      if (category.name === 'Monasteries') {
                        navigate('/monasteries');
                      } else {
                        // For other categories, navigate to category content page
                        navigate(`/learn/category/${category._id}`);
                      }
                    }}
                    style={{
                      background: category.color || '#667eea',
                      color: 'white',
                      borderRadius: '15px',
                      padding: '30px 20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
                      {category.icon}
                    </div>
                    <h4 style={{
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      marginBottom: '10px'
                    }}>
                      {category.name}
                    </h4>
                    <p style={{
                      fontSize: '0.95rem',
                      opacity: 0.9
                    }}>
                      {category.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default EducationHome;
