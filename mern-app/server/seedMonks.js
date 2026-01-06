const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Monk = require('./models/Monk');
const MonkPost = require('./models/MonkPost');

dotenv.config();

// Sample monk data
const sampleMonks = [
  {
    name: 'Lama Tenzin Dorje',
    email: 'tenzin.dorje@monastery.com',
    password: 'monk123',
    photo: '',
    monastery: 'Rumtek Monastery',
    bio: 'A devoted practitioner of Tibetan Buddhism with over 25 years of meditation experience. Specialized in teaching mindfulness and compassion to seekers from around the world.'
  },
  {
    name: 'Lama Karma Phuntsok',
    email: 'karma.phuntsok@monastery.com',
    password: 'monk123',
    photo: '',
    monastery: 'Pemayangtse Monastery',
    bio: 'Senior monk dedicated to preserving ancient Buddhist teachings. Expert in meditation practices and Buddhist philosophy, guiding students on their spiritual journey.'
  },
  {
    name: 'Lama Sonam Wangchuk',
    email: 'sonam.wangchuk@monastery.com',
    password: 'monk123',
    photo: '',
    monastery: 'Tashiding Monastery',
    bio: 'Meditation master and teacher of Buddhist wisdom. Focuses on helping practitioners develop inner peace, compassion, and understanding through daily practice.'
  }
];

// Sample monk posts
const createSamplePosts = (monkId, monkName, monkPhoto, monastery) => [
  {
    monk: monkId,
    monkName,
    monkPhoto,
    monastery,
    title: 'The Practice of Mindful Breathing',
    content: `In our daily lives, we often forget the simple yet profound practice of mindful breathing. Each breath is a gift, an opportunity to return to the present moment.

When you breathe in, know that you are breathing in. When you breathe out, know that you are breathing out. This simple awareness can transform your entire experience of life.

Start with just five minutes each morning. Sit comfortably, close your eyes, and follow your breath. Notice how the air flows in and out. Feel your chest rise and fall. This is meditation in its purest form.

Through this practice, we cultivate peace within ourselves, and this peace naturally extends to all beings around us.`,
    category: 'meditation'
  },
  {
    monk: monkId,
    monkName,
    monkPhoto,
    monastery,
    title: 'Daily Routine at the Monastery',
    content: `Our day begins at 4:30 AM with the sound of morning prayers. This early hour, when the world is still quiet, is perfect for deep meditation and contemplation.

After morning prayers at 5:00 AM, we engage in personal meditation practice for one hour. The silence of the morning helps us connect deeply with our inner nature.

Breakfast is at 7:00 AM, eaten in mindful silence. We practice eating meditation, being fully present with each bite, grateful for the food that sustains us.

The rest of the morning is dedicated to study and work. We maintain the monastery grounds, tend to the gardens, and continue our scriptural studies. Every action is done with mindfulness and care.

Lunch is at noon, followed by a rest period. Afternoon prayers begin at 3:00 PM, and we end our day with evening meditation at 7:00 PM.

This routine may seem simple, but it creates a foundation for spiritual growth and inner peace.`,
    category: 'daily_routine'
  },
  {
    monk: monkId,
    monkName,
    monkPhoto,
    monastery,
    title: 'The Power of Compassion',
    content: `Compassion is not just a feeling - it is a way of life. It begins with understanding that all beings, without exception, wish to be happy and free from suffering.

When we truly understand this, our hearts naturally open. We see that the person who angers us is also suffering. The person who hurts us is also seeking happiness in misguided ways.

Practicing compassion doesn't mean accepting harmful behavior. It means responding with wisdom rather than reacting with anger. It means setting boundaries while maintaining an open heart.

Every morning, I practice loving-kindness meditation. I start by sending compassion to myself, then to loved ones, then to neutral people, difficult people, and finally to all beings everywhere.

This practice has transformed my life. It has shown me that compassion is not weakness - it is the greatest strength we possess.`,
    category: 'compassion'
  },
  {
    monk: monkId,
    monkName,
    monkPhoto,
    monastery,
    title: 'The Value of Noble Silence',
    content: `In our modern world, we are constantly bombarded with noise - external and internal. The practice of noble silence offers us a refuge from this chaos.

Noble silence is not merely the absence of speech. It is a deep, intentional quieting of the mind and heart. It is creating space for wisdom to arise.

At the monastery, we observe periods of noble silence, especially during retreats. During these times, we do not speak, make eye contact, or engage in any form of communication.

At first, this can be uncomfortable. The mind rebels, wanting to express every thought. But gradually, something shifts. The constant chatter quiets down. We begin to hear the deeper rhythms of existence.

In silence, we discover who we truly are beneath all the noise. We touch peace that was always present but hidden by our constant busyness.

I encourage everyone to practice periods of silence in their daily lives. Even 30 minutes of intentional silence can be transformative.`,
    category: 'silence'
  },
  {
    monk: monkId,
    monkName,
    monkPhoto,
    monastery,
    title: 'Discipline: The Path to Freedom',
    content: `Many people misunderstand discipline, seeing it as a restriction of freedom. But true discipline is actually the path to genuine freedom.

Without discipline, we are slaves to our impulses, emotions, and habitual patterns. We react automatically to every situation, trapped in cycles of suffering.

Spiritual discipline - whether it's maintaining a meditation practice, following ethical precepts, or observing silence - creates space for awareness. In this space, we can choose our responses rather than being driven by unconscious patterns.

The discipline of rising early for meditation might seem difficult at first. But over time, it becomes a source of joy and strength. It gives structure to our lives and clarity to our minds.

Remember: discipline is not about forcing yourself to be someone you're not. It's about creating the conditions for your true nature - which is already wise and compassionate - to shine through.

Start small. Choose one practice and commit to it for 30 days. You'll be amazed at the transformation that follows.`,
    category: 'discipline'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Monk.deleteMany({});
    await MonkPost.deleteMany({});
    console.log('🗑️  Cleared existing monk data');

    // Create monks
    const createdMonks = await Monk.insertMany(sampleMonks);
    console.log(`✅ Created ${createdMonks.length} monks`);

    // Create posts for each monk
    let totalPosts = 0;
    for (const monk of createdMonks) {
      const posts = createSamplePosts(monk._id, monk.name, monk.photo, monk.monastery);
      await MonkPost.insertMany(posts);
      
      // Update monk's total posts count
      monk.totalPosts = posts.length;
      await monk.save();
      
      totalPosts += posts.length;
      console.log(`✅ Created ${posts.length} posts for ${monk.name}`);
    }

    console.log(`\n🎉 Successfully seeded database!`);
    console.log(`   - ${createdMonks.length} monks created`);
    console.log(`   - ${totalPosts} posts created`);
    console.log(`\n📝 Monk Login Credentials:`);
    createdMonks.forEach(monk => {
      console.log(`   - Email: ${monk.email}`);
      console.log(`     Password: monk123`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
