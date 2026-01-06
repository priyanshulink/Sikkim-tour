import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import FloatingChatbot from '../components/FloatingChatbot';
import { storyAPI } from '../services/api';

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonastery, setSelectedMonastery] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Sikkim Monasteries with coordinates
  const monasteries = [
    {
      id: 1,
      name: 'Rumtek Monastery',
      lat: 27.305827,
      lng: 88.53637,
      description: 'The largest monastery in Sikkim, seat of the Karmapa Lama.',
      image: './img/RumtekMonastery.jpeg'
    },
    {
      id: 2,
      name: 'Pemayangtse Monastery',
      lat: 27.305,
      lng: 88.252,
      description: 'One of the oldest monasteries, founded in 1705, near Pelling.',
      image: './img/PemayangtseMonastery.jpeg'
    },
    {
      id: 3,
      name: 'Tashiding Monastery',
      lat: 27.3089,
      lng: 88.2979,
      description: 'Considered the holiest monastery in Sikkim, built in 1641.',
      image: './img/TashidingMonastery.jpeg'
    },
    {
      id: 4,
      name: 'Enchey Monastery',
      lat: 27.3359,
      lng: 88.6192,
      description: 'Located near Gangtok, famous for its religious festivals.',
      image: './img/EncheyMonastery.jpeg'
    },
    {
      id: 5,
      name: 'Phodong Monastery',
      lat: 27.416786,
      lng: 88.582944,
      description: 'Built in the 18th century, known for annual mask dance festivals.',
      image: './img/PhodongMonastery.jpg'
    },
    {
      id: 6,
      name: 'Ralong Monastery',
      lat: 27.325734,
      lng: 88.325734,
      description: 'A Kagyu sect monastery, known for its grand architecture.',
      image: './img/RalongMonastery.jpeg'
    },
    {
      id: 7,
      name: 'Labrang Monastery',
      lat: 27.418881,
      lng: 88.581438,
      description: 'Small but historic monastery near Phodong.',
      image: './img/LabrangMonastery.jpg'
    },
    {
      id: 8,
      name: 'Dubdi Monastery',
      lat: 27.366206,
      lng: 88.230086,
      description: 'Built in 1701, the oldest monastery in Sikkim, near Yuksom.',
      image: './img/DubdiMonastery.jpeg'
    },
    {
      id: 9,
      name: 'Kartok Monastery',
      lat: 27.33,
      lng: 88.62,
      description: 'Situated at Yuksom, dedicated to Kartok Lama.',
      image: './img/KartokMonastery.jpg'
    },
    {
      id: 10,
      name: 'Rinchenpong Monastery',
      lat: 27.2345,
      lng: 88.2721,
      description: 'Known for its beautiful sunset views over Kanchenjunga.',
      image: './img/rinchenpongmonastery.jpg'
    },
    {
      id: 11,
      name: 'Zong Dog Palri Fo-Brang Monastery',
      lat: 27.29,
      lng: 88.23,
      description: 'Also known as "Palace Monastery", located near Pemayangtse.',
      image: './img/ZangDhokPalriPhodang.jpg'
    },
    {
      id: 12,
      name: 'Sanga Choeling Monastery',
      lat: 27.29,
      lng: 88.23,
      description: 'Founded in 1697, accessible by a steep trek from Pelling.',
      image: './img/SangaChoelingMonastery.jpg'
    },
    {
      id: 13,
      name: 'Bongtang Monastery',
      lat: 27.3690385,
      lng: 88.6132007,
      description: 'Also known as Gonjang Monastery, established in 1981. It follows the Nyingma school of Tibetan Buddhism and is located near Tashi Viewpoint in Gangtok.',
      image: './img/BongtangMonastery.jpg'
    },
    {
      id: 14,
      name: 'Lingdum (Ranka) Monastery',
      lat: 27.3347,
      lng: 88.6416,
      description: 'A relatively new but very large monastery near Gangtok.',
      image: './img/Lingdum(Ranka)Monastery.jpg'
    },
    {
      id: 15,
      name: 'Gonjang Monastery',
      lat: 27.36908,
      lng: 88.613314,
      description: 'Located near Tashi View Point, built in 1981.',
      image: './img/GonjangMonastery.jpeg'
    }
  ];

  useEffect(() => {
    fetchApprovedContent();
    // Set default selected monastery
    setSelectedMonastery(monasteries[0]);
  }, []);

  useEffect(() => {
    if (selectedMonastery) {
      initializeMap();
    }
  }, [selectedMonastery]);

  const initializeMap = () => {
    if (window.google && window.google.maps && mapRef.current) {
      // Center of Sikkim
      const sikkimCenter = { lat: 27.5330, lng: 88.5122 };
      
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 10,
        center: sikkimCenter,
        mapTypeId: 'terrain',
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          }
        ]
      });

      mapInstanceRef.current = map;

      // Add markers for each monastery
      monasteries.forEach((monastery) => {
        const marker = new window.google.maps.Marker({
          position: { lat: monastery.lat, lng: monastery.lng },
          map: map,
          title: monastery.name,
          animation: window.google.maps.Animation.DROP,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
          }
        });

        // Info window for each marker
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="max-width: 250px;">
              <h4 style="margin: 0 0 10px 0; color: #667eea;">${monastery.name}</h4>
              <img src="${monastery.image}" alt="${monastery.name}" 
                   style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;"
                   onerror="this.style.display='none'">
              <p style="margin: 0; font-size: 14px; color: #555;">${monastery.description}</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
          // Update the right side container with clicked monastery details
          setSelectedMonastery(monastery);
        });
      });
    }
  };

  const fetchApprovedContent = async () => {
    try {
      const response = await storyAPI.getAllStories({ status: 'approved' });
      const approvedStories = response.data.stories;
      
      // Separate by type
      setPhotos(approvedStories.filter(story => story.type === 'photo'));
      setVideos(approvedStories.filter(story => story.type === 'video'));
      setStories(approvedStories.filter(story => story.type === 'story'));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching approved content:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <video autoPlay muted loop className="video-background">
          <source src="/video/background_vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content">
          <h1>Discover Have-In-Sikkim</h1>
          <p>
            Explore the ancient monasteries of Sikkim through immersive virtual tours 
            and a rich digital archive. Experience the cultural heritage and spiritual 
            essence of these sacred sites from anywhere in the world.
          </p>
          <a 
            href="https://www.360easyvr.com/vr/9098?scene_id=25635" 
            className="btn" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Start Exploring
          </a>
        </div>
      </section>

      {/* Sikkim Map Section */}
      <section id="sikkim-map">
        <h2>Interactive Map of Sikkim Monasteries</h2>
        <div className="map-container">
          <div 
            ref={mapRef}
            id="map" 
            style={{ 
              height: '400px', 
              background: '#e0e0e0', 
              borderRadius: '8px',
              width: '100%'
            }}
          />
          <div id="monastery-details">
            {selectedMonastery ? (
              <>
                <h4>{selectedMonastery.name}</h4>
                <div className="img">
                  <img 
                    src={selectedMonastery.image} 
                    alt={selectedMonastery.name} 
                    id="monastery-img" 
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=' + selectedMonastery.name;
                    }}
                  />
                </div>
                <div className="monastery-desc">
                  <p>{selectedMonastery.description}</p>
                </div>
              </>
            ) : (
              <p style={{ textAlign: 'center', color: '#999' }}>Click on a marker to view monastery details</p>
            )}
          </div>
        </div>
      </section>

      {/* Community Photos Section */}
      <section style={{
        padding: '60px 20px',
        background: '#f8f9fa',
        minHeight: '400px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '15px',
            color: '#2c3e50',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            Community Photos
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            See photos shared by our community members
          </p>

          {loading ? (
            <p style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>Loading photos...</p>
          ) : photos.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'white',
              borderRadius: '15px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <p style={{ fontSize: '48px', margin: '0 0 20px' }}>📸</p>
              <h3 style={{ color: '#666', marginBottom: '10px' }}>No Photos Yet</h3>
              <p style={{ color: '#999' }}>Be the first to share your monastery experience!</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '25px'
            }}>
              {photos.map((photo) => (
                <div
                  key={photo._id}
                  style={{
                    background: 'white',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }}
                >
                  {/* Photo Image */}
                  <div style={{ height: '250px', overflow: 'hidden', background: '#e0e0e0' }}>
                    <img
                      src={photo.mediaUrl}
                      alt={photo.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>

                  {/* Photo Details */}
                  <div style={{ padding: '20px' }}>
                    <h3 style={{
                      fontSize: '1.3rem',
                      marginBottom: '10px',
                      color: '#2c3e50',
                      fontWeight: 'bold'
                    }}>
                      {photo.title}
                    </h3>

                    <p style={{
                      color: '#666',
                      fontSize: '14px',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span>🏛️</span>
                      <strong>{photo.monastery}</strong>
                    </p>

                    <p style={{
                      color: '#666',
                      fontSize: '14px',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span>👤</span>
                      {photo.authorName}
                    </p>

                    <p style={{
                      color: '#555',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      maxHeight: '60px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {photo.content.substring(0, 100)}...
                    </p>

                    <div style={{
                      marginTop: '15px',
                      paddingTop: '15px',
                      borderTop: '1px solid #eee',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ color: '#999', fontSize: '13px' }}>
                        👁️ {photo.views} views
                      </span>
                      <span style={{
                        color: '#28a745',
                        fontSize: '12px',
                        background: '#d4edda',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontWeight: 'bold'
                      }}>
                        ✓ Approved
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Community Videos Section */}
      <section style={{
        padding: '60px 20px',
        background: '#ffffff',
        minHeight: '400px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '15px',
            color: '#2c3e50',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            Community Videos
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            Watch videos shared by our community members
          </p>

          {loading ? (
            <p style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>Loading videos...</p>
          ) : videos.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#f8f9fa',
              borderRadius: '15px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <p style={{ fontSize: '48px', margin: '0 0 20px' }}>🎥</p>
              <h3 style={{ color: '#666', marginBottom: '10px' }}>No Videos Yet</h3>
              <p style={{ color: '#999' }}>Be the first to share your monastery video!</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '25px'
            }}>
              {videos.map((video) => (
                <div
                  key={video._id}
                  style={{
                    background: 'white',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }}
                >
                  {/* Video Player */}
                  <div style={{ background: '#000' }}>
                    <video
                      src={video.mediaUrl}
                      controls
                      style={{
                        width: '100%',
                        height: '250px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>

                  {/* Video Details */}
                  <div style={{ padding: '20px' }}>
                    <h3 style={{
                      fontSize: '1.3rem',
                      marginBottom: '10px',
                      color: '#2c3e50',
                      fontWeight: 'bold'
                    }}>
                      {video.title}
                    </h3>

                    <p style={{
                      color: '#666',
                      fontSize: '14px',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span>🏛️</span>
                      <strong>{video.monastery}</strong>
                    </p>

                    <p style={{
                      color: '#666',
                      fontSize: '14px',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span>👤</span>
                      {video.authorName}
                    </p>

                    <p style={{
                      color: '#555',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      maxHeight: '60px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {video.content.substring(0, 100)}...
                    </p>

                    <div style={{
                      marginTop: '15px',
                      paddingTop: '15px',
                      borderTop: '1px solid #eee',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ color: '#999', fontSize: '13px' }}>
                        👁️ {video.views} views
                      </span>
                      <span style={{
                        color: '#28a745',
                        fontSize: '12px',
                        background: '#d4edda',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontWeight: 'bold'
                      }}>
                        ✓ Approved
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Community Stories/Experiences Section */}
      {stories.length > 0 && (
        <section style={{
          padding: '60px 20px',
          background: '#f8f9fa',
          minHeight: '400px',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '15px',
              color: '#2c3e50',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              Community Experiences
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              Read stories and experiences shared by our community members
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '25px'
            }}>
              {stories.map((story) => (
                <div
                  key={story._id}
                  style={{
                    background: 'white',
                    borderRadius: '15px',
                    padding: '25px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }}
                >
                  <h3 style={{
                    fontSize: '1.4rem',
                    marginBottom: '15px',
                    color: '#2c3e50',
                    fontWeight: 'bold'
                  }}>
                    {story.title}
                  </h3>

                  <p style={{
                    color: '#666',
                    fontSize: '14px',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span>🏛️</span>
                    <strong>{story.monastery}</strong>
                  </p>

                  <p style={{
                    color: '#666',
                    fontSize: '14px',
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span>👤</span>
                    {story.authorName}
                  </p>

                  <p style={{
                    color: '#555',
                    fontSize: '15px',
                    lineHeight: '1.7',
                    marginBottom: '20px',
                    maxHeight: '120px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {story.content.substring(0, 200)}...
                  </p>

                  <div style={{
                    paddingTop: '15px',
                    borderTop: '1px solid #eee',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ color: '#999', fontSize: '13px' }}>
                      👁️ {story.views} views
                    </span>
                    <span style={{
                      color: '#28a745',
                      fontSize: '12px',
                      background: '#d4edda',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontWeight: 'bold'
                    }}>
                      ✓ Approved
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <FloatingChatbot />
    </>
  );
};

export default Home;
