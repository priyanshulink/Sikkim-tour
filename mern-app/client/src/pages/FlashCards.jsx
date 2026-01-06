import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FloatingChatbot from '../components/FloatingChatbot';
import { educationAPI } from '../services/api';

const FlashCards = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlashCards();
  }, []);

  const fetchFlashCards = async () => {
    try {
      const response = await educationAPI.getContent({ type: 'flashcard' });
      setCards(response.data.content);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 300);
  };

  const handlePrevious = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 300);
  };

  const currentCard = cards[currentIndex];

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
          maxWidth: '900px',
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

          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{
              fontSize: '3rem',
              color: '#2c3e50',
              marginBottom: '15px'
            }}>
              🃏 Flash Cards
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#666'
            }}>
              Click the card to flip and learn!
            </p>
          </div>

          {loading ? (
            <div style={{
              textAlign: 'center',
              padding: '100px 20px',
              color: '#666'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>⏳</div>
              <p style={{ fontSize: '1.2rem' }}>Loading flash cards...</p>
            </div>
          ) : cards.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '100px 20px',
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📚</div>
              <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>No Flash Cards Available</h2>
              <p style={{ color: '#666', fontSize: '1.1rem' }}>
                Check back later for new content!
              </p>
            </div>
          ) : (
            <>
              {/* Card Counter */}
              <div style={{
                textAlign: 'center',
                marginBottom: '20px',
                fontSize: '1.1rem',
                color: '#666',
                fontWeight: 'bold'
              }}>
                Card {currentIndex + 1} of {cards.length}
              </div>

              {/* Flash Card */}
              <div
                style={{
                  perspective: '1000px',
                  marginBottom: '30px'
                }}
              >
                <div
                  onClick={handleFlip}
                  style={{
                    width: '100%',
                    height: '500px',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
                    cursor: 'pointer'
                  }}
                >
                  {/* Front of Card */}
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    background: 'white',
                    borderRadius: '20px',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                  }}>
                    {/* Category Badge */}
                    <div style={{
                      background: currentCard?.category?.color || '#667eea',
                      color: 'white',
                      padding: '15px 30px',
                      textAlign: 'center',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>
                      {currentCard?.category?.icon} {currentCard?.category?.name}
                    </div>

                    {/* Image */}
                    {currentCard?.image && (
                      <div style={{
                        flex: 1,
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#f5f5f5'
                      }}>
                        <img
                          src={currentCard.image}
                          alt={currentCard.title}
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                    )}

                    {/* Title */}
                    <div style={{
                      padding: '30px',
                      textAlign: 'center'
                    }}>
                      <h2 style={{
                        fontSize: '2rem',
                        color: '#2c3e50',
                        marginBottom: '15px'
                      }}>
                        {currentCard?.title}
                      </h2>
                      <p style={{
                        fontSize: '1.1rem',
                        color: '#667eea',
                        fontWeight: 'bold'
                      }}>
                        👆 Click to flip
                      </p>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    background: 'white',
                    borderRadius: '20px',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
                    transform: 'rotateY(180deg)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '40px',
                    justifyContent: 'center',
                    overflow: 'auto'
                  }}>
                    <div style={{
                      display: 'inline-block',
                      background: currentCard?.category?.color || '#667eea',
                      color: 'white',
                      padding: '8px 20px',
                      borderRadius: '25px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      marginBottom: '25px',
                      alignSelf: 'flex-start'
                    }}>
                      {currentCard?.category?.icon} {currentCard?.category?.name}
                    </div>

                    <h2 style={{
                      fontSize: '2rem',
                      color: '#2c3e50',
                      marginBottom: '25px'
                    }}>
                      {currentCard?.title}
                    </h2>

                    <p style={{
                      fontSize: '1.2rem',
                      color: '#555',
                      lineHeight: '1.8'
                    }}>
                      {currentCard?.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px'
              }}>
                <button
                  onClick={handlePrevious}
                  style={{
                    padding: '15px 40px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: 'white',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  ← Previous
                </button>

                <button
                  onClick={handleNext}
                  style={{
                    padding: '15px 40px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: 'white',
                    background: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Next →
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
};

export default FlashCards;
