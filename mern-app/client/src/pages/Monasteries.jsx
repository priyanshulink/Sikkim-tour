import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FloatingChatbot from '../components/FloatingChatbot';
import { X } from 'lucide-react';

// Detailed monastery data
const monasteryData = {
  rumtek: {
    name: "Rumtek Monastery",
    overview: "Rumtek Monastery, officially known as the Dharma Chakra Centre, is the largest and most significant monastery in the state of Sikkim. Located approximately 24 km from Gangtok, it serves as the principal seat of the Karma Kagyu lineage of Tibetan Buddhism outside Tibet. The monastery is both a spiritual center and a symbol of Tibetan Buddhist preservation in exile.",
    history: "The original Rumtek Monastery was constructed in the 16th century under the supervision of the 9th Karmapa. However, the present structure was rebuilt in 1966 by His Holiness the 16th Gyalwa Karmapa after he fled Tibet in 1959. The reconstruction closely follows the design of Tsurphu Monastery in Tibet, ensuring architectural and spiritual continuity. Since its reconstruction, Rumtek has become the epicenter for the Kagyu lineage in India and a major center for monastic education and ritual practice.",
    architecture: "Rumtek Monastery is an outstanding example of traditional Tibetan architecture. The complex features a grand prayer hall adorned with elaborate murals, thangkas, and statues of Buddhist deities. Golden stupas containing sacred relics are housed within the monastery. The monastery complex also includes a monastic college, meditation retreat centers, and residential quarters for monks, all arranged in a symmetrical layout that reflects Buddhist cosmology.",
    festivals: "Major religious events at Rumtek include Losar (Tibetan New Year), Mahakala rituals, and special Kagyu lineage ceremonies. Masked Cham dances are performed during festivals, symbolizing the victory of wisdom over ignorance and attracting large numbers of devotees and visitors.",
    visitingInfo: "Rumtek Monastery is best visited between March–June and September–November. Visitors are expected to dress modestly and maintain silence within prayer halls. Photography inside the shrine areas is restricted. The monastery is easily accessible by road from Gangtok."
  },
  pemayangtse: {
    name: "Pemayangtse Monastery",
    overview: "Pemayangtse Monastery is one of the oldest, most sacred, and historically significant monasteries in Sikkim. Situated near Pelling in West Sikkim, it belongs to the Nyingma sect of Tibetan Buddhism and holds immense religious prestige due to its close association with the former Sikkimese monarchy.",
    history: "Founded in 1705 by Lama Lhatsun Chempo, Pemayangtse Monastery was established as a royal monastery under the patronage of the Chogyals of Sikkim. Historically, only monks of pure Tibetan lineage were allowed to be ordained here. The monastery played a vital role in royal rituals, coronations, and state religious ceremonies during the monarchy era.",
    architecture: "Pemayangtse Monastery is a three-storied structure built in classic Tibetan architectural style. The interiors feature rare murals, ancient scriptures, and finely carved wooden structures. The most celebrated artifact is the seven-tiered wooden model of Zangdog Palri, the celestial palace of Guru Padmasambhava, which took five years to complete.",
    festivals: "The monastery is renowned for its annual Cham dance festival held during Losar (February–March). Monks perform masked dances depicting mythological stories, moral lessons, and the triumph of good over evil.",
    visitingInfo: "October to May is the ideal time to visit. Pemayangtse Monastery is located close to Pelling and is accessible by road. Visitors are advised to maintain decorum and respect religious practices."
  },
  tashiding: {
    name: "Tashiding Monastery",
    overview: "Tashiding Monastery is considered the holiest monastery in Sikkim. Located on a hilltop overlooking the Rangit River, it is revered for its spiritual power and serene environment.",
    history: "Founded in 1641 by Ngadak Sempa Chempo Phuntshok Rigzin, Tashiding Monastery is believed to have been blessed by Guru Padmasambhava himself. According to legend, simply seeing the monastery from afar can cleanse one of sins.",
    architecture: "The monastery follows a simple architectural style that emphasizes spiritual symbolism over ornamentation. The complex is surrounded by sacred chortens, prayer flags, and forested landscapes, creating a tranquil spiritual atmosphere.",
    festivals: "The Bumchu Festival is the most important religious event at Tashiding. During the festival, sacred holy water preserved in a sealed vessel is distributed to devotees, who believe it predicts the fortunes of the coming year.",
    visitingInfo: "March to May is the best visiting period. A short trek is required to reach the monastery, making it ideal for spiritually inclined travelers."
  },
  phodong: {
    name: "Phodong Monastery",
    overview: "Phodong Monastery is a prominent Kagyu monastery located in North Sikkim. It is widely known for its vibrant religious festivals and historical significance.",
    history: "Established in the early 18th century by the 9th Karmapa, Phodong Monastery served as a major center for Buddhist studies and monastic training in the region.",
    architecture: "The monastery houses exquisite murals, statues, and traditional Tibetan design elements. Its prayer hall is richly decorated and reflects the artistic traditions of the Kagyu lineage.",
    festivals: "The annual Phodong Chaam festival features masked dances performed by monks, attracting tourists and devotees from across Sikkim.",
    visitingInfo: "Easily accessible from Gangtok, the monastery is best visited during festival seasons for a culturally immersive experience."
  },
  enchey: {
    name: "Enchey Monastery",
    overview: "Enchey Monastery is a peaceful Nyingma monastery located near Gangtok. It is known for its spiritual significance and panoramic mountain views.",
    history: "Built in 1840 and later reconstructed in 1909, Enchey Monastery is associated with Lama Druptob Karpo, a tantric master believed to possess supernatural powers.",
    architecture: "The monastery features traditional Tibetan design with colorful facades, ornate windows, and beautifully painted interiors depicting Buddhist deities.",
    festivals: "The annual Chaam dance festival held in January or February is the main attraction, showcasing vibrant religious performances.",
    visitingInfo: "Located close to Gangtok, Enchey Monastery is accessible year-round and ideal for short spiritual visits."
  },
  dubdi: {
    name: "Dubdi Monastery",
    overview: "Dubdi Monastery, also known as Yuksom Monastery, is the oldest monastery in Sikkim and marks the beginning of Buddhism in the region.",
    history: "Founded in 1701 by Lhatsun Namkha Jigme, Dubdi Monastery was constructed soon after the coronation of the first Chogyal of Sikkim. It holds immense historical and religious value.",
    architecture: "The monastery is a modest stone structure reflecting early Tibetan architectural influences. Its remote forest setting enhances its spiritual appeal.",
    festivals: "While large festivals are rare, special prayers and rituals are conducted on significant Buddhist occasions.",
    visitingInfo: "A short forest trek is required to reach the monastery. The best visiting period is between March and October."
  }
};

