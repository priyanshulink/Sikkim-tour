import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FloatingChatbot from '../components/FloatingChatbot';
import MonkCard from '../components/MonkCard';
import { monkAPI } from '../services/api';

const MonksList = () => {
  const [monks, setMonks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMonks();
  }, []);

  const fetchMonks = async () => {
    try {
      setLoading(true);
      const response = await monkAPI.getAllMonks();
      setMonks(response.data.monks);
      setError(null);
    } catch (error) {
      console.error('Error fetching monks:', error);
      setError('Failed to load monks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      
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
          
          {/* Header Section */}
          <div style={{
            textAlign: 'center',
            background: 'white',
            padding: '60px 40px',
            borderRadius: '20px',
            marginBottom: '60px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            marginLeft: '-20px',
            marginRight: '-20px'
          }}>
            <h1 style={{
              fontSize: '3.5rem',
              marginBottom: '20px',
              fontWeight: 'bold',
              letterSpacing: '-1px',
              color: '#000000'
            }}>
              🙏 Monk's Life
            </h1>
            <p style={{
              fontSize: '1.4rem',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.6',
              fontWeight: '300',
              color: '#2c3e50'
            }}>
              Discover wisdom, teachings, and daily life experiences from monks dedicated to spiritual growth and enlightenment
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div style={{
              textAlign: 'center',
              padding: '100px 20px',
              color: '#667eea',
              fontSize: '1.3rem'
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '20px',
                animation: 'pulse 2s infinite'
              }}>
                🕉️
              </div>
              <p>Loading monks...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              color: '#e74c3c',
              fontSize: '1.2rem',
              maxWidth: '600px',
              margin: '0 auto',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>⚠️</div>
              <p>{error}</p>
              <button
                onClick={fetchMonks}
                style={{
                  marginTop: '20px',
                  padding: '12px 30px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && monks.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '100px 20px',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🙏</div>
              <h2 style={{
                fontSize: '2rem',
                marginBottom: '15px',
                color: '#2c3e50'
              }}>
                No Monks Yet
              </h2>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                color: '#666'
              }}>
                Monk profiles will appear here once they are added by the administrator.
              </p>
            </div>
          )}

          {/* Monks Grid */}
          {!loading && !error && monks.length > 0 && (
            <>
              <div style={{
                textAlign: 'center',
                color: '#000000',
                marginBottom: '30px',
                fontSize: '1.2rem',
                opacity: 0.9
              }}>
                <span style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '10px 25px',
                  borderRadius: '25px',
                  backdropFilter: 'blur(10px)',
                  fontWeight: '600',
                  color: '#000000'
                }}>
                  {monks.length} {monks.length === 1 ? 'Monk' : 'Monks'} Available
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '30px',
                marginTop: '40px'
              }}>
                {monks.map((monk) => (
                  <MonkCard key={monk._id} monk={monk} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      
      <FloatingChatbot />

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.7;
            }
          }
        `}
      </style>
    </>
  );
};

export default MonksList;
