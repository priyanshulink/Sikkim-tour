import React from 'react';
import Navbar from '../components/Navbar';
import FloatingChatbot from '../components/FloatingChatbot';
import { ExternalLink } from 'lucide-react';

// Monasteries with virtual tour links
const virtualTourMonasteries = [
  {
    name: "Rumtek Monastery",
    location: "Gangtok, East Sikkim",
    description: "The largest monastery in Sikkim; seat of the Karmapa Lama. Experience the grand architecture and spiritual atmosphere.",
    image: "img/RumtekMonastery.jpeg",
    tourUrl: "https://www.360easyvr.com/vr/9098?scene_id=25635",
    sect: "Kagyu",
    founded: "16th century (rebuilt in 1960s)"
  },
  {
    name: "Pemayangtse Monastery",
    location: "Pelling, West Sikkim",
    description: "Historic Nyingma monastery with stunning views of Kanchenjunga. Explore the ancient wooden structures and sacred halls.",
    image: "img/PemayangtseMonastery.jpeg",
    tourUrl: "https://www.360easyvr.com/vr/9096?scene_id=25712",
    sect: "Nyingma",
    founded: "1705"
  },
  {
    name: "Enchey Monastery",
    location: "Gangtok, East Sikkim",
    description: "Gangtok's famed Nyingma monastery with beautiful murals and peaceful surroundings.",
    image: "img/EncheyMonastery.jpeg",
    tourUrl: "https://www.360easyvr.com/vr/9098?scene_id=25635",
    sect: "Nyingma",
    founded: "1909"
  },
  {
    name: "Tashiding Monastery",
    location: "Near Yuksom, West Sikkim",
    description: "The holiest monastery in Sikkim. Virtual tour of sacred stupas and prayer halls on the hilltop.",
    image: "img/TashidingMonastery.jpeg",
    tourUrl: "https://www.360easyvr.com/vr/9098?scene_id=25635",
    sect: "Nyingma",
    founded: "1641"
  },
  {
    name: "Phodong Monastery",
    location: "North Sikkim",
    description: "18th-century Kagyu monastery famed for frescoes and festivals. Explore the intricate artwork and architecture.",
    image: "img/PhodongMonastery.jpg",
    tourUrl: "https://www.360easyvr.com/vr/9098?scene_id=25635",
    sect: "Kagyu",
    founded: "1740"
  },
  {
    name: "Ralong Monastery",
    location: "South Sikkim",
    description: "Known for the Kagyed Dance Festival. Experience the monastery's spiritual ambiance and beautiful surroundings.",
    image: "img/RalongMonastery.jpeg",
    tourUrl: "https://www.360easyvr.com/vr/9098?scene_id=25635",
    sect: "Kagyu",
    founded: "18th century"
  },
  {
    name: "Dubdi Monastery",
    location: "Yuksom, West Sikkim",
    description: "First monastery of Sikkim (1701). Take a virtual journey to this historic hilltop monastery.",
    image: "img/DubdiMonastery.jpeg",
    tourUrl: "https://www.360easyvr.com/vr/9098?scene_id=25635",
    sect: "Nyingma",
    founded: "1701"
  },
  {
    name: "Lachen Monastery",
    location: "Lachen, North Sikkim",
    description: "Ngodrub Choling (1858), spiritual center for Lachenpas. Explore the remote mountain monastery.",
    image: "img/Lachen_Monastery.jpeg",
    tourUrl: "https://www.360easyvr.com/vr/9098?scene_id=25635",
    sect: "Nyingma",
    founded: "1858"
  }
];

const VirtualTours = () => {
  const handleTourClick = (tourUrl) => {
    window.open(tourUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Navbar />
      
      <div style={{ paddingTop: '80px', paddingBottom: '60px', paddingLeft: '20px', paddingRight: '20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#1f2937', marginBottom: '15px' }}>
              360° Virtual Tours
            </h1>
            <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '700px', margin: '0 auto' }}>
              Experience immersive 360° virtual tours of Sikkim's beautiful monasteries from anywhere in the world
            </p>
          </div>

          {/* Monastery Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '30px',
            marginBottom: '40px'
          }}>
            {virtualTourMonasteries.map((monastery, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer'
                }}
                onClick={() => handleTourClick(monastery.tourUrl)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={monastery.image}
                    alt={monastery.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    backgroundColor: 'rgba(139, 92, 246, 0.9)',
                    color: 'white',
                    padding: '8px 15px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <ExternalLink size={14} />
                    360° Tour
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '25px' }}>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    marginBottom: '10px'
                  }}>
                    {monastery.name}
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    gap: '15px',
                    marginBottom: '15px',
                    fontSize: '13px',
                    color: '#6b7280'
                  }}>
                    <span style={{
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontWeight: '500'
                    }}>
                      {monastery.sect}
                    </span>
                    <span style={{
                      backgroundColor: '#dcfce7',
                      color: '#166534',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontWeight: '500'
                    }}>
                      {monastery.founded}
                    </span>
                  </div>

                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '15px',
                    lineHeight: '1.6'
                  }}>
                    📍 {monastery.location}
                  </p>

                  <p style={{
                    fontSize: '14px',
                    color: '#4b5563',
                    lineHeight: '1.6',
                    marginBottom: '20px'
                  }}>
                    {monastery.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#8b5cf6',
                    fontSize: '15px',
                    fontWeight: '600'
                  }}>
                    <span>Start Virtual Tour</span>
                    <ExternalLink size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '15px' }}>
              How to Experience Virtual Tours
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginTop: '30px'
            }}>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '36px', marginBottom: '10px' }}>🖱️</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>Click & Drag</h3>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>Use your mouse to look around in 360 degrees</p>
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '36px', marginBottom: '10px' }}>🔍</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>Zoom In/Out</h3>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>Use scroll wheel to zoom and explore details</p>
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '36px', marginBottom: '10px' }}>📱</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>Mobile Friendly</h3>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>Works on all devices including smartphones</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloatingChatbot />
    </div>
  );
};

export default VirtualTours;
