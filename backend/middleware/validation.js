const { validationResult } = require('express-validator');

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.param,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// Sanitization middleware
const sanitizeInput = (req, res, next) => {
  if (req.body.customerName) req.body.customerName = req.body.customerName.trim();
  if (req.body.carDetails?.make) req.body.carDetails.make = req.body.carDetails.make.trim();
  if (req.body.carDetails?.model) req.body.carDetails.model = req.body.carDetails.model.trim();
  
  if (req.body.carDetails?.type) {
    req.body.carDetails.type = req.body.carDetails.type.toLowerCase();
  }
  
  if (req.body.serviceType) {
    req.body.serviceType = req.body.serviceType.trim();
  }

  next();
};

module.exports = {
  handleValidationErrors,
  sanitizeInput
};