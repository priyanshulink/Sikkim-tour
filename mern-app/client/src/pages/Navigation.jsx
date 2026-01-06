import React, { useState } from 'react';
import { MapPin, Hospital, Home, UtensilsCrossed, X, Info, Mountain, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import FloatingChatbot from '../components/FloatingChatbot';

const monasteries = [
  {
    id: 1,
    name: "Rumtek Monastery",
    location: "Rumtek, East Sikkim",
    description: "The largest monastery in Sikkim, also known as Dharma Chakra Centre. It's the seat of the Karmapa and houses many precious religious artifacts.",
    image: "img/RumtekMonastery.jpeg",
    coordinates: { lat: 27.2894, lng: 88.5831 },
    details: {
      founded: "1740s, rebuilt in 1960s",
      elevation: "1,550 meters",
      significance: "Seat of the 16th Karmapa",
      bestTime: "March to June, September to December"
    },
    nearby: {
      hospitals: [
        { name: "STNM Hospital", distance: "15 km", coordinates: { lat: 27.3314, lng: 88.6138 } },
        { name: "Sir Thutob Namgyal Memorial Hospital", distance: "16 km", coordinates: { lat: 27.3389, lng: 88.6065 } },
        { name: "Central Referral Hospital", distance: "17 km", coordinates: { lat: 27.3258, lng: 88.6078 } }
      ],
      hotels: [
        { name: "Bamboo Retreat", distance: "2 km", coordinates: { lat: 27.2912, lng: 88.5845 } },
        { name: "Hotel Sonam Delek", distance: "14 km", coordinates: { lat: 27.3289, lng: 88.6124 } },
        { name: "The Elgin Nor-Khill", distance: "15 km", coordinates: { lat: 27.3356, lng: 88.6089 } },
        { name: "Hotel New Castle", distance: "16 km", coordinates: { lat: 27.3301, lng: 88.6145 } }
      ],
      restaurants: [
        { name: "Rumtek Monastery Cafe", distance: "0.5 km", coordinates: { lat: 27.2901, lng: 88.5825 } },
        { name: "Baker's Cafe", distance: "14 km", coordinates: { lat: 27.3278, lng: 88.6112 } },
        { name: "The Square", distance: "15 km", coordinates: { lat: 27.3334, lng: 88.6098 } },
        { name: "Taste of Tibet", distance: "15 km", coordinates: { lat: 27.3312, lng: 88.6134 } }
      ]
    }
  },
  {
    id: 2,
    name: "Pemayangtse Monastery",
    location: "Pelling, West Sikkim",
    description: "One of the oldest and premier monasteries of Sikkim, belonging to the Nyingma order. It offers stunning views of the Kanchenjunga range.",
    image: "img/PemayangtseMonastery.jpeg",
    coordinates: { lat: 27.3142, lng: 88.2529 },
    details: {
      founded: "1705",
      elevation: "2,085 meters",
      significance: "Second oldest monastery in Sikkim",
      bestTime: "April to June, October to December"
    },
    nearby: {
      hospitals: [
        { name: "District Hospital Pelling", distance: "3 km", coordinates: { lat: 27.3187, lng: 88.2589 } },
        { name: "Primary Health Centre", distance: "2.5 km", coordinates: { lat: 27.3165, lng: 88.2567 } },
        { name: "Gyalshing Hospital", distance: "8 km", coordinates: { lat: 27.2897, lng: 88.2534 } }
      ],
      hotels: [
        { name: "Hotel Garuda", distance: "2 km", coordinates: { lat: 27.3156, lng: 88.2545 } },
        { name: "Elgin Mount Pandim", distance: "2.5 km", coordinates: { lat: 27.3178, lng: 88.2578 } },
        { name: "Norbu Ghang Resort", distance: "3 km", coordinates: { lat: 27.3189, lng: 88.2601 } },
        { name: "Hotel Dubdi", distance: "1.5 km", coordinates: { lat: 27.3134, lng: 88.2512 } }
      ],
      restaurants: [
        { name: "Melting Point Restaurant", distance: "2 km", coordinates: { lat: 27.3167, lng: 88.2556 } },
        { name: "Big Bite", distance: "2.5 km", coordinates: { lat: 27.3172, lng: 88.2589 } },
        { name: "De Regency Restaurant", distance: "2.8 km", coordinates: { lat: 27.3198, lng: 88.2612 } }
      ]
    }
  },
  {
    id: 3,
    name: "Enchey Monastery",
    location: "Gangtok, East Sikkim",
    description: "A 200-year-old monastery belonging to the Nyingma order, known for its annual Chaam dance during the festival of Chaam.",
    image: "img/EncheyMonastery.jpeg",
    coordinates: { lat: 27.3389, lng: 88.6219 },
    details: {
      founded: "1840",
      elevation: "1,900 meters",
      significance: "Guardian deity of Gangtok",
      bestTime: "Year-round, avoid monsoons"
    },
    nearby: {
      hospitals: [
        { name: "STNM Hospital", distance: "3 km", coordinates: { lat: 27.3314, lng: 88.6138 } },
        { name: "Manipal Hospital", distance: "4 km", coordinates: { lat: 27.3289, lng: 88.6145 } },
        { name: "District Hospital", distance: "3.5 km", coordinates: { lat: 27.3301, lng: 88.6156 } }
      ],
      hotels: [
        { name: "Hotel Sonam Delek", distance: "2.5 km", coordinates: { lat: 27.3356, lng: 88.6167 } },
        { name: "The Elgin Nor-Khill", distance: "3 km", coordinates: { lat: 27.3345, lng: 88.6134 } },
        { name: "Summit Newa Regency", distance: "3.5 km", coordinates: { lat: 27.3312, lng: 88.6178 } },
        { name: "Hotel Sher-E-Punjab", distance: "2 km", coordinates: { lat: 27.3378, lng: 88.6189 } }
      ],
      restaurants: [
        { name: "Baker's Cafe", distance: "2.5 km", coordinates: { lat: 27.3367, lng: 88.6145 } },
        { name: "The Coffee Shop", distance: "3 km", coordinates: { lat: 27.3323, lng: 88.6156 } },
        { name: "Roll House", distance: "3.5 km", coordinates: { lat: 27.3301, lng: 88.6167 } },
        { name: "Taste of Tibet", distance: "2.8 km", coordinates: { lat: 27.3334, lng: 88.6134 } }
      ]
    }
  },
  {
    id: 4,
    name: "Tashiding Monastery",
    location: "Tashiding, West Sikkim",
    description: "Located on a conical hill, this sacred monastery is believed to be the holiest in Sikkim. The Bumchu festival is celebrated here annually.",
    image: "img/TashidingMonastery.jpeg",
    coordinates: { lat: 27.3444, lng: 88.2781 },
    details: {
      founded: "1641",
      elevation: "1,260 meters",
      significance: "Holiest monastery in Sikkim",
      bestTime: "February to May, October to December"
    },
    nearby: {
      hospitals: [
        { name: "Tashiding PHC", distance: "1 km", coordinates: { lat: 27.3456, lng: 88.2798 } },
        { name: "Yuksom Health Centre", distance: "18 km", coordinates: { lat: 27.3689, lng: 88.2234 } },
        { name: "Gyalshing Hospital", distance: "22 km", coordinates: { lat: 27.2897, lng: 88.2534 } }
      ],
      hotels: [
        { name: "Tashiding Guest House", distance: "0.8 km", coordinates: { lat: 27.3451, lng: 88.2789 } },
        { name: "Hotel Yangri", distance: "1.2 km", coordinates: { lat: 27.3467, lng: 88.2812 } },
        { name: "Monastery View Hotel", distance: "1.5 km", coordinates: { lat: 27.3478, lng: 88.2756 } }
      ],
      restaurants: [
        { name: "Tashiding Cafe", distance: "0.5 km", coordinates: { lat: 27.3448, lng: 88.2774 } },
        { name: "Local Eatery", distance: "0.8 km", coordinates: { lat: 27.3456, lng: 88.2801 } },
        { name: "Mountain View Restaurant", distance: "1 km", coordinates: { lat: 27.3462, lng: 88.2823 } }
      ]
    }
  },
  {
    id: 5,
    name: "Ralang Monastery",
    location: "Ravangla, South Sikkim",
    description: "One of the most beautiful monasteries, rebuilt in the 1990s. It belongs to the Kagyu sect and is known for its architectural splendor.",
    image: "img/RalongMonastery.jpeg",
    coordinates: { lat: 27.3167, lng: 88.5167 },
    details: {
      founded: "1768, rebuilt 1995",
      elevation: "2,000 meters",
      significance: "Beautiful Kagyu monastery",
      bestTime: "March to June, September to December"
    },
    nearby: {
      hospitals: [
        { name: "Ravangla Hospital", distance: "4 km", coordinates: { lat: 27.3189, lng: 88.5234 } },
        { name: "Primary Health Centre Ralang", distance: "1 km", coordinates: { lat: 27.3178, lng: 88.5189 } },
        { name: "Namchi District Hospital", distance: "25 km", coordinates: { lat: 27.1656, lng: 88.3678 } }
      ],
      hotels: [
        { name: "Mount Narsing Village Resort", distance: "3.5 km", coordinates: { lat: 27.3201, lng: 88.5212 } },
        { name: "Cherry Resort", distance: "4 km", coordinates: { lat: 27.3223, lng: 88.5245 } },
        { name: "Hotel Sonam Villa", distance: "3.8 km", coordinates: { lat: 27.3189, lng: 88.5223 } },
        { name: "Ravangla Heights", distance: "4.2 km", coordinates: { lat: 27.3234, lng: 88.5267 } }
      ],
      restaurants: [
        { name: "Ralang Monastery Cafe", distance: "0.3 km", coordinates: { lat: 27.3172, lng: 88.5178 } },
        { name: "The Village Restaurant", distance: "3.5 km", coordinates: { lat: 27.3195, lng: 88.5201 } },
        { name: "Ravangla Food Court", distance: "4 km", coordinates: { lat: 27.3212, lng: 88.5234 } }
      ]
    }
  },
  {
    id: 6,
    name: "Phodong Monastery",
    location: "Phodong, North Sikkim",
    description: "A scenic monastery belonging to the Kagyu sect, known for its annual masked dance festival and beautiful murals.",
    image: "img/PhodongMonastery.jpg",
    coordinates: { lat: 27.4667, lng: 88.5333 },
    details: {
      founded: "1721",
      elevation: "1,500 meters",
      significance: "Important Kagyu monastery",
      bestTime: "April to June, October to November"
    },
    nearby: {
      hospitals: [
        { name: "Phodong PHC", distance: "2 km", coordinates: { lat: 27.4689, lng: 88.5356 } },
        { name: "Mangan District Hospital", distance: "15 km", coordinates: { lat: 27.5089, lng: 88.5289 } },
        { name: "Singhik Health Centre", distance: "8 km", coordinates: { lat: 27.4889, lng: 88.5412 } }
      ],
      hotels: [
        { name: "Phodong Village Resort", distance: "1.5 km", coordinates: { lat: 27.4678, lng: 88.5345 } },
        { name: "Mountain View Hotel", distance: "2 km", coordinates: { lat: 27.4701, lng: 88.5367 } },
        { name: "Himalayan Retreat", distance: "2.5 km", coordinates: { lat: 27.4712, lng: 88.5389 } }
      ],
      restaurants: [
        { name: "Phodong Local Dhaba", distance: "1 km", coordinates: { lat: 27.4672, lng: 88.5341 } },
        { name: "Monastery View Cafe", distance: "0.8 km", coordinates: { lat: 27.4661, lng: 88.5327 } },
        { name: "North Sikkim Restaurant", distance: "1.5 km", coordinates: { lat: 27.4689, lng: 88.5378 } }
      ]
    }
  },
  {
    id: 7,
    name: "Dubdi Monastery",
    location: "Yuksom, West Sikkim",
    description: "The oldest monastery in Sikkim, also known as the Hermit's Cell. It sits atop a hill offering panoramic views.",
    image: "img/DubdiMonastery.jpeg",
    coordinates: { lat: 27.3667, lng: 88.2167 },
    details: {
      founded: "1701",
      elevation: "2,100 meters",
      significance: "First monastery of Sikkim",
      bestTime: "March to May, October to November"
    },
    nearby: {
      hospitals: [
        { name: "Yuksom Health Centre", distance: "1.5 km", coordinates: { lat: 27.3689, lng: 88.2234 } },
        { name: "Pelling Hospital", distance: "28 km", coordinates: { lat: 27.3187, lng: 88.2589 } },
        { name: "Mobile Medical Unit", distance: "1 km", coordinates: { lat: 27.3678, lng: 88.2189 } }
      ],
      hotels: [
        { name: "Hotel Yangri", distance: "1.2 km", coordinates: { lat: 27.3678, lng: 88.2189 } },
        { name: "Yuksom Residency", distance: "1.5 km", coordinates: { lat: 27.3689, lng: 88.2212 } },
        { name: "Tashigang Resort", distance: "2 km", coordinates: { lat: 27.3701, lng: 88.2234 } },
        { name: "Wild Orchid Resort", distance: "1.8 km", coordinates: { lat: 27.3695, lng: 88.2201 } }
      ],
      restaurants: [
        { name: "Gupta Restaurant", distance: "1.3 km", coordinates: { lat: 27.3682, lng: 88.2198 } },
        { name: "Yuksom Cafe", distance: "1.5 km", coordinates: { lat: 27.3691, lng: 88.2223 } },
        { name: "Dragon Restaurant", distance: "1.6 km", coordinates: { lat: 27.3698, lng: 88.2245 } }
      ]
    }
  },
  {
    id: 8,
    name: "Lingdum Monastery",
    location: "Ranka, East Sikkim",
    description: "A relatively new but beautiful monastery known for its ornate architecture and peaceful ambiance, surrounded by lush forests.",
    image: "img/LingdumRankaMonastery.jpg",
    coordinates: { lat: 27.2667, lng: 88.5833 },
    details: {
      founded: "1999",
      elevation: "1,676 meters",
      significance: "Modern architectural marvel",
      bestTime: "Year-round"
    },
    nearby: {
      hospitals: [
        { name: "Ranka Health Post", distance: "3 km", coordinates: { lat: 27.2712, lng: 88.5889 } },
        { name: "STNM Hospital", distance: "12 km", coordinates: { lat: 27.3314, lng: 88.6138 } },
        { name: "Central Referral Hospital", distance: "13 km", coordinates: { lat: 27.3258, lng: 88.6078 } }
      ],
      hotels: [
        { name: "Ranka Village Homestay", distance: "2 km", coordinates: { lat: 27.2689, lng: 88.5856 } },
        { name: "Summit Golden Crescent Resort", distance: "10 km", coordinates: { lat: 27.3012, lng: 88.6012 } },
        { name: "Hotel New Castle", distance: "12 km", coordinates: { lat: 27.3301, lng: 88.6145 } },
        { name: "Denzong Inn", distance: "11 km", coordinates: { lat: 27.3234, lng: 88.6089 } }
      ],
      restaurants: [
        { name: "Lingdum Cafe", distance: "0.5 km", coordinates: { lat: 27.2672, lng: 88.5841 } },
        { name: "Ranka Local Eatery", distance: "2.5 km", coordinates: { lat: 27.2701, lng: 88.5878 } },
        { name: "Forest View Restaurant", distance: "3 km", coordinates: { lat: 27.2723, lng: 88.5901 } }
      ]
    }
  },
  {
    id: 9,
    name: "Sanga Choeling Monastery",
    location: "Pelling, West Sikkim",
    description: "The second oldest monastery in Sikkim, perched on a ridge. It offers breathtaking views of the mountains and valleys.",
    coordinates: { lat: 27.3211, lng: 88.2467 },
    details: {
      founded: "1697",
      elevation: "2,100 meters",
      significance: "Second oldest monastery",
      bestTime: "March to June, September to December"
    },
    nearby: {
      hospitals: [
        { name: "District Hospital Pelling", distance: "2.5 km", coordinates: { lat: 27.3187, lng: 88.2589 } },
        { name: "Pelling PHC", distance: "2 km", coordinates: { lat: 27.3165, lng: 88.2545 } },
        { name: "Gyalshing Hospital", distance: "10 km", coordinates: { lat: 27.2897, lng: 88.2534 } }
      ],
      hotels: [
        { name: "Hotel Garuda", distance: "2 km", coordinates: { lat: 27.3189, lng: 88.2512 } },
        { name: "Elgin Mount Pandim", distance: "2.5 km", coordinates: { lat: 27.3201, lng: 88.2534 } },
        { name: "Chumbi Residency", distance: "2.8 km", coordinates: { lat: 27.3223, lng: 88.2567 } },
        { name: "Hotel Kabur", distance: "3 km", coordinates: { lat: 27.3234, lng: 88.2589 } }
      ],
      restaurants: [
        { name: "Melting Point Restaurant", distance: "2 km", coordinates: { lat: 27.3195, lng: 88.2523 } },
        { name: "The Local Cafe", distance: "2.3 km", coordinates: { lat: 27.3207, lng: 88.2545 } },
        { name: "Big Bite", distance: "2.5 km", coordinates: { lat: 27.3218, lng: 88.2567 } },
        { name: "Mountain View Restaurant", distance: "2.8 km", coordinates: { lat: 27.3229, lng: 88.2589 } }
      ]
    }
  }
];

const Navigation = () => {
  const [selectedMonastery, setSelectedMonastery] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [mapType, setMapType] = useState('');

  const openDetails = (monastery) => {
    setSelectedMonastery(monastery);
    setShowMap(false);
  };

  const showNearbyPlaces = (type) => {
    setMapType(type);
    setShowMap(true);
  };

  const closeModal = () => {
    setSelectedMonastery(null);
    setShowMap(false);
  };

  const getGradientColor = (id) => {
    const colors = [
      'from-orange-400 to-red-500',
      'from-purple-400 to-pink-500',
      'from-blue-400 to-indigo-500',
      'from-green-400 to-teal-500',
      'from-yellow-400 to-orange-500',
      'from-red-400 to-pink-500',
      'from-indigo-400 to-purple-500',
      'from-teal-400 to-green-500',
      'from-pink-400 to-rose-500'
    ];
    return colors[id % colors.length];
  };

  const getGradientColors = (id) => {
    const colors = [
      { from: '#fb923c', to: '#ef4444' },
      { from: '#c084fc', to: '#ec4899' },
      { from: '#60a5fa', to: '#6366f1' },
      { from: '#4ade80', to: '#14b8a6' },
      { from: '#facc15', to: '#fb923c' },
      { from: '#f87171', to: '#ec4899' },
      { from: '#818cf8', to: '#a855f7' },
      { from: '#2dd4bf', to: '#22c55e' },
      { from: '#f9a8d4', to: '#fb7185' }
    ];
    return colors[id % colors.length];
  };

  const openInGoogleMaps = (placeName, coords) => {
    // If placeName is passed, search for that specific place, otherwise search for place type
    const query = typeof placeName === 'string' && placeName.includes(' ') 
      ? encodeURIComponent(placeName) 
      : encodeURIComponent(`${placeName} near ${coords.lat},${coords.lng}`);
    window.open(`https://www.google.com/maps/search/${query}/@${coords.lat},${coords.lng},14z`, '_blank');
  };

  const getStaticMapUrl = (coords) => {
    return `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng-0.05},${coords.lat-0.05},${coords.lng+0.05},${coords.lat+0.05}&layer=mapnik&marker=${coords.lat},${coords.lng}`;
  };

  return (
    <>
      <Navbar />
      <FloatingChatbot />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px', paddingTop: '20px' }}>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 'bold', color: '#78350f', marginBottom: '15px' }}>
              Sacred Monasteries of Sikkim
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#92400e' }}>
              Explore the spiritual heritage of the Himalayan kingdom
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px',
            marginBottom: '40px'
          }}>
            {monasteries.map((monastery) => (
              <div
                key={monastery.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ 
                  position: 'relative', 
                  height: '200px', 
                  overflow: 'hidden'
                }}>
                  <img 
                    src={monastery.image}
                    alt={monastery.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)' }}></div>
                  <div style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
                    padding: '20px'
                  }}>
                    <h3 style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem', margin: 0 }}>
                      {monastery.name}
                    </h3>
                  </div>
                </div>

                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
                    <MapPin style={{ width: '16px', height: '16px', color: '#ef4444', marginRight: '8px', marginTop: '2px', flexShrink: 0 }} />
                    <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0 }}>{monastery.location}</p>
                  </div>

                  <p style={{ 
                    color: '#374151', 
                    fontSize: '0.875rem', 
                    marginBottom: '20px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: '1.5'
                  }}>
                    {monastery.description}
                  </p>

                  <button
                    onClick={() => openDetails(monastery)}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(to right, #d97706, #ea580c)',
                      color: 'white',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(to right, #b45309, #c2410c)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(to right, #d97706, #ea580c)';
                    }}
                  >
                    <Info style={{ width: '16px', height: '16px' }} />
                    View More
                  </button>
                </div>
              </div>
          ))}
        </div>
      </div>

      {selectedMonastery && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            maxWidth: '900px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            <div style={{
              position: 'sticky',
              top: 0,
              background: 'linear-gradient(to right, #d97706, #ea580c)',
              color: 'white',
              padding: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              zIndex: 10
            }}>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px' }}>{selectedMonastery.name}</h2>
                <p style={{ color: '#fef3c7', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin style={{ width: '16px', height: '16px' }} />
                  {selectedMonastery.location}
                </p>
              </div>
              <button
                onClick={closeModal}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  padding: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              >
                <X style={{ width: '24px', height: '24px' }} />
              </button>
            </div>

            {!showMap ? (
              <div style={{ padding: '24px' }}>
                <div style={{
                  width: '100%',
                  height: '256px',
                  borderRadius: '12px',
                  marginBottom: '24px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={selectedMonastery.image}
                    alt={selectedMonastery.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)' }}></div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>About</h3>
                  <p style={{ color: '#374151', lineHeight: '1.75' }}>
                    {selectedMonastery.description}
                  </p>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '16px', 
                  marginBottom: '24px', 
                  backgroundColor: '#fffbeb', 
                  padding: '16px', 
                  borderRadius: '12px' 
                }}>
                  <div>
                    <p style={{ fontSize: '0.875rem', color: '#4b5563', fontWeight: '600' }}>Founded</p>
                    <p style={{ color: '#1f2937' }}>{selectedMonastery.details.founded}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.875rem', color: '#4b5563', fontWeight: '600' }}>Elevation</p>
                    <p style={{ color: '#1f2937' }}>{selectedMonastery.details.elevation}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.875rem', color: '#4b5563', fontWeight: '600' }}>Significance</p>
                    <p style={{ color: '#1f2937' }}>{selectedMonastery.details.significance}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.875rem', color: '#4b5563', fontWeight: '600' }}>Best Time</p>
                    <p style={{ color: '#1f2937' }}>{selectedMonastery.details.bestTime}</p>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>Find Nearby</h3>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                    gap: '12px' 
                  }}>
                    <button
                      onClick={() => showNearbyPlaces('hospitals')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        backgroundColor: '#fef2f2',
                        border: '2px solid #fecaca',
                        color: '#b91c1c',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                    >
                      <Hospital style={{ width: '20px', height: '20px' }} />
                      Hospitals
                    </button>
                    <button
                      onClick={() => showNearbyPlaces('hotels')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        backgroundColor: '#eff6ff',
                        border: '2px solid #bfdbfe',
                        color: '#1e40af',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dbeafe'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#eff6ff'}
                    >
                      <Home style={{ width: '20px', height: '20px' }} />
                      Hotels
                    </button>
                    <button
                      onClick={() => showNearbyPlaces('restaurants')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        backgroundColor: '#f0fdf4',
                        border: '2px solid #bbf7d0',
                        color: '#15803d',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dcfce7'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0fdf4'}
                    >
                      <UtensilsCrossed style={{ width: '20px', height: '20px' }} />
                      Restaurants
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ padding: '24px' }}>
                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', textTransform: 'capitalize' }}>
                    Nearby {mapType}
                  </h3>
                  <button
                    onClick={() => setShowMap(false)}
                    style={{
                      color: '#d97706',
                      fontWeight: '600',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#b45309'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#d97706'}
                  >
                    ← Back to Details
                  </button>
                </div>
                
                {/* Map Display */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  marginBottom: '24px',
                  border: '2px solid #e5e7eb'
                }}>
                  <div style={{ position: 'relative', height: '400px' }}>
                    <iframe
                      width="100%"
                      height="400"
                      frameBorder="0"
                      scrolling="no"
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedMonastery.coordinates.lng-0.1},${selectedMonastery.coordinates.lat-0.1},${selectedMonastery.coordinates.lng+0.1},${selectedMonastery.coordinates.lat+0.1}&layer=mapnik&marker=${selectedMonastery.coordinates.lat},${selectedMonastery.coordinates.lng}`}
                      style={{ borderRadius: '12px 12px 0 0' }}
                      title={`Map of ${selectedMonastery.name}`}
                    ></iframe>
                  </div>
                  <div style={{ padding: '12px', backgroundColor: '#f9fafb', textAlign: 'center', borderTop: '1px solid #e5e7eb' }}>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>Monastery:</span> {selectedMonastery.coordinates.lat.toFixed(4)}°N, {selectedMonastery.coordinates.lng.toFixed(4)}°E
                    </p>
                  </div>
                </div>

                {/* Places List */}
                <div style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '2px solid #e5e7eb'
                }}>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {mapType === 'hospitals' && <Hospital style={{ width: '24px', height: '24px', color: '#ef4444' }} />}
                    {mapType === 'hotels' && <Home style={{ width: '24px', height: '24px', color: '#3b82f6' }} />}
                    {mapType === 'restaurants' && <UtensilsCrossed style={{ width: '24px', height: '24px', color: '#22c55e' }} />}
                    Available {mapType.charAt(0).toUpperCase() + mapType.slice(1)}
                  </h4>

                  <div style={{ display: 'grid', gap: '12px' }}>
                    {selectedMonastery.nearby[mapType].map((place, index) => (
                      <div
                        key={index}
                        style={{
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          padding: '16px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                          border: '1px solid #e5e7eb',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <h5 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                            {place.name}
                          </h5>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.875rem', color: '#6b7280' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <MapPin style={{ width: '14px', height: '14px', color: '#ef4444' }} />
                              {place.distance}
                            </span>
                            <span style={{ color: '#9ca3af' }}>•</span>
                            <span>
                              {place.coordinates.lat.toFixed(4)}°N, {place.coordinates.lng.toFixed(4)}°E
                            </span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => openInGoogleMaps(place.name, place.coordinates)}
                          style={{
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: 'none',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'background-color 0.3s',
                            whiteSpace: 'nowrap'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                        >
                          <ExternalLink style={{ width: '14px', height: '14px' }} />
                          Directions
                        </button>
                      </div>
                    ))}
                  </div>

                  <div style={{ 
                    marginTop: '20px', 
                    padding: '16px', 
                    backgroundColor: '#fffbeb', 
                    borderRadius: '8px',
                    border: '1px solid #fef3c7'
                  }}>
                    <p style={{ fontSize: '0.875rem', color: '#92400e', marginBottom: '8px' }}>
                      <span style={{ fontWeight: '600' }}>💡 Tip:</span> Click "Directions" to open the location in Google Maps for detailed navigation and route planning.
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#b45309', margin: 0 }}>
                      Distance is approximate and measured from {selectedMonastery.name}.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default Navigation;
