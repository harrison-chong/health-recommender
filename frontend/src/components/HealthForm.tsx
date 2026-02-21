import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Typography,
  Alert,
  Box,
  Paper,
  Grid,
  Chip,
  Divider
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

interface BMIResponse {
  bmi: number;
}

interface BMRResponse {
  bmr: number;
  tdee: number;
  activity_level: string;
}

interface BodyFatResponse {
  body_fat_percentage: number;
  category: string;
}

interface MacrosResponse {
  calories: number;
  protein_grams: number;
  carbs_grams: number;
  fats_grams: number;
  protein_percentage: number;
  carbs_percentage: number;
  fats_percentage: number;
  goal: string;
  diet_type: string;
}

type CalculatorTab = 'bmi' | 'bmr' | 'bodyfat' | 'macros' | 'workout';

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

  const [activeTab, setActiveTab] = useState<CalculatorTab>('bmi');
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [waist, setWaist] = useState<number | null>(null);
  const [neck, setNeck] = useState<number | null>(null);
  const [hip, setHip] = useState<number | null>(null);
  const [macrosGoal, setMacrosGoal] = useState<string>('maintain');
  const [dietType, setDietType] = useState<string>('standard');

  const [bmiResult, setBmiResult] = useState<BMIResponse | null>(null);
  const [bmrResult, setBmrResult] = useState<BMRResponse | null>(null);
  const [bodyFatResult, setBodyFatResult] = useState<BodyFatResponse | null>(null);
  const [macrosResult, setMacrosResult] = useState<MacrosResponse | null>(null);
  const [recommendation, setRecommendation] = useState<WorkoutRecommendation | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loadingBmr, setLoadingBmr] = useState<boolean>(false);
  const [loadingBodyFat, setLoadingBodyFat] = useState<boolean>(false);
  const [loadingMacros, setLoadingMacros] = useState<boolean>(false);
  const [loadingBmi, setLoadingBmi] = useState<boolean>(false);
  const [loadingWorkout, setLoadingWorkout] = useState<boolean>(false);

  const API_BASE = 'http://localhost:8000';

  const validateCommonForm = (): boolean => {
    if (form.weight == null || form.weight <= 0) {
      setError('Weight must be greater than 0 kg');
      return false;
    }
    if (form.height == null || form.height <= 0) {
      setError('Height must be greater than 0 cm');
      return false;
    }
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (['age', 'weight', 'height', 'average_sleep_hours', 'body_fat_percentage', 'waist', 'neck', 'hip'].includes(name)) {
      const numValue = value === '' ? null : Number(value);
      if (name === 'waist') setWaist(numValue);
      else if (name === 'neck') setNeck(numValue);
      else if (name === 'hip') setHip(numValue);
      else setForm(prev => ({ ...prev, [name]: numValue }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    if (name === 'gender') {
      setForm(prev => ({ ...prev, gender: value as string }));
    } else if (name === 'activityLevel') {
      setActivityLevel(value as string);
    } else if (name === 'macrosGoal') {
      setMacrosGoal(value as string);
    } else if (name === 'dietType') {
      setDietType(value as string);
    } else if (name === 'fitness_level') {
      setForm(prev => ({ ...prev, fitness_level: value as string }));
    }
  };

  const handleBmiCalculate = async () => {
    setError(null);
    setBmiResult(null);
    if (!validateCommonForm()) return;

    setLoadingBmi(true);
    try {
      const response = await axios.post<BMIResponse>(`${API_BASE}/bmi/`, {
        weight: form.weight,
        height: form.height
      });
      setBmiResult(response.data);
    } catch (err: any) {
      setError('Failed to calculate BMI. Please try again.');
    } finally {
      setLoadingBmi(false);
    }
  };

  const handleBmrCalculate = async () => {
    setError(null);
    setBmrResult(null);
    if (!validateCommonForm()) return;

    setLoadingBmr(true);
    try {
      const response = await axios.post<BMRResponse>(`${API_BASE}/bmr/`, {
        age: form.age,
        weight: form.weight,
        height: form.height,
        gender: form.gender,
        activity_level: activityLevel
      });
      setBmrResult(response.data);
    } catch (err: any) {
      setError('Failed to calculate BMR. Please try again.');
    } finally {
      setLoadingBmr(false);
    }
  };

  const handleBodyFatCalculate = async () => {
    setError(null);
    setBodyFatResult(null);
    if (!validateCommonForm()) return;
    if (waist == null || waist <= 0) {
      setError('Waist measurement is required');
      return;
    }
    if (neck == null || neck <= 0) {
      setError('Neck measurement is required');
      return;
    }
    if (form.gender === 'female' && (hip == null || hip <= 0)) {
      setError('Hip measurement is required for females');
      return;
    }

    setLoadingBodyFat(true);
    try {
      const bodyFatInput: any = {
        age: form.age,
        gender: form.gender,
        height: form.height,
        waist,
        neck
      };
      if (form.gender === 'female' && hip != null) {
        bodyFatInput.hip = hip;
      }
      const response = await axios.post<BodyFatResponse>(`${API_BASE}/bodyfat/`, bodyFatInput);
      setBodyFatResult(response.data);
    } catch (err: any) {
      setError('Failed to calculate body fat. Please try again.');
    } finally {
      setLoadingBodyFat(false);
    }
  };

  const handleMacrosCalculate = async () => {
    setError(null);
    setMacrosResult(null);

    // If BMR not calculated yet, calculate it automatically first
    if (!bmrResult) {
      setLoadingMacros(true);
      try {
        const bmrResponse = await axios.post<BMRResponse>(`${API_BASE}/bmr/`, {
          age: form.age,
          weight: form.weight,
          height: form.height,
          gender: form.gender,
          activity_level: activityLevel
        });
        setBmrResult(bmrResponse.data);
      } catch (err: any) {
        setError('Failed to calculate BMR automatically. Please calculate it manually first.');
        setLoadingMacros(false);
        return;
      }
    }

    // At this point bmrResult is guaranteed to be set
    try {
      const response = await axios.post<MacrosResponse>(`${API_BASE}/macros/`, {
        tdee: bmrResult.tdee,
        goal: macrosGoal,
        diet_type: dietType
      });
      setMacrosResult(response.data);
    } catch (err: any) {
      setError('Failed to calculate macronutrients. Please try again.');
    } finally {
      setLoadingMacros(false);
    }
  };

  const handleWorkoutSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setRecommendation(null);
    if (!validateCommonForm()) return;

    setLoadingWorkout(true);
    try {
      const response = await axios.post<WorkoutRecommendation>(`${API_BASE}/recommend`, form);
      setRecommendation(response.data);
    } catch (err: any) {
      setError('Failed to get workout recommendation. Please try again.');
    } finally {
      setLoadingWorkout(false);
    }
  };

  const handleCopy = useCallback(async () => {
    if (recommendation) {
      try {
        await navigator.clipboard.writeText(recommendation.workout_recommendation);
      } catch (err) {
        console.error('Failed to copy to clipboard: ', err);
        setError('Failed to copy to clipboard. Please manually copy.');
      }
    }
  }, [recommendation]);

  const tabs = [
    { id: 'bmi', label: 'BMI' },
    { id: 'bmr', label: 'BMR/TDEE' },
    { id: 'bodyfat', label: 'Body Fat' },
    { id: 'macros', label: 'Macros' },
    { id: 'workout', label: 'Workout Recommender' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'bmi':
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Body Mass Index (BMI) is a simple measure that uses height and weight to estimate body fat. It is used to screen for weight categories that may lead to health problems.
            </Typography>
            <Button
              variant="contained"
              onClick={handleBmiCalculate}
              disabled={loadingBmi}
              fullWidth
              size="large"
              sx={{ mb: 3 }}
            >
              {loadingBmi ? <CircularProgress size={24} /> : 'Calculate BMI'}
            </Button>
            {bmiResult && (
              <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Your BMI result
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 300, mb: 1 }}>{bmiResult.bmi.toFixed(1)}</Typography>
                <Typography variant="h6" color="text.secondary">
                  {bmiResult.bmi < 18.5 ? 'Underweight' :
                   bmiResult.bmi < 25 ? 'Healthy weight' :
                   bmiResult.bmi < 30 ? 'Overweight' : 'Obese'}
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Based on World Health Organization (WHO) classification
                </Typography>
              </Paper>
            )}
          </Box>
        );
      case 'bmr':
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              <strong>Basal Metabolic Rate (BMR)</strong> is the number of calories your body burns at complete rest. <strong>Total Daily Energy Expenditure (TDEE)</strong> estimates the total calories you burn daily including activity. TDEE is calculated based on your BMR and selected activity level.
            </Typography>
            <Button
              variant="contained"
              onClick={handleBmrCalculate}
              disabled={loadingBmr}
              fullWidth
              size="large"
              sx={{ mb: 3 }}
            >
              {loadingBmr ? <CircularProgress size={24} /> : 'Calculate BMR/TDEE'}
            </Button>
            {bmrResult && (
              <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Your daily calorie needs
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      BMR (Basal Metabolic Rate)
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 300 }}>{bmrResult.bmr.toLocaleString()}</Typography>
                    <Typography variant="caption" color="text.secondary">calories/day</Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      TDEE (Total Daily Energy Expenditure)
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 300 }}>{bmrResult.tdee.toLocaleString()}</Typography>
                    <Typography variant="caption" color="text.secondary">calories/day</Typography>
                  </Grid>
                </Grid>
                <Chip
                  label={bmrResult.activity_level.replace('_', ' ')}
                  size="small"
                  sx={{ mt: 2 }}
                  variant="outlined"
                />
              </Paper>
            )}
          </Box>
        );
      case 'bodyfat':
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              The U.S. Navy method <strong>estimates</strong> your body fat percentage using circumference measurements. This is an estimation rather than a direct measurement. Enter your waist and neck measurements (and hip for females) to calculate.
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2, mb: 3 }}>
              <TextField
                label="Waist circumference"
                name="waist"
                type="number"
                value={waist ?? ''}
                onChange={handleChange}
                fullWidth
                size="small"
                placeholder="Measured at navel"
                helperText="Centimetres (cm)"
                inputProps={{ min: 50, max: 200 }}
              />
              <TextField
                label="Neck circumference"
                name="neck"
                type="number"
                value={neck ?? ''}
                onChange={handleChange}
                fullWidth
                size="small"
                placeholder="Measured below larynx"
                helperText="Centimetres (cm)"
                inputProps={{ min: 20, max: 60 }}
              />
              <TextField
                label="Hip circumference"
                name="hip"
                type="number"
                value={hip ?? ''}
                onChange={handleChange}
                fullWidth
                size="small"
                placeholder="Measured at widest point"
                helperText={form.gender === 'female' ? 'Required for females (cm)' : 'Not used for males (cm)'}
                disabled={form.gender === 'male'}
                InputProps={{
                  style: { opacity: form.gender === 'male' ? 0.5 : 1 }
                }}
                inputProps={{ min: 50, max: 200 }}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleBodyFatCalculate}
              disabled={loadingBodyFat}
              fullWidth
              size="large"
              sx={{ mb: 3 }}
            >
              {loadingBodyFat ? <CircularProgress size={24} /> : 'Estimate Body Fat'}
            </Button>
            {bodyFatResult && (
              <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Estimated body fat percentage
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="h2" sx={{ fontWeight: 300, mb: 0.5 }}>
                      {bodyFatResult.body_fat_percentage}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Body fat
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="h5" sx={{ mb: 0.5 }}>
                      {bodyFatResult.category}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Category
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            )}
          </Box>
        );
      case 'macros':
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Calculate your <strong>daily macronutrient targets</strong>. This estimates the grams of protein, carbohydrates, and fats you should aim to consume based on your TDEE, health goals, and dietary preferences.
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Goal</InputLabel>
                  <Select
                    value={macrosGoal}
                    onChange={handleSelectChange}
                    name="macrosGoal"
                    label="Goal"
                  >
                    <MenuItem value="lose_weight">Lose Weight</MenuItem>
                    <MenuItem value="maintain">Maintain Weight</MenuItem>
                    <MenuItem value="build_muscle">Build Muscle</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Diet Type</InputLabel>
                  <Select
                    value={dietType}
                    onChange={handleSelectChange}
                    name="dietType"
                    label="Diet Type"
                  >
                    <MenuItem value="standard">Standard (Balanced)</MenuItem>
                    <MenuItem value="keto">Keto (Low Carb, High Fat)</MenuItem>
                    <MenuItem value="paleo">Paleo</MenuItem>
                    <MenuItem value="vegetarian">Vegetarian</MenuItem>
                    <MenuItem value="vegan">Vegan</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              onClick={handleMacrosCalculate}
              disabled={loadingMacros}
              fullWidth
              size="large"
              sx={{ mb: 3 }}
            >
              {loadingMacros ? <CircularProgress size={24} /> : 'Calculate Macros'}
            </Button>
            {macrosResult && (
              <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Your estimated daily macronutrient intake targets
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="body2" color="text.secondary">
                      Total Daily Calories
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 300 }}>{macrosResult.calories.toLocaleString()}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      kilocalories (kcal)
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      Protein
                      <Typography variant="caption" display="block" component="div">
                        {macrosResult.protein_percentage}% of total calories
                      </Typography>
                    </Typography>
                    <Typography variant="h4">{macrosResult.protein_grams}g</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {macrosGoal === 'build_muscle' ? 'Higher for muscle growth' : macrosGoal === 'lose_weight' ? 'Moderate for preservation' : 'Standard intake'}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      Carbohydrates
                      <Typography variant="caption" display="block" component="div">
                        {macrosResult.carbs_percentage}% of total calories
                      </Typography>
                    </Typography>
                    <Typography variant="h4">{macrosResult.carbs_grams}g</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {dietType === 'keto' ? 'Reduced for ketosis' : 'Primary energy source'}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      Fats
                      <Typography variant="caption" display="block" component="div">
                        {macrosResult.fats_percentage}% of total calories
                      </Typography>
                    </Typography>
                    <Typography variant="h4">{macrosResult.fats_grams}g</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {dietType === 'keto' ? 'Higher for ketosis' : 'Essential for health'}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            )}
          </Box>
        );
      case 'workout':
        return (
          <Box component="form" onSubmit={handleWorkoutSubmit}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              The workout recommender analyses your fitness level, occupation activity, sleep patterns, and goals to generate a personalised exercise plan.
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth required size="small">
                  <InputLabel>Fitness Level</InputLabel>
                  <Select
                    name="fitness_level"
                    value={form.fitness_level}
                    onChange={handleSelectChange}
                    label="Fitness Level"
                  >
                    <MenuItem value="Beginner">Beginner (new to exercise)</MenuItem>
                    <MenuItem value="Intermediate">Intermediate (1-3 years training)</MenuItem>
                    <MenuItem value="Advanced">Advanced (3+ years training)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  id="occupation"
                  label="Occupation"
                  name="occupation"
                  value={form.occupation ?? ''}
                  onChange={handleChange}
                  error={!form.occupation?.trim()}
                  helperText={!form.occupation?.trim() ? 'Required field' : ''}
                  placeholder="e.g. Office Worker, Manual Labour, Student"
                  required
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  id="average_sleep_hours"
                  label="Average Sleep per Night"
                  name="average_sleep_hours"
                  type="number"
                  value={form.average_sleep_hours ?? ''}
                  onChange={handleChange}
                  error={form.average_sleep_hours == null || form.average_sleep_hours <= 0 || form.average_sleep_hours > 24}
                  required
                  fullWidth
                  size="small"
                  helperText="Hours (0-24)"
                  inputProps={{ min: 0, max: 24, step: 0.5 }}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  id="goals"
                  label="Your Fitness Goals"
                  name="goals"
                  value={form.goals ?? ''}
                  onChange={handleChange}
                  placeholder="e.g. Lose 10kg, build muscle, improve endurance, train for marathon"
                  fullWidth
                  multiline
                  rows={2}
                  size="small"
                  helperText="Be specific about what you want to achieve"
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              onClick={handleWorkoutSubmit}
              disabled={loadingWorkout || !validateCommonForm()}
              fullWidth
              size="large"
              sx={{ mb: 3 }}
            >
              {loadingWorkout ? <CircularProgress size={24} /> : 'Get Workout Recommendation'}
            </Button>
            {recommendation && (
              <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Your personalised workout plan
                </Typography>
                <RecommendationCard recommendation={recommendation} onCopy={handleCopy} />
              </Paper>
            )}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 2 }}>
      <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.default' }}>
          <Grid container>
            {tabs.map((tab) => (
              <Grid
                key={tab.id}
                size={{ xs: 6, sm: 3 }}
                component="div"
              >
                <Button
                  fullWidth
                  onClick={() => setActiveTab(tab.id as CalculatorTab)}
                  sx={{
                    py: 2,
                    borderBottom: 2,
                    borderColor: activeTab === tab.id ? 'primary.main' : 'transparent',
                    bgcolor: activeTab === tab.id ? 'background.paper' : 'transparent',
                    borderRadius: 0,
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    color: activeTab === tab.id ? 'primary.main' : 'text.secondary'
                  }}
                >
                  {tab.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
            Basic Information
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
            Enter your basic measurements to get started
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2 }}>
            <TextField
              label="Age"
              name="age"
              type="number"
              value={form.age ?? ''}
              onChange={handleChange}
              fullWidth
              size="small"
              inputProps={{ min: 1, max: 120 }}
              helperText="Years"
            />
            <FormControl fullWidth size="small">
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={form.gender}
                onChange={handleSelectChange}
                label="Gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Weight"
              name="weight"
              type="number"
              value={form.weight ?? ''}
              onChange={handleChange}
              fullWidth
              size="small"
              inputProps={{ min: 40, max: 300 }}
              helperText="Kilograms (kg)"
            />
            <TextField
              label="Height"
              name="height"
              type="number"
              value={form.height ?? ''}
              onChange={handleChange}
              fullWidth
              size="small"
              inputProps={{ min: 100, max: 250 }}
              helperText="Centimetres (cm)"
            />
            <FormControl fullWidth size="small">
              <InputLabel>Activity Level</InputLabel>
              <Select
                name="activityLevel"
                value={activityLevel}
                onChange={handleSelectChange}
                label="Activity Level"
              >
                <MenuItem value="sedentary">Sedentary (little/no exercise)</MenuItem>
                <MenuItem value="light">Light (1-3 days/week)</MenuItem>
                <MenuItem value="moderate">Moderate (3-5 days/week)</MenuItem>
                <MenuItem value="active">Active (6-7 days/week)</MenuItem>
                <MenuItem value="very_active">Very Active (2×/day)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ my: 4 }} />

          {renderTabContent()}
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default HealthForm;
