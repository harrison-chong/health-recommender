import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/Home';
import HealthPage from './components/HealthPage';
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
          <Route path="/health" element={<Layout><HealthPage /></Layout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
