import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingDetail from './pages/BookingDetail';
import AddEditBooking from './pages/AddEditBooking';
import Header from './components/Header';
import '../src/App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking/:id" element={<BookingDetail />} />
          <Route path="/add" element={<AddEditBooking />} />
          <Route path="/edit/:id" element={<AddEditBooking />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
