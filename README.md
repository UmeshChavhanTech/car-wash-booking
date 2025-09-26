# Car Wash Booking System

A full-stack MERN application for managing car wash bookings with complete CRUD operations.

## 🚀 Features

- **Booking Management**: Create, read, update, delete bookings
- **Search & Filter**: Real-time search by customer/car details
- **Responsive Design**: Mobile-first approach
- **Advanced Filters**: By service type, car type, status, date range
- **Rating System**: 1-5 star ratings for services

## 🛠️ Tech Stack

**Frontend**: React, React Router, Axios, CSS3  
**Backend**: Node.js, Express.js, MongoDB, Mongoose  
**Tools**: Vite, Express Validator, CORS, Helmet

## 📦 Installation

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your MongoDB URI in .env
npm run seed
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔧 API Endpoints

- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking
- `GET /api/bookings/search` - Search bookings

## 📱 Usage

1. **View Bookings**: Homepage shows all bookings in responsive cards
2. **Add Booking**: Click "New Booking" to create new appointment
3. **Search**: Use search bar to find bookings by customer or car
4. **Filter**: Apply filters for service type, car type, status
5. **Manage**: Edit or delete bookings with confirmation

## 🎯 Project Structure


car-wash-booking/
├── backend/ (Express.js API)
├── frontend/ (React.js App)
└── README.md


## 📄 License

MIT License - feel free to use this project for learning and development.

---

**Built with the MERN Stack** • **Complete CRUD Operations** • **Mobile Responsive**
