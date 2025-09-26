import React, { useState } from 'react';
import '../styles/SearchFilter.css';

const SearchFilter = ({ onFilter, onSearch }) => {
  const [filters, setFilters] = useState({
    serviceType: '',
    carType: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const clearFilters = () => {
    const clearedFilters = {
      serviceType: '',
      carType: '',
      status: '',
      dateFrom: '',
      dateTo: ''
    };
    setFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  return (
    <div className="search-filter">
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by customer name or car details..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="filter-section">
        <select
          value={filters.serviceType}
          onChange={(e) => handleFilterChange('serviceType', e.target.value)}
          className="filter-select"
        >
          <option value="">All Services</option>
          <option value="Basic Wash">Basic Wash</option>
          <option value="Deluxe Wash">Deluxe Wash</option>
          <option value="Full Detailing">Full Detailing</option>
        </select>

        <select
          value={filters.carType}
          onChange={(e) => handleFilterChange('carType', e.target.value)}
          className="filter-select"
        >
          <option value="">All Car Types</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="hatchback">Hatchback</option>
          <option value="luxury">Luxury</option>
          <option value="truck">Truck</option>
          <option value="van">Van</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
          className="filter-date"
          placeholder="From Date"
        />

        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => handleFilterChange('dateTo', e.target.value)}
          className="filter-date"
          placeholder="To Date"
        />

        <button onClick={clearFilters} className="btn btn-secondary">
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;