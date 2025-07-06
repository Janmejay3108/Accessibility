const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Initialize Firebase Admin SDK
const { initializeFirebase } = require('./config/firebase-admin');

const app = express();
const PORT = process.env.PORT || 8080;

// Initialize Firebase on startup
try {
  initializeFirebase();
} catch (error) {
  console.error('Failed to initialize Firebase:', error);
  process.exit(1);
} // Fixed: Added missing closing brace

// Middleware
app.use(helmet()); // Security headers

// Fixed: Proper CORS configuration for Railway deployment
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'https://frontend-production-6de4.up.railway.app',
      'http://localhost:3000',
      'http://localhost:3001'
    ];

    // Allow any Railway frontend URL pattern
    if (origin.includes('.up.railway.app') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Accessibility Analyzer API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('Health check accessed');
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
    version: '1.0.4-force-deploy',
    deployTime: new Date().toISOString()
  });
});

// Debug endpoint to check configuration - Updated for Railway deployment
app.get('/debug', (req, res) => {
  console.log('Debug endpoint accessed at:', new Date().toISOString());
  res.status(200).json({
    status: 'debug',
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
    firebase: {
      projectId: process.env.FIREBASE_PROJECT_ID ? 'configured' : 'missing',
      privateKey: process.env.FIREBASE_PRIVATE_KEY ? 'configured' : 'missing',
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL ? 'configured' : 'missing'
    },
    playwright: {
      installed: require('fs').existsSync(require('path').join(__dirname, 'node_modules', 'playwright'))
    },
    timestamp: new Date().toISOString(),
    version: '1.0.2',
    deploymentCheck: 'Railway deployment working'
  });
});

// API routes
app.use('/api', require('./routes/index'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Fixed: Added host binding for Railway deployment
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Backend accessible on Railway platform`);
});

module.exports = app;
