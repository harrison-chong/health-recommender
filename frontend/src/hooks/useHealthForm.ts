import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import type { HealthData, CalculatorState, CommonFormValues, BodyFatMeasurements, MacrosValues } from '../types/health';
import { healthApi } from '../services/healthApi';

export interface UseHealthFormReturn {
  // Form state (includes waist, neck, hip as part of HealthData)
  form: HealthData;
  activityLevel: string;
  macrosGoal: string;
  dietType: string;

  // Calculator states
  bmiState: CalculatorState<{ bmi: number }>;
  bmrState: CalculatorState<{ bmr: number; tdee: number; activity_level: string }>;
  bodyFatState: CalculatorState<{ body_fat_percentage: number; category: string }>;
  macrosState: CalculatorState<{ calories: number; protein_grams: number; carbs_grams: number; fats_grams: number; protein_percentage: number; carbs_percentage: number; fats_percentage: number; goal: string; diet_type: string }>;
  workoutState: CalculatorState<{ workout_recommendation: string }>;

  // Error & loading
  error: string | null;
  
  // Handlers
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (e: { target: { name: string; value: string } }) => void;
  
  // Calculator actions
  calculateBMI: () => Promise<void>;
  calculateBMR: () => Promise<void>;
  calculateBodyFat: () => Promise<void>;
  calculateMacros: () => Promise<void>;
  getWorkoutRecommendation: (e: FormEvent) => Promise<void>;
  
  // Copy to clipboard
  copyWorkoutRecommendation: () => Promise<void>;

  // Validation
  validateCommonForm: () => boolean;
  hasBmrResult: boolean;
}

