import React from 'react';
import { Button, CircularProgress, Paper, Typography, Box, Grid, TextField, useTheme } from '@mui/material';

interface BodyFatCalculatorProps {
  bodyFatState: { result: { body_fat_percentage: number; category: string } | null; loading: boolean; error: string | null };
  form: {
    waist: number | null;
    neck: number | null;
    hip: number | null;
    gender: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  calculateBodyFat: () => Promise<void>;
  validateCommonForm: () => boolean;
}

const BodyFatCalculator: React.FC<BodyFatCalculatorProps> = ({ bodyFatState, form, handleChange, calculateBodyFat, validateCommonForm }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { waist, neck, hip, gender } = form;
  const isValid = validateCommonForm();

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 3.5, color: isDark ? '#A1A1AA' : '#71717A', lineHeight: 1.6 }}>
        The <strong style={{ color: isDark ? '#F4F4F5' : '#18181B' }}>U.S. Navy method</strong> estimates body fat percentage using circumference measurements. This is an estimation, not a direct measurement.
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2.5, mb: 3.5 }}>
        <TextField
          label="Waist circumference"
          name="waist"
          type="number"
          value={waist ?? ''}
          onChange={handleChange}
          fullWidth
          size="medium"
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
          size="medium"
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
          size="medium"
          placeholder="Measured at widest point"
          helperText={gender === 'female' ? 'Required for females (cm)' : 'Not used for males'}
          disabled={gender === 'male'}
          sx={{
            opacity: gender === 'male' ? 0.5 : 1,
            '& .Mui-disabled': { opacity: 0.5 },
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
        sx={{
          mb: 3.5,
          py: 1.5,
          fontSize: '0.9375rem',
          fontWeight: 500,
        }}
      >
        {bodyFatState.loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Estimate Body Fat'}
      </Button>
      {bodyFatState.result && (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: '16px',
            backgroundColor: isDark ? 'rgba(99,102,241,0.08)' : 'rgba(79,70,229,0.04)',
            border: '1px solid',
            borderColor: isDark ? 'rgba(99,102,241,0.15)' : 'rgba(79,70,229,0.1)',
          }}
        >
          <Typography variant="body2" sx={{ color: isDark ? '#A1A1AA' : '#71717A', mb: 3 }}>
            Estimated body fat percentage
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 6 }}>
              <Typography variant="caption" sx={{ color: isDark ? '#71717A' : '#A1A1AA', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Body Fat
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: isDark ? '#FAFAFA' : '#09090B',
                  mt: 0.5,
                }}
              >
                {bodyFatState.result.body_fat_percentage.toFixed(1)}%
              </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="caption" sx={{ color: isDark ? '#71717A' : '#A1A1AA', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Category
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: isDark ? '#22D3EE' : '#0891B2',
                  mt: 0.5,
                }}
              >
                {bodyFatState.result.category}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default BodyFatCalculator;