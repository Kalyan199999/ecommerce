import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>

      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/admin" element={<Dashboard />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        
      </Routes>

    </Router>
  );
}

export default App;