export const useHealthForm = (): UseHealthFormReturn => {
  // Unified form state
  const [form, setForm] = useState<HealthData>({
    age: 30,
    weight: 70,
    height: 170,
    fitness_level: 'Beginner',
    gender: 'male',
    occupation: 'Office Worker',
    average_sleep_hours: 7.5,
    goals: '',
    waist: null,
    neck: null,
    hip: null,
  });

  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [macrosGoal, setMacrosGoal] = useState<string>('maintain');
  const [dietType, setDietType] = useState<string>('standard');

  // Calculator states
  const [bmiState, setBmiState] = useState<CalculatorState<{ bmi: number }>>({ result: null, loading: false, error: null });
  const [bmrState, setBmrState] = useState<CalculatorState<{ bmr: number; tdee: number; activity_level: string }>>({ result: null, loading: false, error: null });
  const [bodyFatState, setBodyFatState] = useState<CalculatorState<{ body_fat_percentage: number; category: string }>>({ result: null, loading: false, error: null });
  const [macrosState, setMacrosState] = useState<CalculatorState<{ calories: number; protein_grams: number; carbs_grams: number; fats_grams: number; protein_percentage: number; carbs_percentage: number; fats_percentage: number; goal: string; diet_type: string }>>({ result: null, loading: false, error: null });
  const [workoutState, setWorkoutState] = useState<CalculatorState<{ workout_recommendation: string }>>({ result: null, loading: false, error: null });

  const [error, setError] = useState<string | null>(null);

  const validateCommonForm = useCallback((): boolean => {
    if (form.weight == null || form.weight <= 0) {
      setError('Weight must be greater than 0 kg');
      return false;
    }
    if (form.height == null || form.height <= 0) {
      setError('Height must be greater than 0 cm');
      return false;
    }
    return true;
  }, [form.weight, form.height]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (['age', 'weight', 'height', 'average_sleep_hours', 'body_fat_percentage', 'waist', 'neck', 'hip'].includes(name)) {
      const numValue = value === '' ? null : Number(value);
      setForm(prev => ({ ...prev, [name]: numValue }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  const handleSelectChange = useCallback((e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    switch (name) {
      case 'gender':
        setForm(prev => ({ ...prev, gender: value }));
        break;
      case 'activityLevel':
        setActivityLevel(value);
        break;
      case 'macrosGoal':
        setMacrosGoal(value);
        break;
      case 'dietType':
        setDietType(value);
        break;
      case 'fitness_level':
        setForm(prev => ({ ...prev, fitness_level: value }));
        break;
    }
  }, []);

  const calculateBMI = useCallback(async () => {
    setError(null);
    setBmiState({ result: null, loading: true, error: null });
    if (!validateCommonForm()) {
      setBmiState(prev => ({ ...prev, loading: false }));
      return;
    }

    try {
      const result = await healthApi.calculateBMI(form.weight!, form.height!);
      setBmiState({ result, loading: false, error: null });
    } catch (err) {
      setBmiState({ result: null, loading: false, error: 'Failed to calculate BMI' });
      setError('Failed to calculate BMI. Please try again.');
    }
  }, [form.weight, form.height, validateCommonForm]);

  const calculateBMR = useCallback(async () => {
    setError(null);
    setBmrState({ result: null, loading: true, error: null });
    if (!validateCommonForm()) {
      setBmrState(prev => ({ ...prev, loading: false }));
      return;
    }

    try {
      const result = await healthApi.calculateBMR(form.age!, form.weight!, form.height!, form.gender, activityLevel);
      setBmrState({ result, loading: false, error: null });
    } catch (err) {
      setBmrState({ result: null, loading: false, error: 'Failed to calculate BMR' });
      setError('Failed to calculate BMR. Please try again.');
    }
  }, [form.age, form.weight, form.height, form.gender, activityLevel, validateCommonForm]);

  const calculateBodyFat = useCallback(async () => {
    setError(null);
    setBodyFatState({ result: null, loading: true, error: null });
    if (!validateCommonForm()) {
      setBodyFatState(prev => ({ ...prev, loading: false }));
      return;
    }
    const { waist, neck, hip, gender, age, height } = form;
    if (waist == null || waist <= 0) {
      setBodyFatState(prev => ({ ...prev, loading: false }));
      setError('Waist measurement is required');
      return;
    }
    if (neck == null || neck <= 0) {
      setBodyFatState(prev => ({ ...prev, loading: false }));
      setError('Neck measurement is required');
      return;
    }
    if (gender === 'female' && (hip == null || hip <= 0)) {
      setBodyFatState(prev => ({ ...prev, loading: false }));
      setError('Hip measurement is required for females');
      return;
    }

    // TypeScript type narrowing: after validation, these are guaranteed to be numbers
    const waistValue = waist!;
    const neckValue = neck!;
    const hipValue = hip!;
    const ageValue = age!;
    const heightValue = height!;

    try {
      const result = await healthApi.calculateBodyFat(ageValue, gender, heightValue, waistValue, neckValue, gender === 'female' ? hipValue : undefined);
      setBodyFatState({ result, loading: false, error: null });
    } catch (err) {
      setBodyFatState({ result: null, loading: false, error: 'Failed to calculate body fat' });
      setError('Failed to calculate body fat. Please try again.');
    }
  }, [form, validateCommonForm]);

  const calculateMacros = useCallback(async () => {
    setError(null);
    setMacrosState({ result: null, loading: true, error: null });

    // If BMR not calculated yet, calculate it automatically first
    if (!bmrState.result) {
      try {
        const bmrResponse = await healthApi.calculateBMR(form.age!, form.weight!, form.height!, form.gender, activityLevel);
        setBmrState({ result: bmrResponse, loading: false, error: null });
      } catch (err) {
        setMacrosState({ result: null, loading: false, error: 'Failed to calculate BMR automatically' });
        setError('Failed to calculate BMR automatically. Please calculate it manually first.');
        return;
      }
    }

    // At this point bmrResult is guaranteed to be set
    const bmrResult = bmrState.result || (await healthApi.calculateBMR(form.age!, form.weight!, form.height!, form.gender, activityLevel));
    
    try {
      const result = await healthApi.calculateMacros(bmrResult.tdee, macrosGoal, dietType);
      setMacrosState({ result, loading: false, error: null });
    } catch (err) {
      setMacrosState({ result: null, loading: false, error: 'Failed to calculate macros' });
      setError('Failed to calculate macronutrients. Please try again.');
    }
  }, [form.age, form.weight, form.height, form.gender, activityLevel, macrosGoal, dietType, bmrState.result]);

  const getWorkoutRecommendation = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setWorkoutState({ result: null, loading: true, error: null });
    if (!validateCommonForm()) {
      setWorkoutState(prev => ({ ...prev, loading: false }));
      return;
    }

    try {
      const result = await healthApi.getWorkoutRecommendation(form);
      setWorkoutState({ result, loading: false, error: null });
    } catch (err) {
      setWorkoutState({ result: null, loading: false, error: 'Failed to get workout recommendation' });
      setError('Failed to get workout recommendation. Please try again.');
    }
  }, [form, validateCommonForm]);

  const copyWorkoutRecommendation = useCallback(async () => {
    if (workoutState.result) {
      try {
        await navigator.clipboard.writeText(workoutState.result.workout_recommendation);
      } catch (err) {
        console.error('Failed to copy to clipboard: ', err);
        setError('Failed to copy to clipboard. Please manually copy.');
      }
    }
  }, [workoutState.result]);

  const hasBmrResult = bmrState.result !== null;

  return {
    form,
    activityLevel,
    macrosGoal,
    dietType,
    bmiState,
    bmrState,
    bodyFatState,
    macrosState,
    workoutState,
    error,
    handleChange,
    handleSelectChange,
    calculateBMI,
    calculateBMR,
    calculateBodyFat,
    calculateMacros,
    getWorkoutRecommendation,
    copyWorkoutRecommendation,
    validateCommonForm,
    hasBmrResult,
  };
};
