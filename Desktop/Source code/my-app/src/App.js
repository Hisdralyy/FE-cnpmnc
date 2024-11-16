import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/Landingpage';
import Solutions from './components/Solutions';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Product from './components/Product';
import Contact from './components/Contact';
import { ProfilePage } from './components/Profile' 
import OrderHistory from "./components/OrderHistory"


function App() {
  return (
    <Router>
      {/* Routes: quản lý các route */}
      <Routes>
      <Route path="Product/OrderHistory" element={<OrderHistory />} />
      <Route path="Product/profile" element={<ProfilePage />} />
        <Route path="/" element={<LandingPage/> } />
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
