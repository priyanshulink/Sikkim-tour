import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FloatingChatbot from '../components/FloatingChatbot';
import { educationAPI } from '../services/api';

const CategoryContent = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryContent();
  }, [categoryId]);

  const fetchCategoryContent = async () => {
    try {
      // Fetch all categories to find the current one
      const categoriesResponse = await educationAPI.getAllCategories();
      const currentCategory = categoriesResponse.data.categories.find(cat => cat._id === categoryId);
      setCategory(currentCategory);

      // Fetch content for this category
      const contentResponse = await educationAPI.getContent({ category: categoryId });
      setContents(contentResponse.data.content);
    } catch (error) {
      console.error('Error fetching category content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = (content) => {
    // Special handling for Monasteries category - redirect to monastery section
    if (category?.name === 'Monasteries') {
      navigate('/monasteries');
    } else {
      // For other categories, you can show the content in a modal or detailed view
      alert(`${content.title || content.question}\n\n${content.description || content.explanation}`);
    }
  };

  return (
    <>
      <Navbar />
      <FloatingChatbot />
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        paddingTop: '80px',
        paddingBottom: '60px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          fontSize: '5rem',
          opacity: '0.3',
          animation: 'float 6s ease-in-out infinite'
        }}>🏯</div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          fontSize: '4rem',
          opacity: '0.3',
          animation: 'float 8s ease-in-out infinite'
        }}>🕉️</div>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '2%',
          fontSize: '3rem',
          opacity: '0.3',
          animation: 'float 7s ease-in-out infinite'
        }}>🙏</div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          position: 'relative',
          zIndex: 1
        }}>
          
          {/* Header */}
          <button
            onClick={() => navigate('/learn')}
            style={{
              background: 'white',
              border: '2px solid #667eea',
              color: '#667eea',
              padding: '10px 20px',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '30px'
            }}
          >
            ← Back to Learn Home
          </button>

          {loading ? (
            <div style={{
              textAlign: 'center',
              padding: '100px 20px',
              color: '#666'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>⏳</div>
              <p style={{ fontSize: '1.2rem' }}>Loading content...</p>
            </div>
          ) : (
            <>
              {/* Category Header */}
              <div style={{
                textAlign: 'center',
                marginBottom: '50px',
                background: category?.color || '#667eea',
                borderRadius: '20px',
                padding: '40px',
                color: 'white',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}>
                <div style={{ fontSize: '5rem', marginBottom: '15px' }}>
                  {category?.icon}
                </div>
                <h1 style={{
                  fontSize: '3rem',
                  marginBottom: '15px',
                  fontWeight: 'bold'
                }}>
                  {category?.name}
                </h1>
                <p style={{
                  fontSize: '1.3rem',
                  opacity: 0.95
                }}>
                  {category?.description}
                </p>
              </div>

              {/* Content Grid */}
              {contents.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  background: 'white',
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📚</div>
                  <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>No Content Available</h2>
                  <p style={{ color: '#666', fontSize: '1.1rem' }}>
                    Check back later for new content!
                  </p>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '30px'
                }}>
                  {contents.map((content) => (
                    <div
                      key={content._id}
                      onClick={() => handleRedirect(content)}
                      style={{
                        background: 'white',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: '3px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-10px)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
                        e.currentTarget.style.borderColor = category?.color || '#667eea';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                        e.currentTarget.style.borderColor = 'transparent';
                      }}
                    >
                      {/* Image */}
                      {content.image && (
                        <div style={{
                          width: '100%',
                          height: '200px',
                          overflow: 'hidden',
                          background: '#f5f5f5'
                        }}>
                          <img
                            src={content.image}
                            alt={content.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div style={{ padding: '25px' }}>
                        {/* Type Badge */}
                        <div style={{
                          display: 'inline-block',
                          background: category?.color || '#667eea',
                          color: 'white',
                          padding: '6px 15px',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: 'bold',
                          marginBottom: '15px'
                        }}>
                          {content.type === 'spin' ? '🎡 Spin' : content.type === 'flashcard' ? '🃏 Flashcard' : '🧠 Quiz'}
                        </div>

                        <h3 style={{
                          fontSize: '1.5rem',
                          color: '#2c3e50',
                          marginBottom: '12px',
                          fontWeight: 'bold'
                        }}>
                          {content.title || content.question}
                        </h3>
                        
                        <p style={{
                          fontSize: '1rem',
                          color: '#666',
                          lineHeight: '1.6',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {content.description || content.explanation}
                        </p>

                        {category?.name === 'Monasteries' && (
                          <div style={{
                            marginTop: '15px',
                            color: category?.color || '#667eea',
                            fontWeight: 'bold',
                            fontSize: '1rem'
                          }}>
                            Click to explore monasteries →
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </>
  );
};

export default CategoryContent;
