# Quick Render Deployment Checklist

## ✅ Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas account created
- [ ] Render account created at https://render.com

---

## 📋 Step-by-Step Deployment

### **Step 1: Setup MongoDB Atlas (5 minutes)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Create" → Select FREE tier (M0)
3. Choose a cloud provider & region
4. Click "Create Cluster"
5. **Security Setup:**
   - Click "Database Access" → Add New User
   - Username: `sikkim_user`
   - Password: Generate strong password (save it!)
   - User Privileges: Atlas Admin
6. **Network Access:**
   - Click "Network Access" → Add IP Address
   - Enter: `0.0.0.0/0` (Allow from anywhere - required for Render)
7. **Get Connection String:**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
   - Replace `myFirstDatabase` with `sikkim_heritage`
   - Save this string - you'll need it!

---

### **Step 2: Deploy Backend on Render**

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. **Connect Repository:**
   - Click "Connect account" → Authorize GitHub
   - Select: `priyanshulink/Sikkim-tour`
4. **Configure Service:**
   - **Name:** `sikkim-backend` (or any name)
   - **Region:** Choose closest to you
   - **Root Directory:** `mern-app/server`
   - **Environment:** Node
   - **Branch:** `main`
   - **Build Command:** `npm install`
   - **Start Command:** `node app.js`
   - **Instance Type:** Free
5. **Add Environment Variables:**
   Click "Advanced" → Add Environment Variables:
   ```
   NODE_ENV = production
   PORT = 3000
   MONGODB_URI = mongodb+srv://sikkim_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sikkim_heritage
   JWT_SECRET = your_random_secret_key_here_change_this
   GEMINI_API_KEY = AIzaSyDkgtrKk5L8XoQbL3ZJRamcIN-Mh4mntmA
   CLIENT_URL = https://your-frontend-name.onrender.com
   ```
6. Click **"Create Web Service"**
7. Wait 5-10 minutes for deployment
8. **Copy your backend URL:** `https://sikkim-backend.onrender.com`

---

### **Step 3: Deploy Frontend on Render**

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Static Site"**
3. **Connect Repository:**
   - Select: `priyanshulink/Sikkim-tour`
4. **Configure Site:**
   - **Name:** `sikkim-frontend` (or any name)
   - **Root Directory:** `mern-app/client`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
   - **Branch:** `main`
5. **Add Environment Variables:**
   ```
   VITE_API_URL = https://sikkim-backend.onrender.com/api
   ```
   (Replace with your actual backend URL from Step 2)
6. Click **"Create Static Site"**
7. Wait 5-10 minutes for deployment
8. **Your frontend URL:** `https://sikkim-frontend.onrender.com`

---

### **Step 4: Update Backend CLIENT_URL**

1. Go to Render Dashboard → Your Backend Service
2. Click "Environment" in left sidebar
3. Find `CLIENT_URL` variable
4. Update to your frontend URL: `https://sikkim-frontend.onrender.com`
5. Click "Save Changes"
6. Service will auto-redeploy

---

### **Step 5: Seed Database with Admin User**

1. In Render Dashboard → Your Backend Service
2. Click "Shell" tab
3. Run these commands:
   ```bash
   node createAdmin.js
   ```
4. You'll see: "Admin user created successfully!"
5. Login credentials:
   - Email: `admin@sikkim.com`
   - Password: `admin123`

---

### **Step 6: Test Your Application**

1. Visit your frontend: `https://sikkim-frontend.onrender.com`
2. Try logging in with:
   - Email: `admin@sikkim.com`
   - Password: `admin123`
3. Test features:
   - [ ] Login works
   - [ ] Dashboard loads
   - [ ] Chatbot responds (or switches to offline mode)
   - [ ] Content displays correctly

---

## 🎉 Deployment Complete!

**Your Live URLs:**
- 🌐 Frontend: `https://sikkim-frontend.onrender.com`
- 🔧 Backend: `https://sikkim-backend.onrender.com`

---

## ⚠️ Important Notes

### Free Tier Limitations:
- Services **sleep after 15 minutes** of inactivity
- First request after sleep takes **30-60 seconds** to wake up
- 750 hours/month limit (enough for 1 service 24/7)

### Keep Services Awake (Optional):
Use a service like **UptimeRobot** (free) to ping your services every 5 minutes:
1. Sign up at https://uptimerobot.com
2. Add monitors for both frontend and backend URLs
3. Set check interval to 5 minutes

---

## 🔧 Troubleshooting

### Backend won't start:
- Check logs: Render Dashboard → Your Service → Logs tab
- Verify `MONGODB_URI` is correct (no spaces, password correct)
- Check if MongoDB Atlas allows IP `0.0.0.0/0`

### Frontend shows "Network Error":
- Verify `VITE_API_URL` points to correct backend URL
- Check backend is running (visit backend URL in browser)
- Look at browser console for CORS errors

### Login doesn't work:
- Verify you ran `node createAdmin.js` in backend shell
- Check MongoDB has the user (use MongoDB Atlas UI)
- Check backend logs for authentication errors

### Gemini API Rate Limit:
- App will auto-switch to offline mode
- Wait 60 seconds for quota to reset
- Or use offline mode permanently

---

## 📚 Additional Resources

- Full Guide: See [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)
- Render Docs: https://render.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com/

---

## 🔄 Updating Your Deployment

When you make code changes:
1. `git add .`
2. `git commit -m "Your message"`
3. `git push`
4. Render will **auto-deploy** the changes!

---

## 🆘 Need Help?

If stuck:
1. Check Render service logs
2. Check MongoDB Atlas connection
3. Verify all environment variables are set correctly
4. Review the detailed [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)
