import React, { ChangeEvent, FormEvent } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import {
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Typography
} from '@mui/material';

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

interface HealthFormProps {
  form: HealthData;
  setForm: React.Dispatch<React.SetStateAction<HealthData>>;
  validationError: string | null;
  isFormValid: boolean;
  isAgeInvalid: () => boolean;
  isWeightInvalid: () => boolean;
  isHeightInvalid: () => boolean;
  isFitnessLevelInvalid: () => boolean;
  isGenderInvalid: () => boolean;
  isOccupationInvalid: () => boolean;
  isSleepInvalid: () => boolean;
  loading: boolean;
  onSubmit: (e: FormEvent) => void;
}

const HealthForm: React.FC<HealthFormProps> = ({
  form,
  setForm,
  validationError,
  isFormValid,
  isAgeInvalid,
  isWeightInvalid,
  isHeightInvalid,
  isFitnessLevelInvalid,
  isGenderInvalid,
  isOccupationInvalid,
  isSleepInvalid,
  loading,
  onSubmit
}) => {
  const handleChange = React.useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let newValue: any;
    if (name === 'age' || name === 'weight' || name === 'height' || name === 'average_sleep_hours' || name === 'body_fat_percentage') {
      newValue = value === '' ? null : Number(value);
    } else {
      newValue = value;
    }
    setForm((prev: HealthData) => ({ ...prev, [name]: newValue }));
  }, [setForm]);

  const handleSelectChange = React.useCallback((e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setForm((prev: HealthData) => ({ ...prev, [name]: value }));
  }, [setForm]);

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
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
        inputProps={{ min: 1, max: 120 }}
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
        inputProps={{ min: 40, max: 300 }}
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
        inputProps={{ min: 100, max: 250 }}
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
        value={form.goals}
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
        inputProps={{ min: 0, max: 24, step: 0.5 }}
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
        inputProps={{ min: 0, max: 100, step: 0.1 }}
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
  );
};

export default HealthForm;