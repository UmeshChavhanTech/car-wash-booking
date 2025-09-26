const os = require('os');

// Server configuration
const serverConfig = {
  // Server settings
  port: process.env.PORT || 5000,
  host: process.env.HOST || '0.0.0.0',
  environment: process.env.NODE_ENV || 'development',
  
  // Application settings
  app: {
    name: 'Car Wash Booking API',
    version: '1.0.0',
    description: 'MERN Stack Car Washing Booking System'
  },
  
  // Rate limiting settings
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
    message: 'Too many requests from this IP, please try again later.'
  },
  
  // Security settings
  security: {
    maxPayloadSize: '10mb',
    helmet: {
      contentSecurityPolicy: false, // Disable for API
      crossOriginEmbedderPolicy: false
    }
  },
  
  // CORS settings
  cors: {
    origins: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://localhost:5173'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  },
  
  // Get server info
  getServerInfo: () => {
    return {
      platform: os.platform(),
      architecture: os.arch(),
      hostname: os.hostname(),
      cpu: os.cpus().length,
      memory: {
        total: Math.round(os.totalmem() / (1024 * 1024 * 1024)) + ' GB',
        free: Math.round(os.freemem() / (1024 * 1024 * 1024)) + ' GB'
      },
      uptime: Math.round(os.uptime() / 60) + ' minutes'
    };
  },
  
  // Get application info
  getAppInfo: () => {
    return {
      name: serverConfig.app.name,
      version: serverConfig.app.version,
      environment: serverConfig.environment,
      port: serverConfig.port,
      nodeVersion: process.version,
      pid: process.pid
    };
  }
};

module.exports = serverConfig;