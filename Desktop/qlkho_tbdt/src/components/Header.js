// Header.js
import React, { useState } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import './styles/Header.css'; // Import CSS để định dạng

const Header = ({ toggleTheme }) => {
  const [notifications, setNotifications] = useState(3); // Số lượng thông báo

  const handleNotificationClick = () => {
    setNotifications(0); // Đánh dấu thông báo là đã xem
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">Quản lý kho</h1>
      </div>
      <div className="header-right">
        <div className="notification" onClick={handleNotificationClick}>
          <FaBell />
          {notifications > 0 && <span className="notification-badge">{notifications}</span>}
        </div>
        <div className="user-icon">
          <FaUserCircle />
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          Chế độ {document.body.classList.contains('dark-mode') ? 'sáng' : 'tối'}
        </button>
      </div>
    </header>
  );
};

export default Header;
