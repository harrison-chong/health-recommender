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
  workout_recommendation: string;
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

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h1>Health Recommender</h1>
      <form onSubmit={handleSubmit}>
        <label>Age:<br />
          <input type="number" name="age" value={form.age} onChange={handleChange} required min={1} />
        </label><br /><br />
        <label>Weight (kg):<br />
          <input type="number" name="weight" value={form.weight} onChange={handleChange} required min={1} />
        </label><br /><br />
        <label>Height (cm):<br />
          <input type="number" name="height" value={form.height} onChange={handleChange} required min={1} />
        </label><br /><br />
        <label>Fitness Level:<br />
          <select name="fitness_level" value={form.fitness_level} onChange={handleChange} required>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </label><br /><br />
        <label>Goals:<br />
          <input type="text" name="goals" value={form.goals} onChange={handleChange} placeholder="e.g. Lose weight, build muscle" />
        </label><br /><br />
        <button type="submit">Get Recommendation</button>
      </form>
      {recommendation && (
        <div style={{ marginTop: 30, padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
          <h2>Recommended Workout</h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', backgroundColor: '#f9f9f9', padding: 10, borderRadius: 4 }}>{recommendation.workout_recommendation}</pre>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default App;
