import React from 'react';
import { useNavigate } from 'react-router-dom';

const MonkCard = ({ monk }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/monks/${monk._id}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
        borderRadius: '20px',
        padding: '30px',
        cursor: 'pointer',
        transition: 'all 0.4s ease',
        boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
        textAlign: 'center',
        border: '1px solid #e0e0e0'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.3)';
        e.currentTarget.style.borderColor = '#667eea';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        e.currentTarget.style.borderColor = '#e0e0e0';
      }}
    >
      {/* Monk Photo */}
      <div style={{
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        margin: '0 auto 20px',
        overflow: 'hidden',
        border: '4px solid #667eea',
        boxShadow: '0 5px 15px rgba(102, 126, 234, 0.3)',
        background: '#e0e0e0'
      }}>
        <img
          src={(monk.photo && monk.photo.trim()) ? monk.photo : `https://ui-avatars.com/api/?name=${encodeURIComponent(monk.name)}&background=667eea&color=fff&size=200`}
          alt={monk.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(monk.name)}&background=667eea&color=fff&size=200`;
          }}
        />
      </div>

      {/* Monk Name */}
      <h3 style={{
        fontSize: '1.6rem',
        color: '#2c3e50',
        marginBottom: '10px',
        fontWeight: 'bold'
      }}>
        {monk.name}
      </h3>

      {/* Monastery Badge */}
      <div style={{
        display: 'inline-block',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '8px 20px',
        borderRadius: '20px',
        fontSize: '0.9rem',
        fontWeight: '600',
        marginBottom: '15px',
        boxShadow: '0 3px 10px rgba(102, 126, 234, 0.3)'
      }}>
        🏛️ {monk.monastery}
      </div>

      {/* Bio Preview */}
      <p style={{
        color: '#666',
        fontSize: '0.95rem',
        lineHeight: '1.6',
        marginBottom: '15px',
        height: '60px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical'
      }}>
        {monk.bio}
      </p>

      {/* Stats */}
      <div style={{
        marginTop: '20px',
        paddingTop: '20px',
        borderTop: '2px solid #f0f0f0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          color: '#667eea',
          fontWeight: 'bold',
          fontSize: '1rem'
        }}>
          <span>📝</span>
          <span>{monk.totalPosts || 0} Posts</span>
        </div>
      </div>

      {/* View Profile Button */}
      <div style={{
        marginTop: '20px'
      }}>
        <span style={{
          display: 'inline-block',
          color: '#667eea',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          padding: '10px 20px',
          border: '2px solid #667eea',
          borderRadius: '25px',
          transition: 'all 0.3s ease'
        }}>
          View Teachings →
        </span>
      </div>
    </div>
  );
};

export default MonkCard;
