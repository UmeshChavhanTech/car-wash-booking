import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BookingCard.css';

const BookingCard = ({ booking }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'status-completed';
      case 'Confirmed': return 'status-confirmed';
      case 'Pending': return 'status-pending';
      case 'Cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="booking-card">
      <div className="booking-header">
        <h3 className="customer-name">{booking.customerName}</h3>
        <span className={`status-badge ${getStatusColor(booking.status)}`}>
          {booking.status}
        </span>
      </div>
      
      <div className="booking-details">
        <div className="car-info">
          <span className="car-make-model">
            {booking.carDetails.make} {booking.carDetails.model}
          </span>
          <span className="car-type">{booking.carDetails.type}</span>
        </div>
        
        <div className="service-info">
          <span className="service-type">{booking.serviceType}</span>
          <span className="price">${booking.price}</span>
        </div>
        
        <div className="time-info">
          <span className="date">{formatDate(booking.date)}</span>
          <span className="timeslot">{booking.timeslot}</span>
        </div>
      </div>
      
      <div className="booking-actions">
        <Link to={`/booking/${booking._id}`} className="btn btn-secondary">
          View Details
        </Link>
        <Link to={`/edit/${booking._id}`} className="btn btn-primary">
          Edit
        </Link>
      </div>
    </div>
  );
};

export default BookingCard;