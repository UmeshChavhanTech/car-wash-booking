import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>🚗 CarWash Pro</h1>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/add" className="nav-link btn-primary">New Booking</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;