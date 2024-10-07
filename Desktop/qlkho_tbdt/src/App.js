import React, { useState, useEffect } from 'react';
import './components/styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import HomePage from './components/Homepage';
import Sidebar from './components/Sidebar';
import WelcomePage from './components/WelcomePage';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleSidebarToggle = (event) => {
      setIsSidebarCollapsed(event.detail.isCollapsed);
    };

    document.body.addEventListener('sidebarToggle', handleSidebarToggle);

    return () => {
      document.body.removeEventListener('sidebarToggle', handleSidebarToggle);
    };
  }, []);

  return ( 
    <Router>
      <div className={`app-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Routes>
          <Route path="/LoginRegister" element={<LoginRegister />} />
          <Route path="/WelcomePage" element={<WelcomePage />} />
          <Route 
            path="/HomePage" 
            element={
              <>
                
                <HomePage />
              </>
            } 
          />
          <Route path="/" element={<LoginRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;