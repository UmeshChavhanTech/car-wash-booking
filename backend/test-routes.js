const express = require('express');
const app = express();

// Test if routes are loading correctly
try {
  const bookingRoutes = require('./routes/bookings');
  console.log('✅ Booking routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading booking routes:', error.message);
}

try {
  const healthRoutes = require('./routes/health');
  console.log('✅ Health routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading health routes:', error.message);
}

// Test if controllers are loading correctly
try {
  const bookingController = require('./controllers/bookingController');
  console.log('✅ Booking controller loaded successfully');
  
  // Check if all methods exist
  const requiredMethods = ['getAllBookings', 'getBookingById', 'createBooking', 'updateBooking', 'deleteBooking', 'searchBookings'];
  requiredMethods.forEach(method => {
    if (typeof bookingController[method] === 'function') {
      console.log(`✅ ${method} method exists`);
    } else {
      console.log(`❌ ${method} method is missing`);
    }
  });
} catch (error) {
  console.error('❌ Error loading booking controller:', error.message);
}

console.log('Route test completed');