import axios from 'axios';
import type {
  BMIResponse,
  BMRResponse,
  BodyFatResponse,
  MacrosResponse,
  WorkoutRecommendation,
  HealthData,
} from '../types/health';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const healthApi = {
  // BMI calculation
  calculateBMI: async (weight: number, height: number): Promise<BMIResponse> => {
    const response = await api.post<BMIResponse>('/bmi/', { weight, height });
    return response.data;
  },

  // BMR and TDEE calculation
  calculateBMR: async (
    age: number,
    weight: number,
    height: number,
    gender: string,
    activity_level: string
  ): Promise<BMRResponse> => {
    const response = await api.post<BMRResponse>('/bmr/', {
      age,
      weight,
      height,
      gender,
      activity_level,
    });
    return response.data;
  },

  // Body fat percentage calculation (Navy method)
  calculateBodyFat: async (
    age: number,
    gender: string,
    height: number,
    waist: number,
    neck: number,
    hip?: number
  ): Promise<BodyFatResponse> => {
    const bodyFatInput: any = {
      age,
      gender,
      height,
      waist,
      neck,
    };
    if (gender === 'female' && hip != null) {
      bodyFatInput.hip = hip;
    }
    const response = await api.post<BodyFatResponse>('/bodyfat/', bodyFatInput);
    return response.data;
  },

  // Macronutrient calculation
  calculateMacros: async (
    tdee: number,
    goal: string,
    diet_type: string
  ): Promise<MacrosResponse> => {
    const response = await api.post<MacrosResponse>('/macros/', {
      tdee,
      goal,
      diet_type,
    });
    return response.data;
  },

  // Workout recommendation
  getWorkoutRecommendation: async (
    healthData: HealthData
  ): Promise<WorkoutRecommendation> => {
    const response = await api.post<WorkoutRecommendation>('/recommend', healthData);
    return response.data;
  },
};

export default api;
