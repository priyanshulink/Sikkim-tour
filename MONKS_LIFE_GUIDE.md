# Monk's Life Feature - Complete Guide

## Overview
The **Monk's Life** section is a dedicated spiritual and educational platform where monks can share their teachings, daily routines, and wisdom. This feature is completely separate from the community section and focuses on education and motivation rather than social engagement.

## Key Features

### 1. Role Separation
- **MONK** is a distinct role, separate from regular users
- Monks don't appear in community posts
- Community users don't appear in monk sections
- Clear data separation between monks and users

### 2. Monk Profiles
- Profile photo
- Name and monastery affiliation
- Biography
- Total posts count

### 3. Monk Posts
- Text-based content focused on:
  - Teachings
  - Daily routine
  - Discipline
  - Meditation practices
  - Silence and contemplation
  - Compassion and wisdom

### 4. Categories
- Teaching (📖)
- Daily Routine (🌅)
- Discipline (🧘)
- Meditation (🕉️)
- Silence (🤫)
- Compassion (❤️)
- Wisdom (💡)
- General (✨)

### 5. No Social Features
- No likes or comments
- No social media behavior
- Focus on learning and peace
- View count only (for analytics)

## Backend Implementation

### Models

#### Monk Model (`server/models/Monk.js`)
```javascript
{
  name: String,
  photo: String,
  monastery: String,
  bio: String,
  email: String (unique),
  password: String (hashed),
  role: "MONK" (immutable),
  isActive: Boolean,
  totalPosts: Number
}
```

#### MonkPost Model (`server/models/MonkPost.js`)
```javascript
{
  monk: ObjectId (ref: Monk),
  monkName: String,
  monkPhoto: String,
  monastery: String,
  title: String,
  content: String,
  category: String (enum),
  views: Number,
  isPublished: Boolean,
  createdAt: Date
}
```

### API Endpoints

#### Monk Routes (`/api/monks`)
- `GET /api/monks` - Get all monks (public)
- `GET /api/monks/:id` - Get monk by ID (public)
- `GET /api/monks/:id/posts` - Get monk's posts (public)
- `POST /api/monks` - Create monk (admin only)
- `PUT /api/monks/:id` - Update monk (admin only)
- `DELETE /api/monks/:id` - Delete monk (admin only)
- `POST /api/monks/login` - Monk login

#### Monk Post Routes (`/api/monk-posts`)
- `GET /api/monk-posts` - Get all posts (public, filterable)
- `GET /api/monk-posts/:id` - Get single post (public)
- `POST /api/monk-posts` - Create post (monk only)
- `PUT /api/monk-posts/:id` - Update post (monk owner only)
- `DELETE /api/monk-posts/:id` - Delete post (monk/admin)

### Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Separate login flow for monks
- Middleware updated to support MONK role

## Frontend Implementation

### Pages

#### MonksList (`/monks`)
- Displays all active monks as cards
- Beautiful gradient design
- Shows monk photo, name, monastery, bio preview
- Click to view full profile

#### MonkProfile (`/monks/:id`)
- Full monk information
- All posts by the monk
- Category filters
- Chronological order (newest first)
- Back navigation

### Components

#### MonkCard
- Displays monk summary
- Profile photo with border
- Monastery badge
- Bio preview
- Post count
- Click to navigate to profile

#### MonkPostCard
- Category badge with emoji
- Post title and content
- Date and view count
- Clean, calm design
- No social features

### Routing
```javascript
/monks           → MonksList page (public)
/monks/:id       → MonkProfile page (public)
```

### Navbar
- "Monk's Life" link added
- Visible to all users (public access)
- Positioned between "Monasteries" and "Navigation"

## How to Use

### For Administrators

#### 1. Create a Monk Account
```bash
# Use the seed script to create sample monks
cd server
node seedMonks.js

# Or create via API
POST /api/monks
{
  "name": "Lama Tenzin",
  "email": "tenzin@monastery.com",
  "password": "securePassword",
  "photo": "url-to-photo",
  "monastery": "Rumtek Monastery",
  "bio": "Experienced meditation teacher..."
}
```

#### 2. Seed Sample Data
```bash
cd server
node seedMonks.js
```
This creates:
- 3 sample monks
- 5 posts per monk (15 total)
- Default password: `monk123`

### For Monks

#### 1. Login
```javascript
POST /api/monks/login
{
  "email": "tenzin@monastery.com",
  "password": "monk123"
}
```

#### 2. Create a Post
```javascript
POST /api/monk-posts
Headers: { Authorization: "Bearer <monk-token>" }
{
  "title": "The Art of Meditation",
  "content": "Meditation is a journey...",
  "category": "meditation"
}
```

