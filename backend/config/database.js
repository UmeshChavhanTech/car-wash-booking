// config/database.js
const mongoose = require('mongoose');
const logger = require('../middleware/logger');
require('dotenv').config();

const connectDatabase = async () => {
  try {
    // Use full URI from .env if available
    let connectionString = process.env.MONGODB_URI;

    // If URI not set, construct from username/password
    if (!connectionString) {
      const username = encodeURIComponent(process.env.DB_USERNAME || '');
      const password = encodeURIComponent(process.env.DB_PASSWORD || '');
      const dbName = process.env.DB_NAME || 'test';

      if (username && password) {
        connectionString = `mongodb+srv://${username}:${password}@cluster0.evpadth.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;
      } else {
        throw new Error('MongoDB URI or credentials not provided in .env');
      }
    }

    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: parseInt(process.env.DB_SERVER_SELECTION_TIMEOUT) || 30000,
      socketTimeoutMS: parseInt(process.env.DB_SOCKET_TIMEOUT) || 45000,
      maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE) || 10,
    });

    logger.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    logger.log(`📂 Database Name: ${conn.connection.name}`);

    // Connection event handlers
    mongoose.connection.on('error', (err) => {
      logger.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.log('⚠️ MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      logger.log('🔄 MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.log('🛑 MongoDB connection closed through app termination');
      process.exit(0);
    });

    return conn;
  } catch (error) {
    logger.error('❌ Database connection failed:', error);

    // Helpful authentication tips
    if (error.name === 'MongoServerError') {
      if (error.code === 8000) {
        logger.error('💡 Authentication Tips:');
        logger.error('1. Check your MongoDB Atlas username and password');
        logger.error('2. Ensure your IP is whitelisted in MongoDB Atlas');
        logger.error('3. Verify your database user has proper permissions (readWrite)');
      } else if (error.code === 13) {
        logger.error('💡 Check if the database user has read/write permissions');
      } else {
        logger.error('💡 Check your MongoDB Atlas connection settings');
      }
    }

    process.exit(1);
  }
};

// Get database stats
const getDatabaseStats = async () => {
  try {
    if (!mongoose.connection.db) {
      return { status: 'Database not connected' };
    }

    const stats = await mongoose.connection.db.admin().serverStatus();
    return {
      host: mongoose.connection.host,
      database: mongoose.connection.name,
      collections: await mongoose.connection.db.listCollections().toArray(),
      stats: {
        connections: stats.connections,
        memory: stats.mem,
        network: stats.network,
      },
    };
  } catch (error) {
    logger.error('⚠️ Error getting database stats:', error);
    return null;
  }
};

// Check database health
const checkDatabaseHealth = async () => {
  try {
    if (!mongoose.connection.db) {
      return {
        status: 'disconnected',
        timestamp: new Date().toISOString(),
        error: 'Database not connected',
      };
    }

    await mongoose.connection.db.admin().ping();
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: mongoose.connection.name,
      host: mongoose.connection.host,
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
    };
  }
};

module.exports = {
  connectDatabase,
  getDatabaseStats,
  checkDatabaseHealth,
};
