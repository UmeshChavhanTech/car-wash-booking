const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config();

// Import configurations and middleware
const { connectDatabase } = require('./config/database');
const { configureCors, handlePreflight } = require('./middleware/cors');
const { limiter, createBookingLimiter } = require('./middleware/auth');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const bookingRoutes = require('./routes/bookings');
const healthRoutes = require('./routes/health');

const app = express();

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// CORS middleware
app.use(configureCors());
app.use(handlePreflight);

// Rate limiting
app.use(limiter);
app.use('/api/bookings', createBookingLimiter);

// Logging middleware
app.use(logger.simple);

// Body parsing middleware
app.use(express.json({ limit: process.env.API_MAX_PAYLOAD_SIZE || '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/health', healthRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Car Wash Booking API',
    version: '1.0.0',
    documentation: '/api/docs',
  });
});

// API documentation route
app.get('/api/docs', (req, res) => {
  res.json({
    endpoints: {
      bookings: {
        'GET /api/bookings': 'Get all bookings with optional filters',
        'GET /api/bookings/:id': 'Get booking by ID',
        'POST /api/bookings': 'Create new booking',
        'PUT /api/bookings/:id': 'Update booking',
        'DELETE /api/bookings/:id': 'Delete booking',
        'GET /api/bookings/search': 'Search bookings',
      },
      health: {
        'GET /api/health': 'Check API health status',
      },
    },
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Database connection and server start
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();

    // Start server
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      logger.log(`🚀 Server running on port ${PORT}`);
      logger.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.log(`📊 Database: ${process.env.DB_NAME}`);
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal) => {
      logger.log(`Received ${signal}. Starting graceful shutdown...`);

      server.close(async () => {
        logger.log('HTTP server closed.');

        await mongoose.connection.close();
        logger.log('Database connection closed.');

        process.exit(0);
      });

      setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

module.exports = app;
