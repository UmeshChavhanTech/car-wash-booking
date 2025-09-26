const express = require('express');
const { checkDatabaseHealth, getDatabaseStats } = require('../config/database');
const serverConfig = require('../config/server');
const logger = require('../middleware/logger');

const router = express.Router();

// Health check endpoint
router.get('/', async (req, res) => {
  try {
    const dbHealth = await checkDatabaseHealth();
    const serverInfo = serverConfig.getServerInfo();
    const appInfo = serverConfig.getAppInfo();

    const healthStatus = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: appInfo.environment,
      database: dbHealth,
      server: serverInfo,
      application: {
        name: appInfo.name,
        version: appInfo.version,
        nodeVersion: appInfo.nodeVersion
      }
    };

    res.json({
      success: true,
      data: healthStatus
    });
  } catch (error) {
    logger.error('Health check failed:', error);
    res.status(503).json({
      success: false,
      message: 'Service unavailable',
      error: error.message
    });
  }
});

// Database stats endpoint (protected in production)
router.get('/database', async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const stats = await getDatabaseStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    logger.error('Database stats fetch failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch database stats',
      error: error.message
    });
  }
});

// API status endpoint
router.get('/status', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'operational',
      timestamp: new Date().toISOString(),
      version: serverConfig.app.version,
      environment: serverConfig.environment
    }
  });
});

module.exports = router;