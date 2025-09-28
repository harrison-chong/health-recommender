import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';

import {
  ThemeProvider,
  CssBaseline
} from '@mui/material';

import Home from './components/Home';
import HealthPage from './components/HealthPage';

/**
 * HealthData interface defines the structure of user input data.
 */
interface HealthData {
  age: number | null;
  weight: number | null;
  height: number | null;
  fitness_level: string;
  gender: string;
  occupation: string;
  average_sleep_hours: number | null;
  body_fat_percentage?: number | null;
  goals?: string;
}

/**
 * WorkoutRecommendation interface defines the structure of the API response.
 */
interface WorkoutRecommendation {
  workout_recommendation: string;
}

/**
 * BMIInput interface for BMI calculation.
 */
interface BMIInput {
  weight: number;
  height: number;
}

/**
 * BMIResponse interface for BMI calculation response.
 */
interface BMIResponse {
  bmi: number;
}

/**
 * Main App component for Health Recommender frontend.
 */
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/health" element={<HealthPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
