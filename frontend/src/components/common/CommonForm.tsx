import React from 'react';
import { Box, Grid, TextField, FormControl, InputLabel, Select, Typography, Divider, MenuItem } from '@mui/material';
import { useHealthForm } from '../../hooks/useHealthForm';
import { ACTIVITY_LEVELS, GENDERS } from '../../config';

const CommonForm: React.FC = () => {
  const { form, activityLevel, handleChange, handleSelectChange, validateCommonForm } = useHealthForm();

  const isValid = validateCommonForm();

  return (
    <>
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
          required
          error={form.age == null || form.age <= 0}
        />
        <FormControl fullWidth size="small" required>
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={form.gender}
            onChange={handleSelectChange}
            label="Gender"
          >
            {GENDERS.map(gender => (
              <MenuItem key={gender.value} value={gender.value}>{gender.label}</MenuItem>
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
          size="small"
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
          size="small"
          inputProps={{ min: 100, max: 250 }}
          helperText="Centimetres (cm)"
          required
          error={form.height == null || form.height <= 0}
        />
        <FormControl fullWidth size="small" required>
          <InputLabel>Activity Level</InputLabel>
          <Select
            name="activityLevel"
            value={activityLevel}
            onChange={handleSelectChange}
            label="Activity Level"
          >
            {ACTIVITY_LEVELS.map(level => (
              <MenuItem key={level.value} value={level.value}>{level.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 4 }} />
    </>
  );
};

export default CommonForm;