#### 3. Update a Post
```javascript
PUT /api/monk-posts/:id
Headers: { Authorization: "Bearer <monk-token>" }
{
  "title": "Updated title",
  "content": "Updated content",
  "isPublished": true
}
```

### For Users

#### 1. View All Monks
- Navigate to `/monks`
- Browse monk profiles
- Click any monk to see their teachings

#### 2. View Monk Profile
- Click on a monk card
- See full biography
- Read all their posts
- Filter by category

#### 3. Read Posts
- Posts are displayed chronologically
- Filter by category (teachings, meditation, etc.)
- No comments or likes - focus on learning

## Design Philosophy

### Clean & Calm
- Gradient backgrounds (purple/blue theme)
- White content cards
- Ample spacing
- Smooth transitions
- No clutter

### Spiritual Focus
- Emojis for visual clarity
- Category-based organization
- Chronological flow
- Easy navigation
- Distraction-free reading

### Educational Purpose
- Text-based content
- No social pressure
- Focus on wisdom
- Encourage reflection
- Promote learning

## Database Separation

### Community vs Monk Content
- **Community**: Uses `Story` model
  - Photos, videos, experiences
  - Social features (likes, potentially)
  - Posted by regular users
  
- **Monk Content**: Uses `MonkPost` model
  - Text-based teachings
  - Educational focus
  - Posted by monks only
  - No social features

### Queries
- Community queries filter out monk posts
- Monk queries filter out community posts
- Completely separate data streams

## Security

### Role-Based Access
- Only admins can create monk accounts
- Only monks can create monk posts
- Monks can only edit their own posts
- Admins can delete any content

### Authentication
- Separate login endpoint for monks
- JWT tokens with role information
- Middleware validates role for protected routes

## Testing the Feature

### 1. Seed the Database
```bash
cd server
node seedMonks.js
```

### 2. Start the Server
```bash
cd server
npm start
```

### 3. Start the Client
```bash
cd client
npm run dev
```

### 4. Navigate to Monk's Life
- Open browser: `http://localhost:5173`
- Click "Monk's Life" in navbar
- Browse monks and their teachings

### 5. Test Monk Login (Optional)
- Use credentials from seed output
- Login as a monk
- Create/edit posts

## Future Enhancements

### Potential Features
- Search functionality for posts
- Bookmark favorite teachings
- Print/download posts
- Email subscription for new posts
- Multilingual support
- Audio/video teachings (keeping spiritual focus)
- Scheduled post publishing
- Post drafts

### Analytics for Admins
- Most viewed posts
- Most active monks
- Category popularity
- User engagement metrics

## Troubleshooting

### Common Issues

#### Monks not showing up
- Check if server is running
- Verify database connection
- Run seed script if no monks exist

#### Posts not displaying
- Check if posts exist for the monk
- Verify `isPublished` is true
- Check browser console for errors

#### Authentication errors
- Verify JWT_SECRET is set in .env
- Check token expiration
- Ensure correct role in token

#### Navigation not working
- Clear browser cache
- Check React Router setup
- Verify route definitions

## Files Modified/Created

### Backend
- ✅ `server/models/Monk.js` (new)
- ✅ `server/models/MonkPost.js` (new)
- ✅ `server/controllers/monkController.js` (new)
- ✅ `server/controllers/monkPostController.js` (new)
- ✅ `server/routes/monkRoutes.js` (new)
- ✅ `server/routes/monkPostRoutes.js` (new)
- ✅ `server/middleware/auth.js` (updated)
- ✅ `server/app.js` (updated)
- ✅ `server/seedMonks.js` (new)

### Frontend
- ✅ `client/src/pages/MonksList.jsx` (new)
- ✅ `client/src/pages/MonkProfile.jsx` (new)
- ✅ `client/src/components/MonkCard.jsx` (new)
- ✅ `client/src/components/MonkPostCard.jsx` (new)
- ✅ `client/src/services/api.js` (updated)
- ✅ `client/src/components/Navbar.jsx` (updated)
- ✅ `client/src/App.jsx` (updated)

## Summary

The Monk's Life feature is now fully implemented with:
- ✅ Separate monk role and authentication
- ✅ Complete CRUD operations for monks and posts
- ✅ Beautiful, spiritual UI design
- ✅ Category-based organization
- ✅ Role-based access control
- ✅ Data separation from community
- ✅ Seed script for testing
- ✅ Public access for reading
- ✅ Admin controls for monk management

The feature is ready to use! Run the seed script to populate sample data and start exploring the spiritual teachings.
