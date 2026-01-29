require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const deleteUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB\n');

    const user = await User.findOneAndDelete({ email: 'admin@mpheritage.com' });
    
    if (!user) {
      console.log('⚠️  User not found: admin@mpheritage.com');
      process.exit(0);
    }

    console.log('✅ User deleted successfully!');
    console.log(`   📧 Email: ${user.email}`);
    console.log(`   👤 Name: ${user.name}`);
    console.log(`   Role: ${user.role}\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

deleteUser();
