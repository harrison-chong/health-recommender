import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/Home';
import HealthDashboard from './components/HealthDashboard';
import { ThemeProvider } from './contexts/ThemeContext';

/**
 * Main App component for Health Recommender frontend.
 */
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/health" element={<Layout><HealthDashboard /></Layout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
