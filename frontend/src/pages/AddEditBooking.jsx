import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { bookingAPI } from '../services/api';
import '../styles/AddEditBooking.css';

const AddEditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState({
    customerName: '',
    carDetails: {
      make: '',
      model: '',
      year: new Date().getFullYear(),
      type: 'sedan'
    },
    serviceType: 'Basic Wash',
    date: '',
    timeslot: '09:00 AM',
    duration: 30,
    price: 25,
    status: 'Pending',
    addons: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEdit) {
      loadBooking();
    }
  }, [id]);

  const loadBooking = async () => {
    try {
      const response = await bookingAPI.getById(id);
      if (response.data.success) {
        const booking = response.data.data;
        // Format date for input field
        const formattedDate = new Date(booking.date).toISOString().split('T')[0];
        setFormData({
          ...booking,
          date: formattedDate
        });
      }
    } catch (err) {
      setError('Failed to load booking data');
      console.error('Error loading booking:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('carDetails.')) {
      const carField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        carDetails: {
          ...prev.carDetails,
          [carField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddonChange = (addon) => {
    setFormData(prev => ({
      ...prev,
      addons: prev.addons.includes(addon)
        ? prev.addons.filter(a => a !== addon)
        : [...prev.addons, addon]
    }));
  };

  const calculatePrice = () => {
    let basePrice = 0;
    switch (formData.serviceType) {
      case 'Basic Wash': basePrice = 25; break;
      case 'Deluxe Wash': basePrice = 45; break;
      case 'Full Detailing': basePrice = 120; break;
      default: basePrice = 25;
    }

    // Add-ons pricing
    const addonPrice = formData.addons.length * 15;
    
    setFormData(prev => ({
      ...prev,
      price: basePrice + addonPrice
    }));
  };

  useEffect(() => {
    calculatePrice();
  }, [formData.serviceType, formData.addons]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isEdit) {
        await bookingAPI.update(id, formData);
        setSuccess('Booking updated successfully!');
      } else {
        await bookingAPI.create(formData);
        setSuccess('Booking created successfully!');
      }
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save booking');
      console.error('Error saving booking:', err);
    } finally {
      setLoading(false);
    }
  };

  const serviceTypes = ['Basic Wash', 'Deluxe Wash', 'Full Detailing'];
  const carTypes = ['sedan', 'suv', 'hatchback', 'luxury', 'truck', 'van'];
  const timeslots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
  const addons = ['Interior Cleaning', 'Polishing', 'Waxing', 'Odor Removal', 'Engine Cleaning'];

  return (
    <div className="add-edit-booking-page">
      <div className="container">
        <div className="page-header">
          <Link to="/" className="back-link">← Back to Bookings</Link>
          <h1>{isEdit ? 'Edit Booking' : 'Create New Booking'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-section">
            <h2>Customer Information</h2>
            <div className="form-group">
              <label htmlFor="customerName">Customer Name *</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Car Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="carMake">Make *</label>
                <input
                  type="text"
                  id="carMake"
                  name="carDetails.make"
                  value={formData.carDetails.make}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="carModel">Model *</label>
                <input
                  type="text"
                  id="carModel"
                  name="carDetails.model"
                  value={formData.carDetails.model}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="carYear">Year *</label>
                <input
                  type="number"
                  id="carYear"
                  name="carDetails.year"
                  value={formData.carDetails.year}
                  onChange={handleInputChange}
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="carType">Type *</label>
                <select
                  id="carType"
                  name="carDetails.type"
                  value={formData.carDetails.type}
                  onChange={handleInputChange}
                  required
                >
                  {carTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Service Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="serviceType">Service Type *</label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  required
                >
                  {serviceTypes.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="date">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="timeslot">Time Slot *</label>
                <select
                  id="timeslot"
                  name="timeslot"
                  value={formData.timeslot}
                  onChange={handleInputChange}
                  required
                >
                  {timeslots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="duration">Duration (minutes) *</label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  min="15"
                  step="15"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Add-on Services</h2>
            <div className="addons-grid">
              {addons.map(addon => (
                <label key={addon} className="addon-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.addons.includes(addon)}
                    onChange={() => handleAddonChange(addon)}
                  />
                  <span>{addon} (+$15)</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h2>Pricing & Status</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Total Price</label>
                <div className="price-display">${formData.price}</div>
              </div>
              {isEdit && (
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Saving...' : (isEdit ? 'Update Booking' : 'Create Booking')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditBooking;