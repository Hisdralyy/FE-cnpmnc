import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/Landingpage';
import Solutions from './components/Solutions';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Product from './components/Product';
import Contact from './components/Contact';
function App() {
  return (
    <Router>
      {/* Routes: quản lý các route */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/solution" element={<Solutions />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/Product' element = {<Product/>}/>
        <Route path='/Contact' element ={<Contact/>}/>
      </Routes>
    </Router>
  );
}

export default App;
