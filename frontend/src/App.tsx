import React, { useState } from 'react';
import axios from 'axios';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ReactMarkdown from 'react-markdown';

import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Alert,
  CardActions,
  Snackbar
} from '@mui/material';

import { SelectChangeEvent } from '@mui/material/Select';

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
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#f50057',
    },
    text: {
      primary: '#1a1a1a',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
          borderRadius: 24,
          backgroundColor: '#fafafa',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'white',
            '&:hover': {
              borderColor: '#000',
            },
            '&.Mui-focused': {
              borderColor: '#000',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#000',
              },
            },
          },
          '& .MuiInputLabel-root': {
            color: '#555',
            '&.Mui-focused': {
              color: '#000',
            },
          },
          '& .MuiInputBase-input': {
            color: '#1a1a1a',
            '&::placeholder': {
              color: '#999',
              opacity: 1,
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            backgroundColor: 'white',
          },
        },
        icon: {
          color: '#555',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },
  },
});

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
   * Handles input changes in the form.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let newValue: any;
    if (name === 'age' || name === 'weight' || name === 'height' || name === 'average_sleep_hours' || name === 'body_fat_percentage') {
      newValue = value === '' ? null : Number(value);
    } else {
      newValue = value;
    }
    setForm(prev => ({ ...prev, [name]: newValue }));
  };

  /**
   * Handles select changes (fitness_level).
   */
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

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
  const handleCopy = async () => {
    if (recommendation) {
      try {
        await navigator.clipboard.writeText(recommendation.workout_recommendation);
        setSnackbarOpen(true);
      } catch (err) {
        console.error('Failed to copy to clipboard: ', err);
        setError('Failed to copy to clipboard. Please try manually.');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 8, backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', px: { xs: 2, sm: 4 } }}>
        <Box sx={{ width: '100%', maxWidth: 480 }}>
          <Typography variant="h2" component="h1" align="center" sx={{ mb: 6, fontWeight: 300, color: 'text.primary' }}>
            Health Recommender
          </Typography>
          <Card sx={{ p: 4, boxShadow: 6, borderRadius: 3 }}>
            <CardContent sx={{ '&:last-child': { pb: 4 } }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <TextField
                  id="age"
                  label="Age"
                  type="number"
                  name="age"
                  value={form.age ?? ''}
                  onChange={handleChange}
                  error={isAgeInvalid()}
                  required
                  inputProps={{ min: 1, max: 120 }}
                  fullWidth
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    sx: {
                      fontSize: '1.1rem',
                      '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                        display: 'none',
                        WebkitAppearance: 'none',
                        margin: 0
                      },
                      '& input[type=number]': {
                        MozAppearance: 'textfield'
                      }
                    }
                  }}
                  sx={{
                    '& .MuiFilledInput-root': {
                      backgroundColor: 'white',
                    },
                    '& .MuiFilledInput-input': {
                      color: 'text.primary',
                    },
                  }}
                />
                <TextField
                  id="weight"
                  label="Weight (kg)"
                  type="number"
                  name="weight"
                  value={form.weight ?? ''}
                  onChange={handleChange}
                  error={isWeightInvalid()}
                  required
                  inputProps={{ min: 40, max: 300 }}
                  fullWidth
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    sx: {
                      fontSize: '1.1rem',
                      '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                        display: 'none',
                        WebkitAppearance: 'none',
                        margin: 0
                      },
                      '& input[type=number]': {
                        MozAppearance: 'textfield'
                      }
                    }
                  }}
                  sx={{
                    '& .MuiFilledInput-root': {
                      backgroundColor: 'white',
                    },
                    '& .MuiFilledInput-input': {
                      color: 'text.primary',
                    },
                  }}
                />
                <TextField
                  id="height"
                  label="Height (cm)"
                  type="number"
                  name="height"
                  value={form.height ?? ''}
                  onChange={handleChange}
                  error={isHeightInvalid()}
                  required
                  inputProps={{ min: 100, max: 250 }}
                  fullWidth
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    sx: {
                      fontSize: '1.1rem',
                      '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                        display: 'none',
                        WebkitAppearance: 'none',
                        margin: 0
                      },
                      '& input[type=number]': {
                        MozAppearance: 'textfield'
                      }
                    }
                  }}
                  sx={{
                    '& .MuiFilledInput-root': {
                      backgroundColor: 'white',
                    },
                    '& .MuiFilledInput-input': {
                      color: 'text.primary',
                    },
                  }}
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
                    sx={{
                      '& .MuiFilledInput-root': {
                        backgroundColor: 'white',
                      },
                    }}
                  >
                    <MenuItem value="Beginner">Beginner</MenuItem>
                    <MenuItem value="Intermediate">Intermediate</MenuItem>
                    <MenuItem value="Advanced">Advanced</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  id="goals"
                  label="Goals"
                  name="goals"
                  value={form.goals}
                  onChange={handleChange}
                  placeholder="e.g. Lose weight, build muscle"
                  fullWidth
                  variant="filled"
                  multiline
                  rows={3}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiFilledInput-root': {
                      backgroundColor: 'white',
                    },
                    '& .MuiFilledInput-input': {
                      color: 'text.primary',
                    },
                  }}
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
                    sx={{
                      '& .MuiFilledInput-root': {
                        backgroundColor: 'white',
                      },
                    }}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  id="occupation"
                  label="Occupation"
                  name="occupation"
                  value={form.occupation ?? ''}
                  onChange={handleChange}
                  error={isOccupationInvalid()}
                  placeholder="e.g. Software Engineer, Teacher, Student"
                  required
                  fullWidth
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiFilledInput-root': {
                      backgroundColor: 'white',
                    },
                    '& .MuiFilledInput-input': {
                      color: 'text.primary',
                    },
                  }}
                />
                <TextField
                  id="average_sleep_hours"
                  label="Average Sleep Hours per Night"
                  type="number"
                  name="average_sleep_hours"
                  value={form.average_sleep_hours ?? ''}
                  onChange={handleChange}
                  error={isSleepInvalid()}
                  required
                  inputProps={{ min: 0, max: 24, step: 0.5 }}
                  fullWidth
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    sx: {
                      fontSize: '1.1rem',
                      '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                        display: 'none',
                        WebkitAppearance: 'none',
                        margin: 0
                      },
                      '& input[type=number]': {
                        MozAppearance: 'textfield'
                      }
                    }
                  }}
                  sx={{
                    '& .MuiFilledInput-root': {
                      backgroundColor: 'white',
                    },
                    '& .MuiFilledInput-input': {
                      color: 'text.primary',
                    },
                  }}
                />
                <TextField
                  id="body_fat_percentage"
                  label="Body Fat Percentage (%)"
                  type="number"
                  name="body_fat_percentage"
                  value={form.body_fat_percentage ?? ''}
                  onChange={handleChange}
                  placeholder="Optional"
                  inputProps={{ min: 0, max: 100, step: 0.1 }}
                  fullWidth
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    sx: {
                      fontSize: '1.1rem',
                      '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                        display: 'none',
                        WebkitAppearance: 'none',
                        margin: 0
                      },
                      '& input[type=number]': {
                        MozAppearance: 'textfield'
                      }
                    }
                  }}
                  sx={{
                    '& .MuiFilledInput-root': {
                      backgroundColor: 'white',
                    },
                    '& .MuiFilledInput-input': {
                      color: 'text.primary',
                    },
                  }}
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
            </CardContent>
          </Card>
          {recommendation && (
            <Card sx={{ mt: 5, boxShadow: 6, borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 300, color: 'text.primary' }}>
                  Your Personalised Workout Plan
                </Typography>
                <Box sx={{ maxHeight: 400, overflow: 'auto', p: 3, bgcolor: 'grey.50', borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                  <ReactMarkdown
                    components={{
                      h1: ({ children, ...props }) => <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary', mt: 4 }} {...props}>{children}</Typography>,
                      h2: ({ children, ...props }) => <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1.5, color: 'text.primary', mt: 3 }} {...props}>{children}</Typography>,
                      h3: ({ children, ...props }) => <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary', mt: 2 }} {...props}>{children}</Typography>,
                      strong: ({ children, ...props }) => <Typography component="strong" sx={{ fontWeight: 'bold', color: 'text.primary' }} {...props}>{children}</Typography>,
                      em: ({ children, ...props }) => <Typography component="em" sx={{ fontStyle: 'italic' }} {...props}>{children}</Typography>,
                      code: ({ children, ...props }) => <Box component="code" sx={{ bgcolor: 'grey.100', px: 1, borderRadius: 1, fontFamily: 'monospace', fontSize: '0.875rem' }} {...props}>{children}</Box>,
                      pre: ({ children, ...props }) => <Box component="pre" sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 2, overflowX: 'auto', my: 2, fontFamily: 'monospace', fontSize: '0.875rem' }} {...props}>{children}</Box>,
                      p: ({ children, ...props }) => <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2, color: 'text.secondary' }} {...props}>{children}</Typography>,
                      ul: ({ children, ...props }) => <Box component="ul" sx={{ pl: 4, mb: 2 }} {...props}>{children}</Box>,
                      ol: ({ children, ...props }) => <Box component="ol" sx={{ pl: 4, mb: 2 }} {...props}>{children}</Box>,
                      li: ({ children, ...props }) => <Typography component="li" variant="body2" sx={{ mb: 0.5, color: 'text.secondary' }} {...props}>{children}</Typography>,
                    }}
                  >
                    {recommendation.workout_recommendation}
                  </ReactMarkdown>
                </Box>
                <CardActions sx={{ justifyContent: 'center', pt: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleCopy}
                    endIcon={<ContentCopy />}
                    sx={{ textTransform: 'none' }}
                  >
                    Copy to Clipboard
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
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
