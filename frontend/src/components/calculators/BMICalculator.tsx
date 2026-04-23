import React from 'react';
import { Button, CircularProgress, Paper, Typography, Box, useTheme } from '@mui/material';

interface BMICalculatorProps {
  bmiState: { result: { bmi: number } | null; loading: boolean; error: string | null };
  calculateBMI: () => Promise<void>;
  validateCommonForm: () => boolean;
}

const BMICalculator: React.FC<BMICalculatorProps> = ({ bmiState, calculateBMI, validateCommonForm }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const getBMICategory = (bmi: number): { label: string; color: string; bgColor: string } => {
    if (bmi < 18.5) return { label: 'Underweight', color: '#F59E0B', bgColor: 'rgba(245,158,11,0.1)' };
    if (bmi < 25) return { label: 'Normal', color: '#10B981', bgColor: 'rgba(16,185,129,0.1)' };
    if (bmi < 30) return { label: 'Overweight', color: '#F97316', bgColor: 'rgba(249,115,22,0.1)' };
    return { label: 'Obese', color: '#EF4444', bgColor: 'rgba(239,68,68,0.1)' };
  };

  const isValid = validateCommonForm();

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 3.5, color: isDark ? '#A1A1AA' : '#71717A', lineHeight: 1.6 }}>
        Body Mass Index (BMI) estimates body fat using height and weight ratio. Use it as a general screening tool for weight categories.
      </Typography>
      <Button
        variant="contained"
        onClick={calculateBMI}
        disabled={bmiState.loading || !isValid}
        fullWidth
        size="large"
        sx={{
          mb: 3.5,
          py: 1.5,
          fontSize: '0.9375rem',
          fontWeight: 500,
        }}
      >
        {bmiState.loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Calculate BMI'}
      </Button>
      {bmiState.result && (() => {
        const category = getBMICategory(bmiState.result.bmi);
        return (
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
            <Typography variant="body2" sx={{ color: isDark ? '#A1A1AA' : '#71717A', mb: 1.5 }}>
              Your BMI result
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 2 }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: isDark ? '#FAFAFA' : '#09090B',
                  fontSize: '3.5rem',
                }}
              >
                {bmiState.result.bmi.toFixed(1)}
              </Typography>
              <Typography variant="body1" sx={{ color: isDark ? '#A1A1AA' : '#71717A' }}>
                kg/m²
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: '8px',
                backgroundColor: category.bgColor,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: category.color,
                }}
              />
              <Typography
                sx={{
                  fontWeight: 600,
                  color: category.color,
                  fontSize: '0.875rem',
                }}
              >
                {category.label}
              </Typography>
            </Box>
            <Typography variant="caption" display="block" sx={{ mt: 3, color: isDark ? '#71717A' : '#A1A1AA' }}>
              Based on World Health Organization (WHO) classification
            </Typography>
          </Paper>
        );
      })()}
    </Box>
  );
};

export default BMICalculator;