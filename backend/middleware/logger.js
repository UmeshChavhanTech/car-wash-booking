const morgan = require('morgan');

// Custom token for request body
morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

// Development format
const devFormat = ':method :url :status :response-time ms - :res[content-length] :body';

const logger = {
  // For development
  dev: morgan(devFormat),
  
  // For production
  combined: morgan('combined'),
  
  // Simple format for console
  simple: morgan('combined'),
  
  // Custom logging function
  log: (message) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  },

  error: (message, error = null) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR: ${message}`, error);
  }
};

module.exports = logger;