# Quick Start Guide

## Installation & Setup

### Method 1: Automated Setup (Recommended for Windows)

```powershell
# Run this command in PowerShell from the project root
.\setup.ps1
```

This will:
- Check Node.js installation
- Install all dependencies (backend, frontend, and root)
- Create .env files from templates
- Display next steps

### Method 2: Manual Setup

```bash
# 1. Install all dependencies
npm run install-all

# 2. Configure backend
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# 3. Configure frontend
cd ../frontend
cp .env.example .env
# Defaults work for local development

# 4. Return to root
cd ..
```

## Running the Application

### Development Mode (Both servers)
```bash
npm run dev
```
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

### Individual Servers
```bash
# Backend only
cd backend
npm run dev

# Frontend only
cd frontend
npm start
```

### Production Mode
```bash
# Build frontend
npm run build

# Start backend
npm start
```

## Environment Configuration

### Backend (.env)
```env
# Required
MONGO_URI=mongodb://localhost:27017/bookreview
JWT_SECRET=your_secret_key_min_32_characters_long

# Optional (with defaults)
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Generate JWT Secret:**
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# PowerShell
[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([System.Guid]::NewGuid().ToString() + [System.Guid]::NewGuid().ToString()))
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

## MongoDB Setup

### Option 1: Local MongoDB
```bash
# Install MongoDB Community Server
# Download from: https://www.mongodb.com/try/download/community

# Start MongoDB (Windows)
net start MongoDB

# Start MongoDB (Linux/Mac)
mongod
```

### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Add your IP to whitelist
4. Create database user
5. Get connection string
6. Update MONGO_URI in backend/.env

## Testing the Installation

### 1. Check Backend
```bash
# Visit in browser or use curl
curl http://localhost:5000/

# Should return:
# {"status":"OK","message":"Book Review Platform API is running",...}
```

### 2. Check Frontend
```bash
# Visit in browser
# http://localhost:3000

# Should show the home page with navigation
```

### 3. Test User Registration
1. Go to http://localhost:3000/register
2. Create a new account
3. Login with credentials
4. Add a book
5. Write a review

## Common Commands

```bash
# Install dependencies
npm run install-all          # All packages
npm install                  # Root only

# Development
npm run dev                  # Both servers
npm run start                # Backend production
cd frontend && npm start     # Frontend only
cd backend && npm run dev    # Backend only

# Building
npm run build                # Build frontend

# Cleaning
rm -rf node_modules          # Remove dependencies
rm -rf */node_modules        # Remove all dependencies
```

## Troubleshooting

### Port Already in Use
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error
- Verify MongoDB is running
- Check MONGO_URI format
- Ensure network access if using Atlas
- Check firewall settings

### Package Installation Fails
```bash
# Clear npm cache
npm cache clean --force

# Delete lock files and node_modules
rm -rf node_modules package-lock.json
rm -rf */node_modules */package-lock.json

# Reinstall
npm run install-all
```

### React Version Conflicts
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## Project Structure Overview

```
book-review-platform/
├── backend/           # Express.js API server
├── frontend/          # React application
├── setup.ps1          # Automated setup script
├── package.json       # Root package with scripts
└── README.md          # This file
```

## Default Credentials

No default credentials - you must register a new account.

## API Testing

Use tools like:
- **Postman**: https://www.postman.com/
- **Thunder Client**: VS Code extension
- **curl**: Command line

Example API calls:
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get books
curl http://localhost:5000/api/books
```

## Next Steps

1. ✅ Setup complete
2. ✅ Servers running
3. 📝 Register an account
4. 📚 Add some books
5. ⭐ Write reviews
6. 🎨 Customize the application
7. 🚀 Deploy to production

## Support

- Check DOCUMENTATION.md for detailed information
- Review code comments for implementation details
- Test each feature thoroughly

## Deployment Ready

Once working locally, the app is ready to deploy to:
- **Backend**: Render, Heroku, Railway, AWS
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Database**: MongoDB Atlas (recommended)

See DOCUMENTATION.md for deployment guides.