// Monastery cards data with keys matching monasteryData
const monasteries = [
  { 
    key: "rumtek",
    name: "Rumtek Monastery", 
    location: "Gangtok, East Sikkim", 
    sect: "Kagyu", 
    founded: "16th century (rebuilt in 1960s)", 
    description: "The largest monastery in Sikkim; seat of the Karmapa Lama.",
    image: "img/RumtekMonastery.jpeg"
  },
  { 
    key: "pemayangtse",
    name: "Pemayangtse Monastery", 
    location: "Pelling, West Sikkim", 
    sect: "Nyingma", 
    founded: "1705", 
    description: "Historic Nyingma monastery, founded in 1705 near Pelling.",
    image: "img/PemayangtseMonastery.jpeg"
  },
  { 
    key: "tashiding",
    name: "Tashiding Monastery", 
    location: "Near Yuksom, West Sikkim", 
    sect: "Nyingma", 
    founded: "1641", 
    description: "Considered the holiest monastery in Sikkim, built in 1641.",
    image: "img/TashidingMonastery.jpeg"
  },
  { 
    key: "phodong",
    name: "Phodong Monastery", 
    location: "North Sikkim", 
    sect: "Kagyu", 
    founded: "1740", 
    description: "18th-century Kagyu monastery famed for frescoes and festivals.",
    image: "img/PhodongMonastery.jpg"
  },
  { 
    key: "enchey",
    name: "Enchey Monastery", 
    location: "Gangtok", 
    sect: "Nyingma", 
    founded: "1909", 
    description: "Gangtok's famed Nyingma monastery.",
    image: "img/EncheyMonastery.jpeg"
  },
  { 
    key: "ralong",
    name: "Ralong Monastery", 
    location: "South Sikkim", 
    sect: "Kagyu", 
    founded: "18th century", 
    description: "Known for the Kagyed Dance Festival; rebuilt in 1995.",
    image: "img/RalongMonastery.jpeg"
  },
  { 
    key: "lachen",
    name: "Lachen Monastery", 
    location: "Lachen, North Sikkim", 
    sect: "Nyingma", 
    founded: "1858", 
    description: "Ngodrub Choling (1858), spiritual center for Lachenpas.",
    image: "img/Lachen_Monastery.jpeg"
  },
  { 
    key: "dubdi",
    name: "Dubdi Monastery", 
    location: "Yuksom, West Sikkim", 
    sect: "Nyingma", 
    founded: "1701", 
    description: "First monastery of Sikkim (1701).",
    image: "img/DubdiMonastery.jpeg"
  }
];

