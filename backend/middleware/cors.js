const cors = require('cors');

// Allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin'
  ]
};

// Development CORS (more permissive)
const corsDevOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200
};

// CORS middleware factory
const configureCors = () => {
  if (process.env.NODE_ENV === 'production') {
    return cors(corsOptions);
  } else {
    return cors(corsDevOptions);
  }
};

// Pre-flight middleware
const handlePreflight = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).json({});
  }
  next();
};

module.exports = {
  configureCors,
  handlePreflight,
  corsOptions,
  corsDevOptions
};