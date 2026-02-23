// Application configuration constants
export const CONFIG = {
  API_BASE_URL: 'http://localhost:8000',
} as const;

// Fitness levels
export const FITNESS_LEVELS = [
  'Beginner',
  'Intermediate', 
  'Advanced'
] as const;

// Activity levels for BMR/TDEE calculation
export const ACTIVITY_LEVELS = [
  { value: 'sedentary', label: 'Sedentary (little/no exercise)' },
  { value: 'light', label: 'Light (1-3 days/week)' },
  { value: 'moderate', label: 'Moderate (3-5 days/week)' },
  { value: 'active', label: 'Active (6-7 days/week)' },
  { value: 'very_active', label: 'Very Active (2×/day)' },
] as const;

// Gender options
export const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
] as const;

// Occupation categories
export const OCCUPATIONS = [
  'Office Worker',
  'Manual Labour',
  'Student',
  'Retired',
  'Stay-at-home Parent',
  'Athlete',
  'Other'
] as const;

// Goal options for macros
export const MACROS_GOALS = [
  { value: 'lose_weight', label: 'Lose Weight' },
  { value: 'maintain', label: 'Maintain Weight' },
  { value: 'build_muscle', label: 'Build Muscle' },
] as const;

// Diet type options
export const DIET_TYPES = [
  { value: 'standard', label: 'Standard (Balanced)' },
  { value: 'keto', label: 'Keto (Low Carb, High Fat)' },
  { value: 'paleo', label: 'Paleo' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
] as const;

// Calculator tabs configuration
export const CALCULATOR_TABS = [
  { id: 'bmi', label: 'BMI' },
  { id: 'bmr', label: 'BMR/TDEE' },
  { id: 'bodyfat', label: 'Body Fat' },
  { id: 'macros', label: 'Macros' },
  { id: 'workout', label: 'Workout Recommender' },
  { id: 'diet', label: 'Diet Recommender' },
] as const;

export type CalculatorTab = (typeof CALCULATOR_TABS)[number]['id'];
