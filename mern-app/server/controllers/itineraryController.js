const Itinerary = require('../models/Itinerary');

// Comprehensive Sikkim Monasteries with nearby attractions
const sikkimMonasteries = [
  {
    name: "Rumtek Monastery",
    destination: "Gangtok",
    district: "East Sikkim",
    description: "One of the largest monasteries in Sikkim, headquarters of the Karma Kagyu lineage",
    nearbyPlaces: [
      "Lingdum Monastery (7 km)",
      "Ranka Monastery (15 km)",
      "Tsomgo Lake (35 km)",
      "Baba Harbhajan Singh Mandir",
      "Gangtok MG Marg"
    ],
    activities: ["Buddhist rituals", "Architecture photography", "Cultural exploration"],
    bestTime: "March-June, September-December"
  },
  {
    name: "Pemayangtse Monastery",
    destination: "Pelling",
    district: "West Sikkim",
    description: "Ancient monastery with stunning views of Kanchenjunga, one of the oldest in Sikkim",
    nearbyPlaces: [
      "Rabdentse Ruins (1 km)",
      "Khecheopalri Lake (25 km)",
      "Kanchenjunga Falls (28 km)",
      "Sangachoeling Monastery (5 km)",
      "Pelling Skywalk"
    ],
    activities: ["Heritage walk", "Mountain views", "Historical exploration"],
    bestTime: "October-May"
  },
  {
    name: "Enchey Monastery",
    destination: "Gangtok",
    district: "East Sikkim",
    description: "Beautiful monastery in Gangtok with panoramic city views",
    nearbyPlaces: [
      "Ganesh Tok (2 km)",
      "Hanuman Tok (3 km)",
      "Ridge Park",
      "Flower Exhibition Centre",
      "Do Drul Chorten Stupa"
    ],
    activities: ["City monastery tour", "Sunset viewing", "Prayer ceremonies"],
    bestTime: "Year-round"
  },
  {
    name: "Tashiding Monastery",
    destination: "Yuksom",
    district: "West Sikkim",
    description: "Sacred pilgrimage site on a hilltop with spiritual significance",
    nearbyPlaces: [
      "Yuksom village (20 km)",
      "Dubdi Monastery (22 km)",
      "Norbugang Park",
      "Coronation Throne",
      "Kathok Lake"
    ],
    activities: ["Pilgrimage", "Meditation", "Sacred site visit"],
    bestTime: "March-May, October-December"
  },
  {
    name: "Phodong Monastery",
    destination: "Phodong",
    district: "North Sikkim",
    description: "Historic monastery with beautiful murals and traditional architecture",
    nearbyPlaces: [
      "Labrang Monastery (1 km)",
      "Seven Sisters Waterfalls (30 km)",
      "Singhik Viewpoint (15 km)",
      "Mangan town (20 km)",
      "Kabi Longstok"
    ],
    activities: ["Photography", "Cultural exploration", "Scenic viewpoints"],
    bestTime: "March-June, September-November"
  },
  {
    name: "Ralang Monastery",
    destination: "Ravangla",
    district: "South Sikkim",
    description: "Peaceful monastery with Buddha Park nearby",
    nearbyPlaces: [
      "Buddha Park (2 km)",
      "Ralong Hot Springs (5 km)",
      "Temi Tea Garden (15 km)",
      "Maenam Wildlife Sanctuary",
      "Borong village"
    ],
    activities: ["Nature walks", "Tea garden visit", "Buddha statue viewing"],
    bestTime: "March-May, October-December"
  },
  {
    name: "Lachung Monastery",
    destination: "Lachung",
    district: "North Sikkim",
    description: "Remote mountain monastery in scenic Lachung valley",
    nearbyPlaces: [
      "Yumthang Valley (25 km)",
      "Zero Point (50 km)",
      "Hot Springs (24 km)",
      "Katao Valley",
      "Lachung village market"
    ],
    activities: ["Mountain exploration", "Valley tours", "Hot springs visit"],
    bestTime: "April-June, September-November"
  },
  {
    name: "Labrang Monastery",
    destination: "Phodong",
    district: "North Sikkim",
    description: "Ancient monastery near Phodong with traditional practices",
    nearbyPlaces: [
      "Phodong Monastery (1 km)",
      "Tholung Monastery",
      "Phensang Monastery",
      "Mangan Market",
      "Singhik"
    ],
    activities: ["Monastery circuit", "Cultural immersion", "Local interaction"],
    bestTime: "March-June, September-November"
  },
  {
    name: "Dubdi Monastery",
    destination: "Yuksom",
    district: "West Sikkim",
    description: "First monastery of Sikkim, perched on a hilltop",
    nearbyPlaces: [
      "Yuksom village",
      "Tashiding Monastery (18 km)",
      "Khecheopalri Lake (16 km)",
      "Coronation Throne",
      "Norbugang Chorten"
    ],
    activities: ["Historical tour", "Trekking", "First monastery visit"],
    bestTime: "March-May, October-December"
  }
];

