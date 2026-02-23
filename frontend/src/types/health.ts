// Base health data input
export interface HealthData {
  age: number | null;
  weight: number | null;
  height: number | null;
  fitness_level: string;
  gender: string;
  occupation: string;
  average_sleep_hours: number | null;
  body_fat_percentage: number | null;
  goals: string | null;
  waist: number | null;
  neck: number | null;
  hip: number | null;
}

// BMI Response
export interface BMIResponse {
  bmi: number;
}

// BMR and TDEE Response
export interface BMRResponse {
  bmr: number;
  tdee: number;
  activity_level: string;
}

// Body Fat Response
export interface BodyFatResponse {
  body_fat_percentage: number;
  category: string;
}

// Macronutrients Response
export interface MacrosResponse {
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

// Workout Recommendation
export interface WorkoutRecommendation {
  workout_recommendation: string;
}

// Diet Recommendation
export interface DietRecommendation {
  diet_recommendation: string;
}

// Calculator state
export interface CalculatorState<T> {
  result: T | null;
  loading: boolean;
  error: string | null;
}

// Common form values
export interface CommonFormValues {
  age: number | null;
  weight: number | null;
  height: number | null;
  gender: string;
  activityLevel: string;
}

// Additional measurements for body fat
export interface BodyFatMeasurements {
  waist: number | null;
  neck: number | null;
  hip: number | null;
}

// Macros specific values
export interface MacrosValues {
  macrosGoal: string;
  dietType: string;
}
