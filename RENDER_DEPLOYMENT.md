# Render Deployment Guide

## Prerequisites
1. GitHub account with the repository pushed
2. Render account (https://render.com)
3. MongoDB Atlas account for database (https://www.mongodb.com/cloud/atlas)

## Step-by-Step Deployment

### 1. Setup MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Get your connection string (should look like: `mongodb+srv://username:password@cluster.mongodb.net/sikkim_heritage`)
5. Whitelist all IPs (0.0.0.0/0) for Render access

### 2. Deploy to Render

#### Option A: Using render.yaml (Recommended)
1. Go to https://render.com/dashboard
2. Click "New" → "Blueprint"
3. Connect your GitHub repository: `https://github.com/priyanshulink/Sikkim-tour`
4. Render will detect the `render.yaml` file
5. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a random secret key
6. Click "Apply" to deploy all services

#### Option B: Manual Deployment

##### Deploy Backend Service
1. Click "New" → "Web Service"
2. Connect GitHub repo
3. Configure:
   - **Name**: sikkim-tour-backend
   - **Root Directory**: mern-app/server
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js`
   - **Environment**: Node
4. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=3000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_random_secret_key
   GEMINI_API_KEY=AIzaSyC902oeRirX6z9FCzWzkCg9J_uv8HxyWEI
   ```

##### Deploy Frontend Service
1. Click "New" → "Static Site"
2. Connect GitHub repo
3. Configure:
   - **Name**: sikkim-tour-frontend
   - **Root Directory**: mern-app/client
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: dist
4. Add Environment Variables:
   ```
   VITE_API_URL=https://sikkim-tour-backend.onrender.com/api
   ```

##### Deploy Preservation Backend
1. Click "New" → "Web Service"
2. Connect GitHub repo
3. Configure:
   - **Name**: monastery-preservation-backend
   - **Root Directory**: Monastery-Preservation/backend
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   PYTHON_SERVICE_URL=https://monastery-python-service.onrender.com
   CLIENT_URL=https://sikkim-tour-frontend.onrender.com
   ```

##### Deploy Python AI Service
1. Click "New" → "Web Service"
2. Connect GitHub repo
3. Configure:
   - **Name**: monastery-python-service
   - **Root Directory**: Monastery-Preservation/python-service
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`
   - **Environment**: Python 3
4. Add Environment Variables:
   ```
   PORT=5001
   FLASK_ENV=production
   ```

### 3. Update Frontend Environment
After deployment, update the frontend to point to your backend URL:
- Go to Render dashboard → sikkim-tour-frontend → Environment
- Update `VITE_API_URL` to your backend URL
- Trigger a manual redeploy

### 4. Seed Database
After backend is deployed:
1. Open Render Shell for backend service
2. Run: `node seed.js`
3. Run: `node seedEducation.js`
4. Run: `node seedMonks.js`

### 5. Test Your Deployment
1. Visit your frontend URL: `https://sikkim-tour-frontend.onrender.com`
2. Test all features:
   - Login/Register
   - Educational content
   - Monk profiles
   - Preservation system
   - Chatbot

## Important Notes

### Free Tier Limitations
- Services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- 750 hours/month free tier limit

### URLs After Deployment
- Frontend: `https://sikkim-tour-frontend.onrender.com`
- Backend: `https://sikkim-tour-backend.onrender.com`
- Preservation Backend: `https://monastery-preservation-backend.onrender.com`
- Python Service: `https://monastery-python-service.onrender.com`

### Environment Variables Required
**Backend:**
- MONGODB_URI (from MongoDB Atlas)
- JWT_SECRET (random secret key)
- GEMINI_API_KEY (already provided)

**Frontend:**
- VITE_API_URL (backend URL)

**Preservation Backend:**
- MONGODB_URI (same as main backend)
- PYTHON_SERVICE_URL (Python service URL)

### Troubleshooting

**Service won't start:**
- Check logs in Render dashboard
- Verify environment variables are set correctly
- Ensure MongoDB connection string is correct

**CORS errors:**
- Update CORS settings in backend to include your Render URLs
- Add your frontend URL to allowed origins

**Database connection fails:**
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check connection string format
- Ensure database user has read/write permissions

## Custom Domain (Optional)
1. Go to your service settings
2. Click "Custom Domain"
3. Add your domain
4. Update DNS records as instructed

## Monitoring
- Check service logs in Render dashboard
- Set up alerts for service failures
- Monitor database usage in MongoDB Atlas

## Support
For issues:
- Render Docs: https://render.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
