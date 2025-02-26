import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import MarePage from './MarePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/mare" element={<MarePage />} />
    </Routes>
  </Router>
);
