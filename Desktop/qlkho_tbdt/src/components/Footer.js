// src/components/Footer.js

import React from 'react';
import './styles/Footer.css'; // Nhập CSS cho footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section contact-info">
          <h4>Contact Us</h4>
          <p>Address: 123 Main St, Hanoi</p>
          <p>Phone: +84 123 456 789</p>
          <p>Email: support@yourwebsite.com</p>
        </div>

        <div className="footer-section social-media">
          <h4>Follow Us</h4>
          <a href="#" className="social-icon">Facebook</a>
          <a href="#" className="social-icon">Twitter</a>
          <a href="#" className="social-icon">LinkedIn</a>
        </div>

        <div className="footer-section quick-links">
          <h4>Quick Links</h4>
          <a href="#">About Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>

        <div className="footer-section newsletter">
          <h4>Newsletter Signup</h4>
          <form action="#">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Website. All Rights Reserved.</p>
        <a href="#top" className="back-to-top">Back to Top</a>
      </div>
    </footer>
  );
};

export default Footer;
