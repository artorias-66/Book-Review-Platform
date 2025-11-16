# Troubleshooting Guide

## Common Issues and Solutions

### 1. MongoDB Connection Errors

#### Error: "MongooseServerSelectionError: connect ECONNREFUSED"
**Cause**: MongoDB is not running

**Solutions**:
```powershell
# Windows - Start MongoDB service
net start MongoDB

# Or use MongoDB Compass to start it
```

```bash
# Linux/Mac
sudo systemctl start mongod
# or
mongod
```

#### Error: "Authentication failed"
**Cause**: Incorrect credentials in MONGO_URI

**Solution**: 
- Check username and password in MongoDB Atlas
- Ensure special characters in password are URL-encoded
- Example: `mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@your-cluster.mongodb.net/bookreview`
- Special chars need encoding (e.g., @ becomes %40, # becomes %23)

#### Error: "IP not whitelisted"
**Cause**: Your IP is not allowed in MongoDB Atlas

**Solution**:
1. Go to MongoDB Atlas Network Access
2. Add your current IP or use 0.0.0.0/0 (allow all) for development

### 2. Port Already in Use

#### Error: "Port 5000 is already in use"

**Windows Solution**:
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Or change port in backend/.env
PORT=5001
```

**Linux/Mac Solution**:
```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9

# Or change port
export PORT=5001
```

#### Error: "Port 3000 is already in use"

**Solution**:
```bash
# When prompted, press 'y' to run on different port
# Or kill the process on port 3000
```

### 3. Package Installation Issues

#### Error: "npm ERR! code EINTEGRITY"

**Solution**:
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules, package-lock.json
Remove-Item -Recurse -Force frontend/node_modules, frontend/package-lock.json
Remove-Item -Recurse -Force backend/node_modules, backend/package-lock.json

# Reinstall
npm run install-all
```

#### Error: "ERESOLVE unable to resolve dependency tree"

**Solution**:
```bash
# Use legacy peer deps flag
npm install --legacy-peer-deps

# Or update package.json versions
```

### 4. CORS Errors

#### Error: "Access-Control-Allow-Origin header is missing"

**Solution**:
1. Check backend/.env has correct CORS_ORIGIN:
```env
CORS_ORIGIN=http://localhost:3000
```

2. Verify frontend is running on the specified origin

3. Clear browser cache and cookies

4. Restart both servers

### 5. JWT/Authentication Issues

#### Error: "jwt malformed" or "invalid token"

**Solution**:
1. Clear localStorage:
```javascript
// In browser console
localStorage.clear()
```

2. Ensure JWT_SECRET is set in backend/.env

3. Register a new account or login again

#### Error: "jwt expired"

**Solution**:
- Tokens expire after 7 days by default
- Login again to get a new token
- Increase JWT_EXPIRE in backend/.env if needed

### 6. React Build Errors

#### Error: "Module not found: Error: Can't resolve"

**Solution**:
```powershell
cd frontend
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

#### Error: "digital envelope routines::unsupported"

**Solution**:
This was the OpenSSL issue - already fixed in package.json!
No legacy provider flags needed anymore.

### 7. Database Schema Errors

#### Error: "ValidationError: ... is required"

**Cause**: Missing required fields when creating documents

**Solution**:
- Check all required fields are provided
- Review model schema in backend/src/models/
- Ensure form validation is working

#### Error: "E11000 duplicate key error"

**Cause**: Trying to insert duplicate unique value (e.g., email)

**Solution**:
- Use a different email for registration
- Or delete the existing record from MongoDB

### 8. Cannot Create/Edit Books or Reviews

#### Error: "Not authorized" or 401 error

**Solution**:
1. Ensure you're logged in
2. Check token is present:
```javascript
// Browser console
console.log(localStorage.getItem('token'))
```

3. Re-login if token is missing or expired

### 9. Search/Filter Not Working

**Solution**:
1. Check MongoDB text indexes are created
2. Restart backend server to apply indexes
3. Ensure query parameters are being passed correctly

### 10. Images Not Loading

#### Issue: Cover images not displaying

**Solution**:
1. Verify URL is valid and publicly accessible
2. Check image URL starts with http:// or https://
3. Ensure CORS allows image loading
4. Use image hosting services like:
   - Imgur
   - Cloudinary
   - AWS S3

## Development Tips

### Enable Detailed Logging

**Backend**: 
```javascript
// Add to backend/src/app.js
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
```

**Frontend**:
```javascript
// Add to frontend/src/utils/api.js interceptor
console.log('Request:', config);
console.log('Response:', response);
```

### Check Environment Variables

**Backend**:
```powershell
cd backend
node -e "require('dotenv').config(); console.log(process.env)"
```

**Frontend**:
```javascript
// In React component
console.log(process.env)
```

### Test API Endpoints

Use curl or Postman:
```powershell
# Test backend health
curl http://localhost:5000/

# Test books endpoint
curl http://localhost:5000/api/books

# Test with authentication
$token = "your_jwt_token_here"
curl http://localhost:5000/api/books -H "Authorization: Bearer $token"
```

### Reset Database

**MongoDB Local**:
```javascript
// In mongo shell
use bookreview
db.dropDatabase()
```

**MongoDB Atlas**:
- Use MongoDB Compass or Atlas UI
- Delete all collections or entire database

## Performance Issues

### Slow Queries

**Solutions**:
1. Ensure indexes are created (already in models)
2. Limit result sets with pagination
3. Use MongoDB Compass to analyze queries
4. Enable query logging in mongoose

### High Memory Usage

**Solutions**:
1. Limit pagination size
2. Clear browser cache
3. Restart Node.js processes
4. Check for memory leaks with Chrome DevTools

## Browser-Specific Issues

### Chrome
- Clear cache: Ctrl+Shift+Delete
- Disable extensions
- Use Incognito mode for testing

### Firefox
- Clear cache: Ctrl+Shift+Delete
- Disable tracking protection for localhost

### Safari
- Enable Develop menu
- Clear caches
- Allow localhost connections

## Still Having Issues?

### Debugging Steps

1. **Check Console Logs**
   - Browser DevTools Console (F12)
   - Backend terminal output
   
2. **Verify Environment**
   - Node.js version: `node --version` (should be v16+)
   - npm version: `npm --version`
   - MongoDB running: Check services
   
3. **Test Individual Components**
   - Test backend API with Postman
   - Test frontend without API
   - Test database connection separately

4. **Review Code Changes**
   - Check git status
   - Review recent changes
   - Revert to last working version

5. **Clean Install**
   ```powershell
   # Nuclear option - complete reinstall
   Remove-Item -Recurse -Force node_modules, package-lock.json
   Remove-Item -Recurse -Force */node_modules, */package-lock.json
   npm run install-all
   ```

### Getting Help

1. Check error messages carefully
2. Search error messages online
3. Review code comments
4. Check MongoDB logs
5. Use browser DevTools Network tab

### Useful Commands

```powershell
# Check if ports are in use
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# View running processes
Get-Process node

# Check Node.js installation
node --version
npm --version

# View npm configuration
npm config list

# Check MongoDB status (Windows)
sc query MongoDB

# Test network connectivity
Test-NetConnection localhost -Port 5000
Test-NetConnection localhost -Port 3000
```

## Prevention

### Best Practices

1. Always commit working code
2. Use environment variables for configuration
3. Keep dependencies updated (carefully)
4. Test after each significant change
5. Use version control (git)
6. Document any custom configurations
7. Back up database before major changes

### Regular Maintenance

```powershell
# Update dependencies (carefully)
npm outdated
npm update

# Security audit
npm audit
npm audit fix

# Clean up
npm prune
```

## Emergency Recovery

If everything is broken:

1. **Backup current state**
   ```powershell
   git status
   git stash
   ```

2. **Fresh start**
   ```powershell
   git checkout main
   Remove-Item -Recurse -Force node_modules, package-lock.json, */node_modules, */package-lock.json
   npm run install-all
   ```

3. **Restore configuration**
   - Copy .env files
   - Reconfigure as needed

4. **Test step by step**
   - Backend only
   - Frontend only
   - Together

Remember: Most issues are environment-related and can be solved by careful configuration checking!
