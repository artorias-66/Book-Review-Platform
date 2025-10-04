# 🚀 Deployment Guide - Book Review Platform

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend
1. **Push your code to GitHub** (if not already done)
2. **Go to [Vercel](https://vercel.com)**
3. **Sign up/Login** with GitHub
4. **Click "New Project"**
5. **Import your repository**
6. **Set the following:**
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

### Step 2: Set Environment Variables in Vercel
In Vercel dashboard, go to your project → Settings → Environment Variables:

```
REACT_APP_API_URL = https://your-backend-url.railway.app/api
```

### Step 3: Deploy
Click "Deploy" and wait for deployment to complete.

---

## Backend Deployment (Railway)

### Step 1: Prepare Backend
1. **Go to [Railway](https://railway.app)**
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**
6. **Set Root Directory to `backend`**

### Step 2: Set Environment Variables in Railway
In Railway dashboard, go to your project → Variables:

```
MONGO_URI = mongodb+srv://username:password@cluster.mongodb.net/book-review-platform?retryWrites=true&w=majority
JWT_SECRET = your-super-secret-jwt-key-change-this-in-production
PORT = 5000
```

### Step 3: Deploy
Railway will automatically deploy your backend.

---

## Alternative: Deploy Both to Vercel

### Backend on Vercel (Serverless)
1. **Create `api` folder in root directory**
2. **Move backend files to `api` folder**
3. **Create `vercel.json` in root:**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build"
    },
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ]
}
```

---

## Quick Deploy Commands

### Option 1: Vercel CLI (Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy frontend
cd frontend
vercel

# Set environment variable
vercel env add REACT_APP_API_URL
```

### Option 2: Railway CLI (Backend)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy backend
cd backend
railway init
railway up
```

---

## After Deployment

1. **Update frontend environment variable** with your backend URL
2. **Test the deployed app**
3. **Update CORS settings** if needed
4. **Set up custom domain** (optional)

---

## Troubleshooting

### Common Issues:
- **CORS errors**: Add your frontend URL to backend CORS settings
- **Environment variables**: Make sure they're set correctly
- **Build errors**: Check Node.js version compatibility
- **Database connection**: Verify MongoDB Atlas connection string

### Support:
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
