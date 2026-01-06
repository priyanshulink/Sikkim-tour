const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

// Import models
const User = require('./models/User');
const Event = require('./models/Event');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected for seeding'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Event.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create Admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@monastery.com',
      password: 'admin123', // Will be hashed by pre-save hook
      role: 'Admin'
    });
    console.log('✅ Admin user created:', admin.email);

    // Create Regular user
    const userPassword = await bcrypt.hash('user123', 10);
    const user = await User.create({
      name: 'Demo User',
      email: 'user@monastery.com',
      password: 'user123', // Will be hashed by pre-save hook
      role: 'User'
    });
    console.log('✅ Regular user created:', user.email);

    // Create Monk user
    const monk = await User.create({
      name: 'Lama Dorje',
      email: 'monk@monastery.com',
      password: 'monk123', // Will be hashed by pre-save hook
      role: 'Monk'
    });
    console.log('✅ Monk user created:', monk.email);

    // Create sample events
    const events = [
      {
        title: 'Losar Festival',
        description: 'Tibetan New Year celebration with traditional dances, prayers, and festivities.',
        monastery: 'Rumtek Monastery',
        location: 'Gangtok, East Sikkim',
        date: new Date('2025-02-10'),
        type: 'Festival',
        createdBy: admin._id,
        isActive: true
      },
      {
        title: 'Saga Dawa',
        description: 'Celebration of Buddha\'s birth, enlightenment, and parinirvana.',
        monastery: 'Tashiding Monastery',
        location: 'Near Yuksom, West Sikkim',
        date: new Date('2025-05-15'),
        type: 'Festival',
        createdBy: admin._id,
        isActive: true
      },
      {
        title: 'Bumchu Festival',
        description: 'Sacred vase ceremony predicting the year\'s fortune.',
        monastery: 'Tashiding Monastery',
        location: 'Near Yuksom, West Sikkim',
        date: new Date('2025-03-05'),
        type: 'Ceremony',
        createdBy: admin._id,
        isActive: true
      }
    ];

    await Event.insertMany(events);
    console.log('✅ Sample events created');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('Admin: admin@monastery.com / admin123');
    console.log('Monk: monk@monastery.com / monk123');
    console.log('User: user@monastery.com / user123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
