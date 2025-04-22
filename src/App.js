// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StudentDetails from './pages/StudentDetails';
import SignatureForm from './pages/SignatureForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<StudentDetails />} />
        <Route path="/signture" element={<SignatureForm />} />
      </Routes>
    </Router>
  );
}

export default App;
