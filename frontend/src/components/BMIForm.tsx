import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
  Card,
  CardContent,
  Alert
} from '@mui/material';

interface BMIInput {
  weight: number | null;
  height: number | null;
}

interface BMIResponse {
  bmi: number;
}

const BMIForm: React.FC = () => {
  const [form, setForm] = useState<BMIInput>({
    weight: null,
    height: null
  });
  const [result, setResult] = useState<BMIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_BASE = 'http://localhost:8000';

  const validateForm = (): string | null => {
    if (form.weight == null || form.weight <= 0) return 'Weight must be greater than 0 kg';
    if (form.height == null || form.height <= 0) return 'Height must be greater than 0 cm';
    return null;
  };

  const isWeightInvalid = () => form.weight == null || form.weight <= 0;
  const isHeightInvalid = () => form.height == null || form.height <= 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value === '' ? null : Number(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post<BMIResponse>(`${API_BASE}/bmi/`, form);
      setResult(response.data);
    } catch (err: any) {
      setError('Failed to calculate BMI. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
        BMI Calculator
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <TextField
          label="Weight (kg)"
          type="number"
          name="weight"
          value={form.weight ?? ''}
          onChange={handleChange}
          error={isWeightInvalid()}
          helperText={isWeightInvalid() ? 'Weight must be greater than 0 kg' : ''}
          required
          inputProps={{ min: 0, step: 0.1 }}
          fullWidth
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Height (cm)"
          type="number"
          name="height"
          value={form.height ?? ''}
          onChange={handleChange}
          error={isHeightInvalid()}
          helperText={isHeightInvalid() ? 'Height must be greater than 0 cm' : ''}
          required
          inputProps={{ min: 0, step: 0.1 }}
          fullWidth
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading || isWeightInvalid() || isHeightInvalid()}
          size="large"
          sx={{
            py: 2,
            fontSize: '1rem',
            borderRadius: 3,
            boxShadow: 3,
            '&:hover': { boxShadow: 6 },
            '&:disabled': { opacity: 0.6 },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} /> : null}
          {loading ? 'Calculating...' : 'Calculate BMI'}
        </Button>
      </form>
      {error && (
        <Alert severity="error" sx={{ borderRadius: 3 }}>
          {error}
        </Alert>
      )}
      {result && (
        <Card sx={{ mt: 3, boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
              Your BMI Result
            </Typography>
            <Typography variant="h3" sx={{ mb: 1, color: 'primary.main' }}>
              {result.bmi.toFixed(2)}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Category: <strong>{getBMICategory(result.bmi)}</strong>
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default BMIForm;