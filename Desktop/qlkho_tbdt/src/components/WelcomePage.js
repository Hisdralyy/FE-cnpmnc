// src/components/WelcomePage.js
import React, { useEffect } from 'react';
import './styles/WelcomePage.css';

const WelcomePage = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Chuyển đến trang chủ sau 3 giây
      window.location.href = '/HomePage'; // Chuyển đến trang HomePage
    }, 3000); // Thời gian hiển thị là 3 giây

    return () => clearTimeout(timer); // Dọn dẹp khi component unmount
  }, []);

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Chào mừng đến với trang quản lý kho thiết bị điện tử</h1>
        <div className="loading-animation">Đang tải...</div>
      </div>
    </div>
  );
};
export default WelcomePage;