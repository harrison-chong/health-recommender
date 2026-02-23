import React from 'react';
import { Button, CircularProgress, Paper, Typography, Box, Grid, TextField } from '@mui/material';
import { useHealthForm } from '../../hooks/useHealthForm';

const BodyFatCalculator: React.FC = () => {
  const { bodyFatState, calculateBodyFat, form, handleChange, validateCommonForm } = useHealthForm();

  // Destructure the measurement fields from form
  const { waist, neck, hip } = form;
  
  // Helper to get values with non-null assertion after validation
  const waistValue = waist!;
  const neckValue = neck!;
  const hipValue = hip!;

  const isValid = validateCommonForm();

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
          value={form.waist ?? ''}
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
          value={form.neck ?? ''}
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
          value={form.hip ?? ''}
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
        onClick={calculateBodyFat}
        disabled={bodyFatState.loading || !isValid}
        fullWidth
        size="large"
        sx={{ mb: 3 }}
      >
        {bodyFatState.loading ? <CircularProgress size={24} /> : 'Estimate Body Fat'}
      </Button>
      {bodyFatState.result && (
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Estimated body fat percentage
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 6 }}>
              <Typography variant="h2" sx={{ fontWeight: 300, mb: 0.5 }}>
                {bodyFatState.result.body_fat_percentage}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Body fat
              </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="h5" sx={{ mb: 0.5 }}>
                {bodyFatState.result.category}
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
};

export default BodyFatCalculator;
