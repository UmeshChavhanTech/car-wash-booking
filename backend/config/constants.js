// Application constants
const constants = {
  // Booking statuses
  STATUS: {
    PENDING: 'Pending',
    CONFIRMED: 'Confirmed',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled'
  },
  
  // Service types
  SERVICE_TYPES: {
    BASIC_WASH: 'Basic Wash',
    DELUXE_WASH: 'Deluxe Wash',
    FULL_DETAILING: 'Full Detailing'
  },
  
  // Car types
  CAR_TYPES: ['sedan', 'suv', 'hatchback', 'luxury', 'truck', 'van'],
  
  // Add-on services
  ADDONS: [
    'Interior Cleaning',
    'Polishing',
    'Waxing',
    'Odor Removal',
    'Engine Cleaning'
  ],
  
  // Time slots
  TIME_SLOTS: [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ],
  
  // Pricing
  PRICING: {
    BASIC_WASH: 25,
    DELUXE_WASH: 45,
    FULL_DETAILING: 120,
    ADDON_PRICE: 15
  },
  
  // Durations (in minutes)
  DURATIONS: {
    BASIC_WASH: 30,
    DELUXE_WASH: 45,
    FULL_DETAILING: 120,
    ADDON_DURATION: 15
  },
  
  // Pagination
  PAGINATION: {
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 50,
    DEFAULT_PAGE: 1
  },
  
  // Validation
  VALIDATION: {
    CUSTOMER_NAME: {
      MIN_LENGTH: 2,
      MAX_LENGTH: 100
    },
    CAR_YEAR: {
      MIN: 1900,
      MAX: new Date().getFullYear() + 1
    },
    RATING: {
      MIN: 1,
      MAX: 5
    }
  },
  
  // Response messages
  MESSAGES: {
    SUCCESS: {
      BOOKING_CREATED: 'Booking created successfully',
      BOOKING_UPDATED: 'Booking updated successfully',
      BOOKING_DELETED: 'Booking deleted successfully',
      BOOKING_FETCHED: 'Booking fetched successfully'
    },
    ERROR: {
      NOT_FOUND: 'Resource not found',
      VALIDATION_FAILED: 'Validation failed',
      SERVER_ERROR: 'Internal server error',
      DUPLICATE_ENTRY: 'Duplicate entry found'
    }
  },
  
  // HTTP Status Codes
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
  }
};

module.exports = constants;