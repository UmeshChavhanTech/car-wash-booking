import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { bookingAPI } from '../services/api';
import '../styles/BookingDetail.css';

const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBooking();
  }, [id]);

  const loadBooking = async () => {
    try {
      const response = await bookingAPI.getById(id);
      if (response.data.success) {
        setBooking(response.data.data);
      } else {
        setError('Booking not found');
      }
    } catch (err) {
      setError('Failed to load booking details');
      console.error('Error loading booking:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      try {
        await bookingAPI.delete(id);
        navigate('/');
      } catch (err) {
        setError('Failed to delete booking');
        console.error('Error deleting booking:', err);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  if (loading) return <div className="loading">Loading booking details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!booking) return <div className="error-message">Booking not found</div>;

  return (
    <div className="booking-detail-page">
      <div className="container">
        <div className="detail-header">
          <Link to="/" className="back-link">← Back to Bookings</Link>
          <div className="header-actions">
            <Link to={`/edit/${booking._id}`} className="btn btn-primary">
              Edit Booking
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete Booking
            </button>
          </div>
        </div>

        <div className="booking-detail-card">
          <div className="detail-section">
            <h2>Customer Information</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Customer Name:</label>
                <span>{booking.customerName}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h2>Car Details</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Make:</label>
                <span>{booking.carDetails.make}</span>
              </div>
              <div className="detail-item">
                <label>Model:</label>
                <span>{booking.carDetails.model}</span>
              </div>
              <div className="detail-item">
                <label>Year:</label>
                <span>{booking.carDetails.year}</span>
              </div>
              <div className="detail-item">
                <label>Type:</label>
                <span className="car-type-badge">{booking.carDetails.type}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h2>Service Information</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Service Type:</label>
                <span>{booking.serviceType}</span>
              </div>
              <div className="detail-item">
                <label>Date:</label>
                <span>{formatDate(booking.date)}</span>
              </div>
              <div className="detail-item">
                <label>Time Slot:</label>
                <span>{booking.timeslot}</span>
              </div>
              <div className="detail-item">
                <label>Duration:</label>
                <span>{booking.duration} minutes</span>
              </div>
              <div className="detail-item">
                <label>Price:</label>
                <span className="price">${booking.price}</span>
              </div>
              <div className="detail-item">
                <label>Status:</label>
                <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                  {booking.status}
                </span>
              </div>
            </div>
          </div>

          {booking.addons && booking.addons.length > 0 && (
            <div className="detail-section">
              <h2>Add-on Services</h2>
              <div className="addons-list">
                {booking.addons.map((addon, index) => (
                  <span key={index} className="addon-badge">{addon}</span>
                ))}
              </div>
            </div>
          )}

          {booking.rating && (
            <div className="detail-section">
              <h2>Customer Rating</h2>
              <div className="rating">
                {'★'.repeat(booking.rating)}{'☆'.repeat(5 - booking.rating)}
                <span className="rating-text">({booking.rating}/5)</span>
              </div>
            </div>
          )}

          <div className="detail-section">
            <h2>Booking Timeline</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Created:</label>
                <span>{new Date(booking.createAt).toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <label>Last Updated:</label>
                <span>{new Date(booking.updateAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;