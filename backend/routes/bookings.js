const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { handleValidationErrors, sanitizeInput } = require('../middleware/validation');

// Validation rules
const bookingValidation = [
  body('customerName')
    .notEmpty().withMessage('Customer name is required')
    .isLength({ min: 2 }).withMessage('Customer name must be at least 2 characters')
    .trim(),

  body('carDetails.make')
    .notEmpty().withMessage('Car make is required')
    .trim(),

  body('carDetails.model')
    .notEmpty().withMessage('Car model is required')
    .trim(),

  body('carDetails.year')
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage(`Car year must be between 1900 and ${new Date().getFullYear() + 1}`),

  body('carDetails.type')
    .isIn(['sedan', 'suv', 'hatchback', 'luxury', 'truck', 'van'])
    .withMessage('Car type must be one of: sedan, suv, hatchback, luxury, truck, van'),

  body('serviceType')
    .isIn(['Basic Wash', 'Deluxe Wash', 'Full Detailing'])
    .withMessage('Service type must be one of: Basic Wash, Deluxe Wash, Full Detailing'),

  body('date')
    .isISO8601().withMessage('Valid date is required'),

  body('timeslot')
    .notEmpty().withMessage('Timeslot is required'),

  body('duration')
    .isInt({ min: 15 }).withMessage('Minimum duration is 15 minutes'),

  body('price')
    .isFloat({ min: 0 }).withMessage('Price cannot be negative'),

  body('status')
    .optional()
    .isIn(['Pending', 'Confirmed', 'Completed', 'Cancelled'])
    .withMessage('Status must be one of: Pending, Confirmed, Completed, Cancelled'),

  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),

  body('addons')
    .optional()
    .isArray().withMessage('Addons must be an array')
];

// Routes
router.get('/', bookingController.getAllBookings);
router.get('/search', bookingController.searchBookings);
router.get('/:id', bookingController.getBookingById);
router.post('/', 
  sanitizeInput, 
  bookingValidation, 
  handleValidationErrors, 
  bookingController.createBooking
);
router.put('/:id', 
  sanitizeInput, 
  bookingValidation, 
  handleValidationErrors, 
  bookingController.updateBooking
);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;