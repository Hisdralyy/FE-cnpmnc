import React, { useState } from 'react';
import './Styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000); // Giả lập thời gian xử lý gửi form
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>

      <div className="contact-info">
        <h3>Get in Touch</h3>
        <p><strong>Email:</strong> support@electronicswarehouse.com</p>
        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
        <p><strong>Address:</strong> 123 Warehouse Road, Electronics City, CA</p>
      </div>

      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094446!2d144.95373531531562!3d-37.81720997975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43a7a02d8d%3A0x5045675218ce6e0!2sVictoria%2C%20Australia!5e0!3m2!1sen!2sau!4v1607586479745!5m2!1sen!2sau"
          width="100%"
          height="300"
          frameBorder="0"
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </div>

      {submitted ? (
        <div className="success-message">
          <h3>Thank you for contacting us!</h3>
          <p>We will get back to you shortly.</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone (Optional)</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            {loading ? <div className="loader"></div> : 'Submit'}
          </button>
        </form>
      )}

      <div className="working-hours">
        <h3>Working Hours</h3>
        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
        <p>Saturday: 10:00 AM - 4:00 PM</p>
        <p>Sunday: Closed</p>
      </div>

      <div className="social-links">
        <h3>Follow us</h3>
        <a href="https://www.facebook.com/quanlykho">Facebook</a>
        <a href="https://twitter.com">Twitter</a>
        <a href="https://www.youtube.com/@smartbiz-quantridoanhnghie9559">Youtube</a>
      </div>
    </div>
  );
};

export default Contact;
