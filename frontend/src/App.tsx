import React, { useState } from 'react';
import axios from 'axios';

/**
 * HealthData interface defines the structure of user input data.
 */
interface HealthData {
  age: number;
  weight: number;
  height: number;
  fitness_level: string;
  goals?: string;
}

/**
 * WorkoutRecommendation interface defines the structure of the API response.
 */
interface WorkoutRecommendation {
  workout: string;
  rationale: string;
}

/**
 * Main App component for Health Recommender frontend.
 */
const App: React.FC = () => {
  // State for user input
  const [form, setForm] = useState<HealthData>({
    age: 25,
    weight: 70,
    height: 175,
    fitness_level: 'Beginner',
    goals: ''
  });
  // State for recommendation result
  const [recommendation, setRecommendation] = useState<WorkoutRecommendation | null>(null);
  // State for error messages
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles input changes in the form.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'age' || name === 'weight' || name === 'height' ? Number(value) : value }));
  };

  /**
   * Submits health data to backend and gets workout recommendation.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setRecommendation(null);
    try {
      const response = await axios.post<WorkoutRecommendation>('http://localhost:8000/recommend', form);
      setRecommendation(response.data);
    } catch (err: any) {
      setError('Failed to get recommendation. Please try again.');
    }
  };

  // Test message for React rendering
  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h1>Hello from React!</h1>
    </div>
  );
};

export default App;