const Monasteries = () => {
  const [filter, setFilter] = useState('All');
  const [filteredMonasteries, setFilteredMonasteries] = useState(monasteries);
  const [selectedMonastery, setSelectedMonastery] = useState(null);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredMonasteries(monasteries);
    } else {
      setFilteredMonasteries(monasteries.filter(m => m.sect === filter));
    }
  }, [filter]);

  const handleMoreClick = (monastery) => {
    setSelectedMonastery(monastery);
  };

  const closeModal = () => {
    setSelectedMonastery(null);
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div style={{ 
        paddingTop: '80px', 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        color: 'white',
        padding: '100px 20px 60px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '15px', fontWeight: 'bold' }}>
          Monasteries of Sikkim
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
          Browse notable monasteries across Sikkim. Click a card to learn more.
        </p>
      </div>

      {/* Main Content */}
      <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '50px 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* Filter Buttons */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <button 
              onClick={() => setFilter('All')} 
              style={{ 
                margin: '5px', 
                padding: '12px 30px', 
                background: filter === 'All' ? '#007bff' : 'white', 
                color: filter === 'All' ? 'white' : '#333', 
                border: '2px solid #007bff',
                borderRadius: '25px', 
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '15px',
                transition: 'all 0.3s'
              }}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('Nyingma')} 
              style={{ 
                margin: '5px', 
                padding: '12px 30px', 
                background: filter === 'Nyingma' ? '#007bff' : 'white', 
                color: filter === 'Nyingma' ? 'white' : '#333', 
                border: '2px solid #007bff',
                borderRadius: '25px', 
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '15px',
                transition: 'all 0.3s'
              }}
            >
              Nyingma
            </button>
            <button 
              onClick={() => setFilter('Kagyu')} 
              style={{ 
                margin: '5px', 
                padding: '12px 30px', 
                background: filter === 'Kagyu' ? '#007bff' : 'white', 
                color: filter === 'Kagyu' ? 'white' : '#333', 
                border: '2px solid #007bff',
                borderRadius: '25px', 
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '15px',
                transition: 'all 0.3s'
              }}
            >
              Kagyu
            </button>
          </div>

          {/* Monasteries Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '30px' 
          }}>
            {filteredMonasteries.map((monastery, index) => (
              <div 
                key={index} 
                style={{ 
                  background: 'white', 
                  borderRadius: '12px', 
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
                {/* Monastery Image */}
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <img 
                    src={monastery.image} 
                    alt={monastery.name}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>

                {/* Card Content */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{ 
                    marginBottom: '12px', 
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    color: '#1a1a1a'
                  }}>
                    {monastery.name}
                  </h3>
                  
                  <p style={{ 
                    color: '#666', 
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    marginBottom: '15px',
                    minHeight: '45px'
                  }}>
                    {monastery.description}
                  </p>

                  {/* Action Button */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    alignItems: 'center',
                    marginTop: '15px'
                  }}>
                    <button
                      onClick={() => handleMoreClick(monastery)}
                      style={{
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '10px 25px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.95rem',
                        transition: 'background 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#0056b3'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#007bff'}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for detailed monastery information */}
      {selectedMonastery && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '20px',
            overflowY: 'auto'
          }}
          onClick={closeModal}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '15px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              margin: '20px auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontWeight: 'bold',
                zIndex: 10,
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#c82333'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#dc3545'}
            >
              <X size={24} />
            </button>

            {/* Modal Image */}
            <img 
              src={selectedMonastery.image} 
              alt={selectedMonastery.name}
              style={{ 
                width: '100%', 
                height: '280px', 
                objectFit: 'cover',
                borderRadius: '15px 15px 0 0'
              }}
            />

            {/* Modal Content */}
            <div style={{ padding: '35px' }}>
              <h2 style={{ 
                marginBottom: '10px', 
                color: '#1a1a1a',
                fontSize: '1.8rem',
                fontWeight: 'bold'
              }}>
                {selectedMonastery.name}
              </h2>
              
              {/* Basic Info */}
              <div style={{ 
                marginBottom: '25px', 
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '8px',
                borderLeft: '4px solid #007bff'
              }}>
                <p style={{ marginBottom: '8px', fontSize: '0.95rem' }}>
                  <strong>📍 Location:</strong> {selectedMonastery.location}
                </p>
                <p style={{ marginBottom: '8px', fontSize: '0.95rem' }}>
                  <strong>☸️ Sect:</strong> {selectedMonastery.sect}
                </p>
                <p style={{ marginBottom: '0', fontSize: '0.95rem' }}>
                  <strong>📅 Founded:</strong> {selectedMonastery.founded}
                </p>
              </div>

              {/* Detailed Information - Only show if monastery has detailed data */}
              {selectedMonastery.key && monasteryData[selectedMonastery.key] && (
                <>
                  {/* Overview */}
                  <div style={{ marginBottom: '25px' }}>
                    <h3 style={{ 
                      marginBottom: '12px', 
                      color: '#007bff',
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      borderBottom: '2px solid #007bff',
                      paddingBottom: '8px'
                    }}>
                      📖 Overview
                    </h3>
                    <p style={{ 
                      lineHeight: '1.8', 
                      color: '#333', 
                      textAlign: 'justify',
                      fontSize: '0.95rem'
                    }}>
                      {monasteryData[selectedMonastery.key].overview}
                    </p>
                  </div>

                  {/* History */}
                  <div style={{ marginBottom: '25px' }}>
                    <h3 style={{ 
                      marginBottom: '12px', 
                      color: '#28a745',
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      borderBottom: '2px solid #28a745',
                      paddingBottom: '8px'
                    }}>
                      🏛️ History
                    </h3>
                    <p style={{ 
                      lineHeight: '1.8', 
                      color: '#333', 
                      textAlign: 'justify',
                      fontSize: '0.95rem'
                    }}>
                      {monasteryData[selectedMonastery.key].history}
                    </p>
                  </div>

                  {/* Architecture */}
                  <div style={{ marginBottom: '25px' }}>
                    <h3 style={{ 
                      marginBottom: '12px', 
                      color: '#fd7e14',
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      borderBottom: '2px solid #fd7e14',
                      paddingBottom: '8px'
                    }}>
                      🏗️ Architecture
                    </h3>
                    <p style={{ 
                      lineHeight: '1.8', 
                      color: '#333', 
                      textAlign: 'justify',
                      fontSize: '0.95rem'
                    }}>
                      {monasteryData[selectedMonastery.key].architecture}
                    </p>
                  </div>

                  {/* Festivals */}
                  <div style={{ marginBottom: '25px' }}>
                    <h3 style={{ 
                      marginBottom: '12px', 
                      color: '#dc3545',
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      borderBottom: '2px solid #dc3545',
                      paddingBottom: '8px'
                    }}>
                      🎉 Festivals
                    </h3>
                    <p style={{ 
                      lineHeight: '1.8', 
                      color: '#333', 
                      textAlign: 'justify',
                      fontSize: '0.95rem'
                    }}>
                      {monasteryData[selectedMonastery.key].festivals}
                    </p>
                  </div>

                  {/* Visiting Information */}
                  <div style={{ 
                    marginBottom: '20px',
                    padding: '20px',
                    background: '#e7f3ff',
                    borderRadius: '8px',
                    border: '1px solid #007bff'
                  }}>
                    <h3 style={{ 
                      marginBottom: '12px', 
                      color: '#007bff',
                      fontSize: '1.3rem',
                      fontWeight: 'bold'
                    }}>
                      ℹ️ Visiting Information
                    </h3>
                    <p style={{ 
                      lineHeight: '1.8', 
                      color: '#333', 
                      marginBottom: 0,
                      fontSize: '0.95rem'
                    }}>
                      {monasteryData[selectedMonastery.key].visitingInfo}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <FloatingChatbot />
    </>
  );
};

export default Monasteries;
