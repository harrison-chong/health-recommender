import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import {
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Typography,
  Alert,
  Box
} from '@mui/material';
import RecommendationCard from './RecommendationCard';

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

interface WorkoutRecommendation {
  workout_recommendation: string;
}

const HealthForm: React.FC = () => {
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
  const [recommendation, setRecommendation] = useState<WorkoutRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_BASE = 'http://localhost:8000';

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

  const handleChange = React.useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let newValue: any;
    if (name === 'age' || name === 'weight' || name === 'height' || name === 'average_sleep_hours' || name === 'body_fat_percentage') {
      newValue = value === '' ? null : Number(value);
    } else {
      newValue = value;
    }
    setForm((prev: HealthData) => ({ ...prev, [name]: newValue }));
  }, []);

  const handleSelectChange = React.useCallback((e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setForm((prev: HealthData) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setRecommendation(null);
    if (!isFormValid) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post<WorkoutRecommendation>(`${API_BASE}/recommend`, form);
      setRecommendation(response.data);
    } catch (err: any) {
      setError('Failed to get recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = useCallback(async () => {
    if (recommendation) {
      try {
        await navigator.clipboard.writeText(recommendation.workout_recommendation);
        // Snackbar handled in parent if needed
      } catch (err) {
        console.error('Failed to copy to clipboard: ', err);
        setError('Failed to copy to clipboard. Please try manually.');
      }
    }
  }, [recommendation]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
        Workout Recommender
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <TextField
          id="age"
          label="Age"
          type="number"
          name="age"
          value={form.age ?? ''}
          onChange={handleChange}
          error={isAgeInvalid()}
          helperText={isAgeInvalid() ? 'Age must be between 1 and 120' : ''}
          required
          inputProps={{ min: 1, max: 120, onWheel: (e) => e.preventDefault() }}
          fullWidth
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="weight"
          label="Weight (kg)"
          type="number"
          name="weight"
          value={form.weight ?? ''}
          onChange={handleChange}
          error={isWeightInvalid()}
          helperText={isWeightInvalid() ? 'Weight must be greater than 0 kg' : ''}
          required
          inputProps={{ min: 40, max: 300, onWheel: (e) => e.preventDefault() }}
          fullWidth
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="height"
          label="Height (cm)"
          type="number"
          name="height"
          value={form.height ?? ''}
          onChange={handleChange}
          error={isHeightInvalid()}
          helperText={isHeightInvalid() ? 'Height must be greater than 0 cm' : ''}
          required
          inputProps={{ min: 100, max: 250, onWheel: (e) => e.preventDefault() }}
          fullWidth
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth variant="filled" error={isFitnessLevelInvalid()}>
          <InputLabel id="fitness_level-label">Fitness Level</InputLabel>
          <Select
            labelId="fitness_level-label"
            id="fitness_level"
            name="fitness_level"
            value={form.fitness_level}
            onChange={handleSelectChange}
            required
            label="Fitness Level"
          >
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </Select>
          <FormHelperText error={isFitnessLevelInvalid()}>
            {isFitnessLevelInvalid() ? 'Please select a fitness level' : ''}
          </FormHelperText>
        </FormControl>
        <TextField
          id="goals"
          label="Goals"
          name="goals"
          value={form.goals ?? ''}
          onChange={handleChange}
          placeholder="e.g. Lose weight, build muscle"
          fullWidth
          variant="filled"
          multiline
          rows={3}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth variant="filled" error={isGenderInvalid()}>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            name="gender"
            value={form.gender}
            onChange={handleSelectChange}
            required
            label="Gender"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
          <FormHelperText error={isGenderInvalid()}>
            {isGenderInvalid() ? 'Please select gender' : ''}
          </FormHelperText>
        </FormControl>
        <TextField
          id="occupation"
          label="Occupation"
          name="occupation"
          value={form.occupation ?? ''}
          onChange={handleChange}
          error={isOccupationInvalid()}
          helperText={isOccupationInvalid() ? 'Occupation is required' : 'e.g. Software Engineer, Teacher, Student'}
          placeholder="e.g. Software Engineer, Teacher, Student"
          required
          fullWidth
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="average_sleep_hours"
          label="Average Sleep Hours per Night"
          type="number"
          name="average_sleep_hours"
          value={form.average_sleep_hours ?? ''}
          onChange={handleChange}
          error={isSleepInvalid()}
          helperText={isSleepInvalid() ? 'Sleep hours must be greater than 0 and less than or equal to 24' : ''}
          required
          inputProps={{ min: 0, max: 24, step: 0.5, onWheel: (e) => e.preventDefault() }}
          fullWidth
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="body_fat_percentage"
          label="Body Fat Percentage (%)"
          type="number"
          name="body_fat_percentage"
          value={form.body_fat_percentage ?? ''}
          onChange={handleChange}
          error={form.body_fat_percentage != null && (form.body_fat_percentage < 0 || form.body_fat_percentage > 100)}
          helperText={form.body_fat_percentage != null && (form.body_fat_percentage < 0 || form.body_fat_percentage > 100) ? 'Body fat must be between 0 and 100' : 'Optional'}
          placeholder="Optional"
          inputProps={{ min: 0, max: 100, step: 0.1, onWheel: (e) => e.preventDefault() }}
          fullWidth
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading || !isFormValid}
          size="large"
          sx={{
            py: 2.5,
            fontSize: '1.1rem',
            fontWeight: 500,
            borderRadius: 3,
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6,
              transform: 'translateY(-1px)',
            },
            '&:disabled': {
              opacity: 0.6,
            },
            transition: 'all 0.2s ease',
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} /> : null}
          {loading ? 'Getting Recommendation...' : 'Get Recommendation'}
        </Button>
      </form>
      {error && (
        <Alert severity="error" sx={{ mt: 3, borderRadius: 3 }}>
          {error}
        </Alert>
      )}
      {recommendation && (
        <RecommendationCard
          recommendation={recommendation}
          onCopy={handleCopy}
        />
      )}
    </Box>
  );
};

export default HealthForm;