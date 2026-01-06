const mongoose = require('mongoose');
const dotenv = require('dotenv');
const EducationCategory = require('./models/EducationCategory');
const EducationContent = require('./models/EducationContent');

dotenv.config();

const categories = [
  {
    name: 'Monasteries',
    description: 'Learn about the sacred monasteries of Sikkim',
    icon: '🏯',
    color: '#ff9a56'
  },
  {
    name: 'Culture',
    description: 'Discover Sikkimese traditions and customs',
    icon: '🎭',
    color: '#667eea'
  },
  {
    name: 'Wildlife',
    description: 'Explore the diverse flora and fauna',
    icon: '🦋',
    color: '#28a745'
  },
  {
    name: 'Festivals',
    description: 'Experience colorful festivals and celebrations',
    icon: '🎉',
    color: '#ff6a88'
  },
  {
    name: 'History',
    description: 'Journey through Sikkim\'s rich history',
    icon: '📜',
    color: '#764ba2'
  }
];

const generateContent = async (categoryId, categoryName) => {
  const contentMap = {
    'Monasteries': [
      {
        title: 'Rumtek Monastery',
        description: 'The Rumtek Monastery, also called the Dharmachakra Centre, is one of the largest monasteries in Sikkim. It was built in 1966 and serves as the seat of the Karmapa Lama. The monastery is known for its stunning architecture, featuring traditional Tibetan designs, golden stupas, and intricate murals depicting Buddhist teachings.',
        type: 'spin',
        image: '/img/RumtekMonastery.jpeg'
      },
      {
        title: 'Pemayangtse Monastery',
        description: 'Founded in 1705, Pemayangtse is one of the oldest and most important monasteries in Sikkim. Located in Pelling, it belongs to the Nyingma order. The monastery houses rare Buddhist artifacts, including a seven-tiered wooden sculpture depicting the heavenly palace of Guru Rinpoche.',
        type: 'flashcard',
        image: '/img/PemayangtseMonastery.jpeg'
      },
      {
        title: 'Tashiding Monastery',
        description: 'Perched on a hilltop, Tashiding Monastery is considered one of the most sacred in Sikkim. According to legend, a single glimpse of this monastery cleanses all sins. It was founded in 1641 and offers breathtaking views of the surrounding valleys and mountains.',
        type: 'spin',
        image: '/img/TashidingMonastery.jpeg'
      },
      {
        question: 'When was Rumtek Monastery built?',
        options: ['1956', '1966', '1976', '1986'],
        correctAnswer: 1,
        explanation: 'Rumtek Monastery was built in 1966 and serves as the seat of the Karmapa Lama. It is also known as the Dharmachakra Centre and is one of the largest monasteries in Sikkim.',
        type: 'quiz'
      },
      {
        question: 'Which monastery is considered one of the most sacred in Sikkim, believed to cleanse sins with a single glimpse?',
        options: ['Rumtek Monastery', 'Pemayangtse Monastery', 'Tashiding Monastery', 'Enchey Monastery'],
        correctAnswer: 2,
        explanation: 'Tashiding Monastery, founded in 1641, is considered one of the most sacred monasteries in Sikkim. According to legend, a single glimpse of this hilltop monastery cleanses all sins.',
        type: 'quiz'
      },
      {
        question: 'To which Buddhist order does Pemayangtse Monastery belong?',
        options: ['Kagyu', 'Gelug', 'Nyingma', 'Sakya'],
        correctAnswer: 2,
        explanation: 'Pemayangtse Monastery belongs to the Nyingma order, the oldest of the four major schools of Tibetan Buddhism. Founded in 1705, it is one of the oldest and most important monasteries in Sikkim.',
        type: 'quiz'
      }
    ],
    'Culture': [
      {
        title: 'Traditional Dress',
        description: 'The traditional dress of Sikkimese women is called "Kho" or "Bakhu" - a loose, cloak-style garment worn with a silk blouse called "Honju". Men wear "Bakhu" too, paired with traditional caps. These garments reflect the Tibetan and Bhutanese cultural influences in Sikkim.',
        type: 'flashcard',
        image: '/img/Shuruval-and-Pharia.webp'
      },
      {
        title: 'Mask Dance (Cham)',
        description: 'Cham is a sacred masked dance performed by Buddhist monks during festivals. Dancers wear elaborate costumes and colorful masks representing deities, demons, and animals. The dance tells stories from Buddhist mythology and is believed to ward off evil spirits.',
        type: 'spin',
        image: '/img/chamdance-1.png'
      },
      {
        title: 'Thangka Paintings',
        description: 'Thangka are traditional Buddhist paintings on cotton or silk depicting deities, mandalas, and scenes from Buddha\'s life. These sacred artworks are used as meditation aids and teaching tools. Sikkim has a rich tradition of Thangka painting passed down through generations.',
        type: 'flashcard',
        image: '/img/Thangka_of_Buddha_2bf6f88c-400b-425e-b6b6-14937b4e9231.webp'
      }
    ],
    'Wildlife': [
      {
        title: 'Red Panda',
        description: 'The Red Panda is the state animal of Sikkim. These adorable creatures live in the temperate forests of the Eastern Himalayas. Despite their name, Red Pandas are not closely related to giant pandas. They spend most of their time in trees and primarily eat bamboo.',
        type: 'spin',
        image: 'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?w=800'
      },
      {
        title: 'Snow Leopard',
        description: 'The elusive Snow Leopard inhabits the high-altitude regions of Sikkim. These magnificent cats are perfectly adapted to cold, mountainous terrain with their thick fur and long tail. They are endangered, with fewer than 7,000 remaining in the wild.',
        type: 'flashcard',
        image: '/img/SnowLeopard,png.jpg'
      },
      {
        title: 'Rhododendrons',
        description: 'Sikkim is home to over 40 species of rhododendrons, including the state tree - the Noble Dendrobium. During spring, the hillsides burst into spectacular displays of red, pink, white, and purple blooms, creating a breathtaking natural spectacle.',
        type: 'spin',
        image: '/img/Rhododendrons.jpg'
      }
    ],
    'Festivals': [
      {
        title: 'Losar Festival',
        description: 'Losar marks the Tibetan New Year and is celebrated with great enthusiasm in Sikkim. Festivities include traditional dances, folk songs, archery competitions, and elaborate feasts. Monasteries are beautifully decorated, and special prayers are offered for prosperity.',
        type: 'spin',
        image: '/img/bhutan-losar-new-year.jpg'
      },
      {
        title: 'Saga Dawa',
        description: 'Saga Dawa commemorates the birth, enlightenment, and death of Buddha. It is the most sacred Buddhist festival. Devotees circumambulate monasteries, chant prayers, and perform acts of charity. The celebrations culminate in a grand procession and religious ceremonies.',
        type: 'flashcard',
        image: '/img/Saga Dawa.jpg'
      },
      {
        title: 'Bumchu Festival',
        description: 'Held at Tashiding Monastery, Bumchu is a unique water divination ceremony. A sacred pot sealed 300 years ago is opened, and the water level inside predicts the coming year\'s fortunes - overflow means floods, less water means drought, and normal level means prosperity.',
        type: 'spin',
        image: '/img/bumchuk.jpg'
      }
    ],
    'History': [
      {
        title: 'The Namgyal Dynasty',
        description: 'The Namgyal Dynasty ruled Sikkim from 1642 to 1975. Founded by Phuntsog Namgyal, who was consecrated as the first Chogyal (king), the dynasty maintained Sikkim\'s independence through strategic alliances and diplomatic skills despite pressure from neighboring powers.',
        type: 'flashcard',
        image: '/img/The-Namgyal-Dynasty-of-Ladakh-A-History-and-Cultural-Legacy.jpeg.jpg'
      },
      {
        title: 'British Protectorate Era',
        description: 'From 1861 to 1947, Sikkim was a British protectorate following the Treaty of Tumlong. While the Chogyal retained internal autonomy, Britain controlled foreign affairs and defense. This period brought modernization but also limited Sikkim\'s sovereignty.',
        type: 'flashcard',
        image: '/img/british.jpg'
      },
      {
        title: 'Merger with India',
        description: 'On May 16, 1975, Sikkim officially became the 22nd state of India following a referendum. This ended centuries of monarchy and marked the beginning of democratic governance. The merger brought development opportunities while preserving Sikkim\'s unique cultural identity.',
        type: 'flashcard',
        image: '/img/download.jpg'
      }
    ]
  };

  const contents = contentMap[categoryName] || [];
  return contents.map(content => ({
    ...content,
    category: categoryId
  }));
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await EducationCategory.deleteMany({});
    await EducationContent.deleteMany({});
    console.log('🧹 Cleared existing education data');

    // Insert categories
    const insertedCategories = await EducationCategory.insertMany(categories);
    console.log(`✅ Inserted ${insertedCategories.length} categories`);

    // Generate and insert content for each category
    let totalContent = 0;
    for (const category of insertedCategories) {
      const contents = await generateContent(category._id, category.name);
      if (contents.length > 0) {
        await EducationContent.insertMany(contents);
        totalContent += contents.length;
        console.log(`✅ Inserted ${contents.length} content items for ${category.name}`);
      }
    }

    console.log(`\n🎉 Seeding completed successfully!`);
    console.log(`📊 Total categories: ${insertedCategories.length}`);
    console.log(`📚 Total content items: ${totalContent}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
