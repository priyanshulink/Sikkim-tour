import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FloatingChatbot from '../components/FloatingChatbot';
import { educationAPI } from '../services/api';

const SpinWheel = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await educationAPI.getAllCategories();
      const fetchedCategories = response.data.categories;
      setCategories(fetchedCategories);
      
      // Auto-select Monasteries category by default
      const monasteriesCategory = fetchedCategories.find(cat => cat.name === 'Monasteries');
      if (monasteriesCategory) {
        setSelectedCategory(monasteriesCategory._id);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSpin = async () => {
    if (spinning) return;

    setSpinning(true);
    setResult(null);
    setShowResult(false);

    // Spin animation - more dramatic rotation
    const spins = 7 + Math.random() * 5; // 7-12 full rotations
    const newRotation = rotation + (360 * spins);
    setRotation(newRotation);

    // Wait for animation
    setTimeout(async () => {
      try {
        const params = selectedCategory ? { type: 'spin', category: selectedCategory } : { type: 'spin' };
        const response = await educationAPI.getRandomContent(params);
        
        if (response.data.content) {
          setResult(response.data.content);
          setTimeout(() => setShowResult(true), 300);
        } else {
          alert('No content found for this category. Please try another category.');
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        const errorMessage = error.response?.data?.message || 'Failed to fetch content. Please try again.';
        alert(errorMessage);
      } finally {
        setSpinning(false);
      }
    }, 4000);
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
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 20px',
          position: 'relative',
          zIndex: 1
        }}>
          
          {/* Header */}
          <button
            onClick={() => navigate('/learn')}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              color: '#667eea',
              padding: '12px 28px',
              borderRadius: '30px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '30px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>←</span> Back to Learn Home
          </button>

          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h1 style={{
              fontSize: '3.5rem',
              color: 'black',
              marginBottom: '15px',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              fontWeight: 'bold'
            }}>
              🎡 Sacred Monastery Wheel
            </h1>
            <p style={{
              fontSize: '1.3rem',
              color: 'black',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Spin the wheel to discover the sacred monasteries of Sikkim
            </p>
          </div>

          {/* Category Filter */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '25px',
            marginBottom: '50px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <label style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '1.5rem' }}>🏷️</span>
              Choose a topic:
            </label>
            <div style={{
              display: 'flex',
              gap: '15px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '30px',
                  border: selectedCategory === null ? 'none' : '2px solid rgba(255,255,255,0.5)',
                  background: selectedCategory === null 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    : 'rgba(255,255,255,0.7)',
                  color: selectedCategory === null ? 'white' : '#666',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: selectedCategory === null ? '0 4px 15px rgba(102, 126, 234, 0.4)' : 'none',
                  fontSize: '1rem'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== null) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  if (selectedCategory !== null) {
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                All Topics
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setSelectedCategory(cat._id)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '30px',
                    border: selectedCategory === cat._id ? 'none' : '2px solid rgba(255,255,255,0.5)',
                    background: selectedCategory === cat._id ? cat.color : 'rgba(255,255,255,0.7)',
                    color: selectedCategory === cat._id ? 'white' : '#666',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: selectedCategory === cat._id ? `0 4px 15px ${cat.color}66` : 'none',
                    fontSize: '1rem'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== cat._id) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    if (selectedCategory !== cat._id) {
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Spin Wheel */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '50px',
            position: 'relative'
          }}>
            {/* Pointer Arrow */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '4rem',
              zIndex: 10,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
              animation: spinning ? 'bounce 0.5s ease-in-out infinite' : 'none'
            }}>
              ⬇️
            </div>

            {/* Wheel Container */}
            <div style={{
              position: 'relative',
              width: '400px',
              height: '400px'
            }}>
              {/* Wheel Segments */}
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #ff9a56 0deg 60deg, #ff6a88 60deg 120deg, #667eea 120deg 180deg, #28a745 180deg 240deg, #764ba2 240deg 300deg, #ff9a56 300deg 360deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: spinning 
                  ? '0 0 60px rgba(255, 154, 86, 0.8), 0 0 100px rgba(102, 126, 234, 0.6)' 
                  : '0 20px 60px rgba(0,0,0,0.4)',
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                position: 'relative',
                border: '8px solid rgba(255,255,255,0.9)'
              }}>
                {/* Monastery Icons on Wheel */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${angle + 30}deg) translateY(-140px)`,
                      fontSize: '2.5rem',
                      textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                    }}
                  >
                    🏯
                  </div>
                ))}

                {/* Center Circle */}
                <div style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.2), 0 4px 20px rgba(0,0,0,0.3)',
                  border: '5px solid rgba(255,255,255,0.8)',
                  zIndex: 5
                }}>
                  <div style={{ 
                    animation: spinning ? 'pulse 0.8s ease-in-out infinite' : 'none' 
                  }}>
                    {spinning ? '✨' : '🎯'}
                  </div>
                  {spinning && (
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#667eea',
                      fontWeight: 'bold',
                      marginTop: '10px'
                    }}>
                      Spinning...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Spin Button */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <button
              onClick={handleSpin}
              disabled={spinning}
              style={{
                padding: '25px 70px',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: 'white',
                background: spinning 
                  ? 'linear-gradient(135deg, #999 0%, #666 100%)' 
                  : 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 50%, #667eea 100%)',
                border: 'none',
                borderRadius: '60px',
                cursor: spinning ? 'not-allowed' : 'pointer',
                boxShadow: spinning 
                  ? '0 10px 30px rgba(0,0,0,0.3)' 
                  : '0 15px 40px rgba(255, 154, 86, 0.5)',
                transition: 'all 0.3s',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!spinning) {
                  e.currentTarget.style.transform = 'scale(1.08) translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(255, 154, 86, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = spinning 
                  ? '0 10px 30px rgba(0,0,0,0.3)' 
                  : '0 15px 40px rgba(255, 154, 86, 0.5)';
              }}
            >
              {spinning ? (
                <>
                  <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>🎡</span>
                  {' '}Spinning Magic...
                </>
              ) : (
                <>🎡 SPIN THE WHEEL</>
              )}
            </button>
            {!spinning && !result && (
              <p style={{
                marginTop: '20px',
                color: 'rgba(255,255,255,0.9)',
                fontSize: '1.1rem',
                fontStyle: 'italic',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                ✨ Click to discover a sacred monastery ✨
              </p>
            )}
          </div>

          {/* Result */}
          {result && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.98)',
              borderRadius: '30px',
              padding: '0',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              animation: showResult ? 'slideUp 0.6s ease-out' : 'none',
              overflow: 'hidden',
              border: '3px solid rgba(255, 255, 255, 0.5)'
            }}>
              {/* Header Section with Monastery Icon */}
              <div style={{
                background: `linear-gradient(135deg, ${result.category?.color || '#ff9a56'} 0%, ${result.category?.color || '#ff9a56'}dd 100%)`,
                padding: '30px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  fontSize: '10rem',
                  opacity: '0.15',
                  transform: 'rotate(15deg)'
                }}>
                  🏯
                </div>
                
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: result.category?.color || '#ff9a56',
                  padding: '10px 25px',
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}>
                  {result.category?.icon} {result.category?.name}
                </div>

                <h2 style={{
                  fontSize: '3rem',
                  color: 'white',
                  marginBottom: '10px',
                  textShadow: '0 4px 15px rgba(0,0,0,0.3)',
                  fontWeight: 'bold',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {result.title}
                </h2>

                <div style={{
                  display: 'flex',
                  gap: '20px',
                  flexWrap: 'wrap',
                  marginTop: '15px',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    padding: '10px 20px',
                    borderRadius: '20px',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1rem'
                  }}>
                    🕉️ Sacred Site
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    padding: '10px 20px',
                    borderRadius: '20px',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1rem'
                  }}>
                    🙏 Buddhist Heritage
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    padding: '10px 20px',
                    borderRadius: '20px',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1rem'
                  }}>
                    ⛰️ Sikkim
                  </div>
                </div>
              </div>

              {/* Image Section */}
              {result.image && (
                <div style={{
                  width: '100%',
                  height: '500px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <img
                    src={result.image}
                    alt={result.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    height: '100px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)'
                  }} />
                </div>
              )}

              {/* Description Section */}
              <div style={{
                padding: '40px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '25px'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${result.category?.color || '#ff9a56'}, ${result.category?.color || '#ff9a56'}dd)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                  }}>
                    📖
                  </div>
                  <h3 style={{
                    fontSize: '1.8rem',
                    color: '#2c3e50',
                    margin: '0',
                    fontWeight: 'bold'
                  }}>
                    About This Monastery
                  </h3>
                </div>

                <p style={{
                  fontSize: '1.3rem',
                  color: '#555',
                  lineHeight: '2',
                  marginBottom: '30px',
                  textAlign: 'justify'
                }}>
                  {result.description}
                </p>

                {/* Fun Facts Section */}
                <div style={{
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                  borderRadius: '20px',
                  padding: '25px',
                  marginTop: '30px'
                }}>
                  <h4 style={{
                    fontSize: '1.5rem',
                    color: '#2c3e50',
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span>💡</span> Did You Know?
                  </h4>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#666',
                    lineHeight: '1.8',
                    margin: '0'
                  }}>
                    Monasteries in Sikkim are not just religious centers but also serve as cultural hubs, 
                    preserving ancient Buddhist traditions, arts, and wisdom passed down through generations.
                  </p>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '20px',
                  marginTop: '35px',
                  justifyContent: 'center'
                }}>
                  <button
                    onClick={handleSpin}
                    style={{
                      padding: '15px 40px',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      color: 'white',
                      background: `linear-gradient(135deg, ${result.category?.color || '#ff9a56'} 0%, ${result.category?.color || '#ff9a56'}dd 100%)`,
                      border: 'none',
                      borderRadius: '30px',
                      cursor: 'pointer',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
                    }}
                  >
                    🎡 Spin Again
                  </button>
                  <button
                    onClick={() => navigate('/monasteries')}
                    style={{
                      padding: '15px 40px',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      color: result.category?.color || '#ff9a56',
                      background: 'white',
                      border: `2px solid ${result.category?.color || '#ff9a56'}`,
                      borderRadius: '30px',
                      cursor: 'pointer',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.background = result.category?.color || '#ff9a56';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.color = result.category?.color || '#ff9a56';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                    }}
                  >
                    🏯 Explore All Monasteries
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(50px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(5deg);
            }
          }

          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
          }

          @keyframes bounce {
            0%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            50% {
              transform: translateX(-50%) translateY(-10px);
            }
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
};

export default SpinWheel;
