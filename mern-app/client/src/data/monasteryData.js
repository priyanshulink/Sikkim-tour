// Monastery data for offline chatbot
export const monasteries = [
  { 
    name: "Rumtek Monastery", 
    location: "Gangtok, East Sikkim", 
    sect: "Kagyu", 
    founded: "16th century (rebuilt in 1960s)", 
    history: "Seat of the Karmapa Lama, also known as Dharma Chakra Centre. Largest monastery in Sikkim.", 
    wiki: "https://en.wikipedia.org/wiki/Rumtek_Monastery" 
  },
  { 
    name: "Pemayangtse Monastery", 
    location: "Pelling, West Sikkim", 
    sect: "Nyingma", 
    founded: "1705", 
    history: "One of the oldest monasteries, famous for its wooden structure Zangdok Palri.", 
    wiki: "https://en.wikipedia.org/wiki/Pemayangtse_Monastery" 
  },
  { 
    name: "Tashiding Monastery", 
    location: "Near Yuksom, West Sikkim", 
    sect: "Nyingma", 
    founded: "1641", 
    history: "Considered the holiest monastery in Sikkim, built by Ngadak Sempa Chempo.", 
    wiki: "https://en.wikipedia.org/wiki/Tashiding_Monastery" 
  },
  { 
    name: "Phodong Monastery", 
    location: "North Sikkim", 
    sect: "Kagyu", 
    founded: "1740", 
    history: "Known for its frescoes and annual festivals.", 
    wiki: "https://en.wikipedia.org/wiki/Phodong_Monastery" 
  },
  { 
    name: "Enchey Monastery", 
    location: "Gangtok, East Sikkim", 
    sect: "Nyingma", 
    founded: "1909", 
    history: "Associated with Lama Drupthob Karpo, a tantric master.", 
    wiki: "https://en.wikipedia.org/wiki/Enchey_Monastery" 
  },
  { 
    name: "Ralong Monastery", 
    location: "South Sikkim", 
    sect: "Kagyu", 
    founded: "18th century", 
    history: "Famous for the Kagyed Dance Festival and new monastery built in 1995.", 
    wiki: "https://en.wikipedia.org/wiki/Ralong_Monastery" 
  },
  { 
    name: "Lachung Monastery", 
    location: "Lachung, North Sikkim", 
    sect: "Nyingma", 
    founded: "1880", 
    history: "Built amidst beautiful mountains, known for mask dance festival.", 
    wiki: "https://en.wikipedia.org/wiki/Lachung_Monastery" 
  },
  { 
    name: "Lachen Monastery", 
    location: "Lachen, North Sikkim", 
    sect: "Nyingma", 
    founded: "1858", 
    history: "Known as Ngodrub Choling, it serves as spiritual center for Lachenpas.", 
    wiki: "https://en.wikipedia.org/wiki/Lachen_Monastery" 
  },
  { 
    name: "Dubdi Monastery (Yuksom Monastery)", 
    location: "Yuksom, West Sikkim", 
    sect: "Nyingma", 
    founded: "1701", 
    history: "First monastery established after Buddhism came to Sikkim.", 
    wiki: "https://en.wikipedia.org/wiki/Dubdi_Monastery" 
  },
  { 
    name: "Kartok Monastery", 
    location: "Yuksom, West Sikkim", 
    sect: "Nyingma", 
    founded: "17th century", 
    history: "Important monastery located near Kathok Lake.", 
    wiki: "https://en.wikipedia.org/wiki/Katok_Monastery" 
  },
  { 
    name: "Zong Dog Palri Fo-Brang Gompa", 
    location: "Kalimpong (near Sikkim, often associated with Buddhist circuit)", 
    sect: "Nyingma", 
    founded: "1976", 
    history: "Inaugurated by Dalai Lama, holds 108 volumes of Kangyur.", 
    wiki: "https://en.wikipedia.org/wiki/Zang_Dhok_Palri_Phari_Monastery" 
  },
  { 
    name: "Sanga Choeling Monastery", 
    location: "Pelling, West Sikkim", 
    sect: "Nyingma", 
    founded: "1697", 
    history: "One of the oldest monasteries in Sikkim, founded by Lama Lhatsun Chempo.", 
    wiki: "https://en.wikipedia.org/wiki/Sanga_Choling_Monastery" 
  },
  { 
    name: "Lingdum Monastery (Ranka Monastery)", 
    location: "Ranka, near Gangtok", 
    sect: "Kagyu", 
    founded: "1998", 
    history: "Known for its impressive Tibetan architecture and peaceful setting.", 
    wiki: "https://en.wikipedia.org/wiki/Lingdum_Monastery" 
  },
  { 
    name: "Bongtang Monastery", 
    location: "Near Gangtok, East Sikkim", 
    sect: "Nyingma", 
    founded: "20th century", 
    history: "A smaller monastery known for its calm environment.", 
    wiki: "https://en.wikipedia.org/wiki/Sikkim" 
  },
  { 
    name: "Phensang Monastery", 
    location: "North Sikkim", 
    sect: "Nyingma", 
    founded: "1721", 
    history: "Hosts annual festival before Losoong. Originally built by Lama Jigme Pawo.", 
    wiki: "https://en.wikipedia.org/wiki/Phensang_Monastery" 
  }
];

// Helper function to get all unique sects
export const getSects = () => {
  return [...new Set(monasteries.map(m => m.sect))];
};

// Helper function to get monasteries by sect
export const getMonasteriesBySect = (sect) => {
  return monasteries.filter(m => m.sect.toLowerCase() === sect.toLowerCase());
};

// Helper function to get monasteries by location
export const getMonasteriesByLocation = (location) => {
  return monasteries.filter(m => 
    m.location.toLowerCase().includes(location.toLowerCase())
  );
};

// Helper function to find monastery by name
export const findMonasteryByName = (name) => {
  return monasteries.find(m => 
    m.name.toLowerCase().includes(name.toLowerCase())
  );
};
