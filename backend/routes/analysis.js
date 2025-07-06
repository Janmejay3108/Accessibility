const express = require('express');
const router = express.Router();
const { verifyFirebaseToken, optionalAuth } = require('../config/firebase-admin');
const {
  createAnalysisRequest,
  getAnalysisRequest,
  getAnalysisResult,
  getUserAnalysisRequests,
  getUserAnalysisResults,
  getAnalysisByUrl,
  getRecentAnalyses,
  getAnalytics,
  getScanStatus,
  triggerScan,
  getHistoricalComparison,
  getViolationAnalysis
} = require('../controllers/analysisController');

// Create new analysis request
router.post('/', optionalAuth, createAnalysisRequest);

// Get analysis request by ID
router.get('/:id', optionalAuth, getAnalysisRequest);

// Get analysis result by analysis request ID
router.get('/:id/result', optionalAuth, getAnalysisResult);

// Get scan status for analysis request
router.get('/:id/status', optionalAuth, getScanStatus);

// Trigger manual scan for analysis request
router.post('/:id/scan', optionalAuth, triggerScan);

// Get user's analysis requests (requires authentication)
router.get('/user/requests', verifyFirebaseToken, getUserAnalysisRequests);

// Get user's analysis results (requires authentication) - for dashboard consistency
router.get('/user/results', verifyFirebaseToken, getUserAnalysisResults);

// Get analysis requests by URL (for longitudinal tracking)
router.get('/url/history', getAnalysisByUrl);

// Get recent public analyses
router.get('/public/recent', getRecentAnalyses);

// Get analytics data (requires authentication for user-specific data)
router.get('/dashboard/analytics', verifyFirebaseToken, getAnalytics);

// Get historical comparison for a URL
router.get('/history/comparison', getHistoricalComparison);

// Get detailed violation analysis for a result
router.get('/:id/violations', optionalAuth, getViolationAnalysis);

// Test endpoint to verify scanning functionality
router.get('/test/scanner', async (req, res) => {
  try {
    const AccessibilityScanner = require('../utils/accessibilityScanner');
    const scanner = new AccessibilityScanner();

    console.log('🧪 Testing scanner initialization...');
    await scanner.initialize();
    console.log('✅ Scanner test successful');
    await scanner.cleanup();

    res.json({
      message: 'Scanner test successful',
      status: 'working',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Scanner test failed:', error);
    res.status(500).json({
      message: 'Scanner test failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
