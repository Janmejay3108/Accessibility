# Railway Deployment Guide for Accessibility Analyzer

## 🚂 Quick Deployment Steps

### 1. Backend Deployment
1. Go to [Railway.app](https://railway.app) and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `Janmejay3108/Accessibility` repository
4. Railway will auto-detect Node.js and deploy the backend

### 2. Environment Variables Setup
Add these environment variables in Railway dashboard:

**Required Variables:**
```
NODE_ENV=production
PORT=3000
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY=your-firebase-private-key
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
```

**Optional Variables:**
```
CORS_ORIGIN=https://your-frontend-domain.railway.app
```

### 3. Frontend Deployment
1. Create a new service in the same Railway project
2. Connect the same GitHub repository
3. Set the root directory to `/frontend`
4. Add environment variable: `REACT_APP_API_URL=https://your-backend-domain.railway.app`

### 4. Custom Domains (Optional)
- Backend: `your-app-backend.railway.app`
- Frontend: `your-app-frontend.railway.app`

## 🔧 Configuration Files

### railway.json
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Procfile
```
web: npm start
```

## 🎯 Key Advantages of Railway

✅ **Playwright Support**: Full container environment supports browser automation
✅ **No Time Limits**: Long-running accessibility scans work perfectly
✅ **Express.js Compatible**: Your current architecture works as-is
✅ **Easy Environment Variables**: Simple Firebase integration
✅ **Automatic HTTPS**: SSL certificates included
✅ **Git-based Deployment**: Auto-deploy on git push

## 🚀 Post-Deployment

1. Test your backend API endpoints
2. Verify Playwright browser automation works
3. Test accessibility scanning functionality
4. Configure CORS for frontend-backend communication
5. Set up custom domains if needed

## 💡 Troubleshooting

- **Playwright Issues**: Railway's container environment fully supports Playwright
- **Memory Issues**: Upgrade to Hobby plan ($5/month) if needed
- **Build Failures**: Check logs in Railway dashboard
- **CORS Errors**: Ensure CORS_ORIGIN is set correctly

Your Accessibility Analyzer will have 100% functionality on Railway! 🎉
