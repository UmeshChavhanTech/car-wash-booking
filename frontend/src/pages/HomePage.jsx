import React, { useState, useEffect } from 'react';
import { bookingAPI } from '../services/api';
import BookingCard from '../components/BookingCard';
import SearchFilter from '../components/SearchFilter';
import '../styles/HomePage.css';

const HomePage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadBookings();
  }, [filters]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingAPI.getAll(filters);
      if (response.data.success) {
        setBookings(response.data.data);
      }
    } catch (err) {
      setError('Failed to load bookings');
      console.error('Error loading bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      loadBookings();
    } else {
      try {
        const response = await bookingAPI.search(query);
        if (response.data.success) {
          setBookings(response.data.data);
        }
      } catch (err) {
        console.error('Error searching bookings:', err);
      }
    }
  };

  const handleDeleteBooking = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await bookingAPI.delete(id);
        loadBookings(); // Reload bookings after deletion
      } catch (err) {
        setError('Failed to delete booking');
        console.error('Error deleting booking:', err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading bookings...</div>;
  }

  return (
    <div className="home-page">
      <div className="container">
        <div className="page-header">
          <h1>Car Wash Bookings</h1>
          <p>Manage and track all your car wash appointments</p>
        </div>

        <SearchFilter onFilter={handleFilter} onSearch={handleSearch} />

        {error && <div className="error-message">{error}</div>}

        <div className="bookings-grid">
          {bookings.length === 0 ? (
            <div className="no-bookings">
              <p>No bookings found. {searchQuery && 'Try adjusting your search criteria.'}</p>
            </div>
          ) : (
            bookings.map(booking => (
              <BookingCard key={booking._id} booking={booking} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;