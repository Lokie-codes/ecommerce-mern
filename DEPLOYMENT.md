# Deployment Guide

This guide covers deploying the MERN ecommerce application to various platforms.

## Prerequisites

- MongoDB database (MongoDB Atlas recommended)
- Node.js hosting service
- Domain name (optional)

## Environment Setup

### 1. Database Setup (MongoDB Atlas)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with password
4. Whitelist IP addresses (0.0.0.0/0 for allow all, or specific IPs)
5. Get your connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/ecommerce
   ```

### 2. Backend Deployment

#### Option A: Heroku

1. Install Heroku CLI
2. Login to Heroku:
   ```bash
   heroku login
   ```

3. Create a new Heroku app:
   ```bash
   cd backend
   heroku create your-app-name
   ```

4. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_atlas_connection_string"
   heroku config:set JWT_SECRET="your_secret_key"
   heroku config:set NODE_ENV="production"
   ```

5. Deploy:
   ```bash
   git push heroku main
   ```

#### Option B: Railway

1. Create account at [Railway](https://railway.app/)
2. Create new project
3. Connect GitHub repository
4. Select backend directory as root
5. Add environment variables in Railway dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
6. Deploy automatically on push

#### Option C: Render

1. Create account at [Render](https://render.com/)
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables
6. Deploy

#### Option D: DigitalOcean App Platform

1. Create DigitalOcean account
2. Create new App
3. Connect GitHub repository
4. Select Node.js
5. Configure environment variables
6. Deploy

### 3. Frontend Deployment

#### Option A: Vercel (Recommended for React)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   cd frontend
   vercel
   ```

3. Set environment variable:
   - In Vercel dashboard, set `REACT_APP_API_URL` to your backend URL

4. Update frontend/package.json to remove proxy and use the environment variable in api.js

#### Option B: Netlify

1. Create account at [Netlify](https://www.netlify.com/)
2. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
3. Drag and drop `build` folder to Netlify
4. Or connect GitHub repository for automatic deployments

#### Option C: GitHub Pages

1. Add homepage to frontend/package.json:
   ```json
   "homepage": "https://yourusername.github.io/ecommerce-mern"
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add deploy scripts to frontend/package.json:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## Full Stack Deployment

### Docker Deployment

1. Create `docker-compose.yml` in root:
   ```yaml
   version: '3.8'
   services:
     backend:
       build: ./backend
       ports:
         - "5000:5000"
       environment:
         - MONGODB_URI=${MONGODB_URI}
         - JWT_SECRET=${JWT_SECRET}
       depends_on:
         - mongo
     
     frontend:
       build: ./frontend
       ports:
         - "3000:3000"
       depends_on:
         - backend
     
     mongo:
       image: mongo:latest
       ports:
         - "27017:27017"
       volumes:
         - mongo-data:/data/db

   volumes:
     mongo-data:
   ```

2. Create Dockerfile in backend and frontend directories

3. Run:
   ```bash
   docker-compose up
   ```

## Post-Deployment

### 1. Seed the Database

If using the seeder script:
```bash
# SSH into your server or use the platform's console
cd backend
npm run seed
```

Or create products manually using the API.

### 2. Test the Application

- Test user registration and login
- Test product browsing
- Test cart and checkout functionality
- Test order placement

### 3. Configure CORS

Update backend/server.js to allow only your frontend domain:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

### 4. Enable HTTPS

- Most platforms provide free SSL certificates
- Ensure all API calls use HTTPS in production

### 5. Monitor and Optimize

- Set up error logging (e.g., Sentry)
- Monitor performance
- Set up analytics (optional)
- Configure backup for database

## Environment Variables Summary

### Backend
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

### Frontend
- `REACT_APP_API_URL` - Backend API URL (if not using proxy)

## Troubleshooting

### CORS Errors
- Ensure backend CORS is configured to allow frontend domain
- Check if backend URL is correct in frontend

### Database Connection Issues
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has proper permissions

### 404 Errors on Refresh (Frontend)
- Configure server to serve index.html for all routes
- Add `_redirects` file for Netlify: `/* /index.html 200`
- Add `vercel.json` for Vercel

### API Not Responding
- Check if backend is running
- Verify environment variables are set
- Check logs for errors

## Security Checklist

Before going live:
- [ ] Change JWT_SECRET to a strong random value
- [ ] Enable HTTPS
- [ ] Configure proper CORS origins
- [ ] Add rate limiting
- [ ] Add security headers (helmet)
- [ ] Enable MongoDB authentication
- [ ] Set NODE_ENV to production
- [ ] Remove or secure seeder script
- [ ] Add input validation
- [ ] Set up monitoring and logging

## Cost Considerations

Free tiers available:
- MongoDB Atlas: 512MB free
- Heroku: 1 dyno free (with credit card)
- Vercel: Unlimited for personal projects
- Netlify: 100GB bandwidth free
- Railway: $5 credit/month free
- Render: Free tier available

## Support

For deployment issues:
- Check platform-specific documentation
- Review application logs
- Check MongoDB Atlas logs
- Test API endpoints individually
