import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Divider,
  MenuItem,
  useTheme,
} from '@mui/material';
import { ACTIVITY_LEVELS, GENDERS } from '../../config';
import type { HealthData } from '../../types/health';

interface CommonFormProps {
  form: HealthData;
  activityLevel: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (e: { target: { name: string; value: string } }) => void;
  validateCommonForm: () => boolean;
}

const CommonForm: React.FC<CommonFormProps> = ({
  form,
  activityLevel,
  handleChange,
  handleSelectChange,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 1,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: isDark ? '#f8fafc' : '#0f172a',
        }}
      >
        Basic Information
      </Typography>
      <Typography
        variant="body2"
        sx={{ mb: 3, color: isDark ? '#94a3b8' : '#64748b' }}
      >
        Enter your basic measurements to get started
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
          gap: 2.5,
        }}
      >
        <TextField
          label="Age"
          name="age"
          type="number"
          value={form.age ?? ''}
          onChange={handleChange}
          fullWidth
          size="medium"
          inputProps={{ min: 1, max: 120 }}
          helperText="Years"
          required
          error={form.age == null || form.age <= 0}
        />
        <FormControl fullWidth size="medium" required>
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={form.gender}
            onChange={handleSelectChange}
            label="Gender"
          >
            {GENDERS.map((gender) => (
              <MenuItem key={gender.value} value={gender.value}>
                {gender.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Weight"
          name="weight"
          type="number"
          value={form.weight ?? ''}
          onChange={handleChange}
          fullWidth
          size="medium"
          inputProps={{ min: 40, max: 300 }}
          helperText="Kilograms (kg)"
          required
          error={form.weight == null || form.weight <= 0}
        />
        <TextField
          label="Height"
          name="height"
          type="number"
          value={form.height ?? ''}
          onChange={handleChange}
          fullWidth
          size="medium"
          inputProps={{ min: 100, max: 250 }}
          helperText="Centimetres (cm)"
          required
          error={form.height == null || form.height <= 0}
        />
        <FormControl fullWidth size="medium" required>
          <InputLabel>Activity Level</InputLabel>
          <Select
            name="activityLevel"
            value={activityLevel}
            onChange={handleSelectChange}
            label="Activity Level"
          >
            {ACTIVITY_LEVELS.map((level) => (
              <MenuItem key={level.value} value={level.value}>
                {level.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ mt: 4 }} />
    </Box>
  );
};

export default CommonForm;