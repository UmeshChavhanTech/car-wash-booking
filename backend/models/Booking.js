const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  carDetails: {
    make: {
      type: String,
      required: [true, 'Car make is required'],
      trim: true
    },
    model: {
      type: String,
      required: [true, 'Car model is required'],
      trim: true
    },
    year: {
      type: Number,
      required: [true, 'Car year is required'],
      min: [1900, 'Year must be after 1900'],
      max: [new Date().getFullYear() + 1, 'Year cannot be in the future']
    },
    type: {
      type: String,
      required: [true, 'Car type is required'],
      enum: ['sedan', 'suv', 'hatchback', 'luxury', 'truck', 'van']
    }
  },
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
    enum: ['Basic Wash', 'Deluxe Wash', 'Full Detailing']
  },
  date: {
    type: Date,
    required: [true, 'Booking date is required']
  },
  timeslot: {
    type: String,
    required: [true, 'Timeslot is required']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [15, 'Minimum duration is 15 minutes']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  addons: [{
    type: String,
    enum: ['Interior Cleaning', 'Polishing', 'Waxing', 'Odor Removal', 'Engine Cleaning']
  }]
}, {
  timestamps: true // This will automatically add createdAt and updatedAt
});

module.exports = mongoose.model('Booking', bookingSchema);