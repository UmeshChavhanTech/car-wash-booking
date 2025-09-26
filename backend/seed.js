const mongoose = require('mongoose');
const Booking = require('./models/Booking');
require('dotenv').config();

const sampleBookings = [
  {
    customerName: "John Smith",
    carDetails: {
      make: "Toyota",
      model: "Camry",
      year: 2022,
      type: "sedan"
    },
    serviceType: "Basic Wash",
    date: new Date('2024-01-15'),
    timeslot: "10:00 AM",
    duration: 30,
    price: 25,
    status: "Completed",
    rating: 5,
    addons: ["Interior Cleaning"]
  },
  {
    customerName: "Sarah Johnson",
    carDetails: {
      make: "Honda",
      model: "CR-V",
      year: 2021,
      type: "suv"
    },
    serviceType: "Deluxe Wash",
    date: new Date('2024-01-16'),
    timeslot: "2:00 PM",
    duration: 45,
    price: 45,
    status: "Confirmed",
    addons: ["Interior Cleaning", "Polishing"]
  },
  {
    customerName: "Mike Davis",
    carDetails: {
      make: "BMW",
      model: "X5",
      year: 2023,
      type: "luxury"
    },
    serviceType: "Full Detailing",
    date: new Date('2024-01-17'),
    timeslot: "11:00 AM",
    duration: 120,
    price: 120,
    status: "Pending"
  },
  {
    customerName: "Emily Wilson",
    carDetails: {
      make: "Ford",
      model: "Focus",
      year: 2020,
      type: "hatchback"
    },
    serviceType: "Basic Wash",
    date: new Date('2024-01-14'),
    timeslot: "3:00 PM",
    duration: 30,
    price: 25,
    status: "Cancelled"
  },
  {
    customerName: "Robert Brown",
    carDetails: {
      make: "Mercedes",
      model: "E-Class",
      year: 2023,
      type: "luxury"
    },
    serviceType: "Full Detailing",
    date: new Date('2024-01-18'),
    timeslot: "9:00 AM",
    duration: 120,
    price: 150,
    status: "Confirmed",
    addons: ["Waxing", "Odor Removal"]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/carwash_booking');
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Booking.deleteMany({});
    console.log('Cleared existing bookings');
    
    // Insert sample data
    await Booking.insertMany(sampleBookings);
    console.log('Sample bookings inserted successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();