import React, { useState, useCallback } from 'react';
import axios from 'axios';
import theme from './theme';

import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Typography,
  Alert,
  Snackbar
} from '@mui/material';

import HealthForm from './components/HealthForm';
import RecommendationCard from './components/RecommendationCard';

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
 * Main App component for Health Recommender frontend.
 */

const App: React.FC = () => {
  // State for user input
  const [form, setForm] = useState<HealthData>({
    age: 30,
    weight: 70,
    height: 170,
    fitness_level: 'Beginner',
    gender: 'male',
    occupation: 'Office Worker',
    average_sleep_hours: 7.5,
    goals: ''
  });
  // State for recommendation result
  const [recommendation, setRecommendation] = useState<WorkoutRecommendation | null>(null);
  // State for error messages
  const [error, setError] = useState<string | null>(null);
  // State for loading
  const [loading, setLoading] = useState<boolean>(false);

  // State for snackbar
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  /**
   * Validates form data.
   */
  const validateForm = (data: HealthData): string | null => {
    if (data.age == null || data.age < 1 || data.age > 120) return 'Age must be between 1 and 120';
    if (data.weight == null || data.weight <= 0) return 'Weight must be greater than 0';
    if (data.height == null || data.height <= 0) return 'Height must be greater than 0';
    if (!['Beginner', 'Intermediate', 'Advanced'].includes(data.fitness_level)) return 'Please select a valid fitness level';
    if (!['male', 'female'].includes(data.gender)) return 'Please select a valid gender';
    if (!data.occupation?.trim()) return 'Occupation is required';
    if (data.average_sleep_hours == null || data.average_sleep_hours <= 0 || data.average_sleep_hours > 24) return 'Average sleep hours must be greater than 0 and less than or equal to 24';
    if (data.body_fat_percentage != null && (data.body_fat_percentage < 0 || data.body_fat_percentage > 100)) return 'Body fat percentage must be between 0 and 100';
    return null;
  };

  const validationError = validateForm(form);
  const isFormValid = !validationError;

  const isAgeInvalid = () => form.age == null || form.age < 1 || form.age > 120;
  const isWeightInvalid = () => form.weight == null || form.weight <= 0;
  const isHeightInvalid = () => form.height == null || form.height <= 0;
  const isFitnessLevelInvalid = () => !['Beginner', 'Intermediate', 'Advanced'].includes(form.fitness_level);
  const isGenderInvalid = () => !['male', 'female'].includes(form.gender);
  const isOccupationInvalid = () => !form.occupation?.trim();
  const isSleepInvalid = () => form.average_sleep_hours == null || form.average_sleep_hours <= 0 || form.average_sleep_hours > 24;

  /**
   * Submits health data to backend and gets workout recommendation.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setRecommendation(null);
    if (!isFormValid) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post<WorkoutRecommendation>('http://localhost:8000/recommend', form);
      setRecommendation(response.data);
    } catch (err: any) {
      setError('Failed to get recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  /**
   * Copies recommendation to clipboard.
   */
  const handleCopy = useCallback(async () => {
    if (recommendation) {
      try {
        await navigator.clipboard.writeText(recommendation.workout_recommendation);
        setSnackbarOpen(true);
      } catch (err) {
        console.error('Failed to copy to clipboard: ', err);
        setError('Failed to copy to clipboard. Please try manually.');
      }
    }
  }, [recommendation]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 8, backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', px: { xs: 2, sm: 4 } }}>
        <Box sx={{ width: '100%', maxWidth: 480 }}>
          <Typography variant="h2" component="h1" align="center" sx={{ mb: 6, fontWeight: 300, color: 'text.primary' }}>
            Health Recommender
          </Typography>
          <HealthForm
            form={form}
            setForm={setForm}
            loading={loading}
            onSubmit={handleSubmit}
            isFormValid={isFormValid}
            validationError={validationError}
            isAgeInvalid={isAgeInvalid}
            isWeightInvalid={isWeightInvalid}
            isHeightInvalid={isHeightInvalid}
            isFitnessLevelInvalid={isFitnessLevelInvalid}
            isGenderInvalid={isGenderInvalid}
            isOccupationInvalid={isOccupationInvalid}
            isSleepInvalid={isSleepInvalid}
          />
          {recommendation && (
            <RecommendationCard
              recommendation={recommendation}
              onCopy={handleCopy}
            />
          )}
          {error && (
            <Alert severity="error" sx={{ mt: 3, borderRadius: 3, boxShadow: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>{error}</Typography>
            </Alert>
          )}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            sx={{ '& .MuiSnackbarContent-root': { bgcolor: 'success.main', color: 'white', borderRadius: 2 } }}
          >
            <Typography>Copied to clipboard!</Typography>
          </Snackbar>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