// @desc    Generate itinerary - simplified version
// @route   POST /api/itinerary/generate
// @access  Private
exports.generateItinerary = async (req, res) => {
  try {
    const { 
      days, 
      travel_experience, 
      budget_category, 
      season, 
      weather_condition,
      stay_type,
      food_preference,
      recommended_transport
    } = req.body;
    
    // Validate days
    const itineraryDays = days || 3;
    if (itineraryDays < 1 || itineraryDays > 10) {
      return res.status(400).json({
        success: false,
        message: 'Days must be between 1 and 10'
      });
    }
    
    // Select monasteries based on number of days (one per day, excluding first and last)
    const numMonasteries = Math.max(1, itineraryDays - 1); // Reserve last day for departure
    const selectedMonasteries = [];
    const availableMonasteries = [...sikkimMonasteries];
    
    for (let i = 0; i < Math.min(numMonasteries, availableMonasteries.length); i++) {
      const randomIndex = Math.floor(Math.random() * availableMonasteries.length);
      selectedMonasteries.push(availableMonasteries.splice(randomIndex, 1)[0]);
    }
    
    // Calculate cost based on budget
    const costMap = { Low: 2000, Medium: 3500, High: 5500, Luxury: 8000 };
    const dailyCost = costMap[budget_category] || 3500;
    
    // Generate detailed day-wise plan with monastery visits and nearby places
    let planText = '';
    let currentMonasteryIndex = 0;
    
    for (let i = 1; i <= itineraryDays; i++) {
      planText += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      planText += `DAY ${i}`;
      
      if (i === 1) {
        // Arrival Day
        const firstMonastery = selectedMonasteries[0];
        planText += ` - Arrival at ${firstMonastery.destination}\n`;
        planText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        planText += `📍 Destination: ${firstMonastery.district}\n\n`;
        planText += `Morning (9:00 AM - 12:00 PM):\n`;
        planText += `• Arrive at Bagdogra Airport/NJP Railway Station\n`;
        planText += `• Transfer to ${firstMonastery.destination} by ${recommended_transport || 'taxi'} (4-5 hours)\n`;
        planText += `• Check-in at ${stay_type || 'hotel'}\n\n`;
        planText += `Afternoon (12:00 PM - 5:00 PM):\n`;
        planText += `• Lunch with local ${food_preference || 'Both'} cuisine\n`;
        planText += `• Visit ${firstMonastery.name}\n`;
        planText += `• ${firstMonastery.description}\n`;
        planText += `• Explore monastery grounds and attend prayer sessions\n\n`;
        planText += `Evening (5:00 PM - 8:00 PM):\n`;
        planText += `• Nearby attractions: ${firstMonastery.nearbyPlaces[0]}\n`;
        planText += `• Welcome dinner and orientation\n`;
        planText += `• Rest and acclimatization\n`;
        currentMonasteryIndex++;
        
      } else if (i === itineraryDays) {
        // Departure Day
        const lastMonastery = selectedMonasteries[currentMonasteryIndex - 1];
        planText += ` - Departure\n`;
        planText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        planText += `Morning (7:00 AM - 11:00 AM):\n`;
        planText += `• Early breakfast and hotel check-out\n`;
        planText += `• Final visit to ${lastMonastery.name} for blessings\n`;
        planText += `• Shopping for souvenirs and local handicrafts\n\n`;
        planText += `Afternoon (11:00 AM - 2:00 PM):\n`;
        planText += `• Farewell lunch\n`;
        planText += `• Transfer to Bagdogra Airport/NJP Station\n`;
        planText += `• Departure with wonderful memories\n`;
        
      } else {
        // Full exploration days
        const monastery = selectedMonasteries[currentMonasteryIndex];
        planText += ` - ${monastery.name} & Surroundings\n`;
        planText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        planText += `📍 Location: ${monastery.district}\n`;
        planText += `🏛️  Monastery: ${monastery.name}\n\n`;
        
        planText += `Morning (7:00 AM - 12:00 PM):\n`;
        planText += `• Early morning visit to ${monastery.name}\n`;
        planText += `• ${monastery.description}\n`;
        planText += `• Participate in morning prayers and rituals\n`;
        planText += `• Photography and architectural exploration\n`;
        planText += `• Interaction with monks and learning about Buddhist practices\n\n`;
        
        planText += `Afternoon (12:00 PM - 5:00 PM):\n`;
        planText += `• Traditional lunch at local restaurant\n`;
        planText += `• Visit nearby attractions:\n`;
        monastery.nearbyPlaces.slice(0, 3).forEach(place => {
          planText += `  ✓ ${place}\n`;
        });
        planText += `• ${monastery.activities.join(', ')}\n\n`;
        
        planText += `Evening (5:00 PM - 8:00 PM):\n`;
        planText += `• Sunset viewing at scenic points\n`;
        if (monastery.nearbyPlaces.length > 3) {
          planText += `• Optional visit: ${monastery.nearbyPlaces[3]}\n`;
        }
        planText += `• Evening prayer ceremony\n`;
        planText += `• Dinner and leisure time\n`;
        
        currentMonasteryIndex++;
      }
    }
    
    // Prepare monastery list for database
    const monasteryList = selectedMonasteries.map((m, idx) => ({
      name: m.name,
      location: m.district,
      day: idx + 1,
      nearestTown: m.destination,
      experiences: m.activities
    }));
    
    // Create comprehensive destination summary
    const destinations = [...new Set(selectedMonasteries.map(m => m.destination))].join(', ');
    const allNearbyPlaces = selectedMonasteries.flatMap(m => m.nearbyPlaces.slice(0, 2)).join(', ');
    
    // Create itinerary in database
    const itinerary = await Itinerary.create({
      userId: req.user.id,
      userName: req.user.name,
      days: itineraryDays,
      destination: destinations,
      monastery_name: selectedMonasteries.map(m => m.name).join(', '),
      travel_experience: travel_experience || 'Cultural',
      budget_category: budget_category || 'Medium',
      season: season || 'Spring',
      weather_condition: weather_condition || 'Clear',
      stay_type: stay_type || 'Hotel',
      food_preference: food_preference || 'Both',
      recommended_transport: recommended_transport || 'Taxi',
      activity_type: `Visit ${selectedMonasteries.length} monasteries with nearby attractions`,
      daily_plan: planText,
      estimated_daily_cost_inr: dailyCost,
      notes: `This ${itineraryDays}-day tour covers ${selectedMonasteries.length} major monasteries across Sikkim. Nearby attractions include: ${allNearbyPlaces}. Best time to visit: ${season || 'Spring'} season.`,
      title: `${itineraryDays}-Day Sikkim Monastery Circuit`,
      monasteries: monasteryList
    });
    
    res.status(201).json({
      success: true,
      message: 'Itinerary generated successfully',
      itinerary
    });
  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Search itineraries with filters
// @route   GET /api/itinerary/search
// @access  Public
exports.searchItineraries = async (req, res) => {
  try {
    const {
      travel_experience,
      budget_category,
      season,
      days,
      destination,
      stay_type,
      food_preference
    } = req.query;

    const filter = {};
    
    if (travel_experience) filter.travel_experience = travel_experience;
    if (budget_category) filter.budget_category = budget_category;
    if (season) filter.season = season;
    if (days) filter.days = parseInt(days);
    if (destination) filter.destination = new RegExp(destination, 'i');
    if (stay_type) filter.stay_type = stay_type;
    if (food_preference) filter.food_preference = food_preference;

    const itineraries = await Itinerary.find(filter)
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      count: itineraries.length,
      itineraries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's itineraries
// @route   GET /api/itinerary/my-itineraries
// @access  Private
exports.getMyItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: itineraries.length,
      itineraries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single itinerary
// @route   GET /api/itinerary/:id
// @access  Private
exports.getItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    
    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }
    
    // Check authorization
    if (itinerary.userId.toString() !== req.user.id && !itinerary.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this itinerary'
      });
    }
    
    res.status(200).json({
      success: true,
      itinerary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete itinerary
// @route   DELETE /api/itinerary/:id
// @access  Private
exports.deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    
    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }
    
    // Check authorization
    if (itinerary.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this itinerary'
      });
    }
    
    await itinerary.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Itinerary deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
