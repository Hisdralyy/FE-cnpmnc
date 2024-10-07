import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Header from './Header'; // Import Header
import './styles/HomePage.css';

const HomePage = () => {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Hiển thị thông báo sau 1.2s
    const timer = setTimeout(() => {
      setShowWelcomeMessage(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleAnimationComplete = () => {
    // Ẩn thông báo sau 3s và hiển thị các phần tử chính
    setTimeout(() => {
      setShowWelcomeMessage(false);
      setTimeout(() => {
        setShowMainContent(true); // Hiển thị Header, Sidebar, Footer sau thông báo
      }, 300); // Bạn có thể thay đổi thời gian này nếu muốn khoảng trễ
    }, 3000); // Thời gian hiển thị thông báo
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode'); // Thay đổi class trên body
  };

  return (
    <div className="homepage-container flex flex-col min-h-screen">
      {showWelcomeMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          onAnimationComplete={handleAnimationComplete}
          className="welcome-message text-3xl font-bold text-center text-black"
        >
          Chào mừng bạn đến với trang chủ
        </motion.div>
      )}

      {showMainContent && (
        <>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Header toggleTheme={toggleTheme} />
          </motion.div>
          
          <div className="main-content flex flex-1">
            <Sidebar />
            <div className="content-wrapper flex-1 flex flex-col">
              <main className="main-section flex-1 p-4">
                <h1 className="text-2xl">Nội dung chính của trang chủ</h1>
                <p>Đây là phần nội dung chính của bạn sau khi sidebar và footer đã hiển thị.</p>
              </main>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Footer />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default HomePage;
