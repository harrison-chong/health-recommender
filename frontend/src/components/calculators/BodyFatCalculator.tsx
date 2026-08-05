import React from 'react';
import { Button, CircularProgress, Typography, Box, Grid, TextField, useTheme } from '@mui/material';
import ResultCard from '../common/ResultCard';

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
      <Typography variant="body2" sx={{ mb: 3.5, color: isDark ? '#8A857C' : '#9A9388', lineHeight: 1.6 }}>
        The <strong style={{ color: isDark ? '#F2F1EC' : '#15171A' }}>U.S. Navy method</strong> estimates body fat percentage using circumference measurements. This is an estimation, not a direct measurement.
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
        {bodyFatState.loading ? <CircularProgress size={24} sx={{ color: '#FAFAF7' }} /> : 'Estimate Body Fat'}
      </Button>
      {bodyFatState.result && (
        <ResultCard label="Estimated body fat">
          <Grid container spacing={4}>
            <Grid size={{ xs: 7 }}>
              <Typography className="num" sx={{ fontSize: '0.6875rem', letterSpacing: '0.12em', color: '#8A857C', mb: 1 }}>
                BODY FAT
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <Typography className="num" sx={{ fontWeight: 700, letterSpacing: '-0.02em', color: '#FAFAF7', fontSize: '2.5rem', lineHeight: 1 }}>
                  {bodyFatState.result.body_fat_percentage.toFixed(1)}
                </Typography>
                <Typography className="num" sx={{ color: '#8A857C', fontSize: '0.875rem' }}>%</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 5 }}>
              <Typography className="num" sx={{ fontSize: '0.6875rem', letterSpacing: '0.12em', color: isDark ? '#FB923C' : '#F97316', mb: 1 }}>
                CATEGORY
              </Typography>
              <Typography sx={{ fontWeight: 600, color: isDark ? '#FB923C' : '#F97316', fontSize: '1.25rem', lineHeight: 1.2 }}>
                {bodyFatState.result.category}
              </Typography>
            </Grid>
          </Grid>
          <Typography className="num" sx={{ display: 'block', mt: 3, color: '#8A857C', fontSize: '0.6875rem', letterSpacing: '0.08em' }}>
            U.S. NAVY METHOD · ESTIMATION ONLY
          </Typography>
        </ResultCard>
      )}
    </Box>
  );
};

export default BodyFatCalculator;