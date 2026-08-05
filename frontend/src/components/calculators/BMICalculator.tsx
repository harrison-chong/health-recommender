import React from 'react';
import { Button, CircularProgress, Typography, Box, useTheme } from '@mui/material';
import ResultCard from '../common/ResultCard';

interface BMICalculatorProps {
  bmiState: { result: { bmi: number } | null; loading: boolean; error: string | null };
  calculateBMI: () => Promise<void>;
  validateCommonForm: () => boolean;
}

const BMICalculator: React.FC<BMICalculatorProps> = ({ bmiState, calculateBMI, validateCommonForm }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isValid = validateCommonForm();

  // Status uses the orange signal for the band you land in; ranges in mono.
  const getCategory = (bmi: number): { label: string; range: string } => {
    if (bmi < 18.5) return { label: 'UNDERWEIGHT', range: '< 18.5' };
    if (bmi < 25) return { label: 'NORMAL', range: '18.5 — 24.9' };
    if (bmi < 30) return { label: 'OVERWEIGHT', range: '25.0 — 29.9' };
    return { label: 'OBESE', range: '≥ 30.0' };
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 3.5, color: isDark ? '#8A857C' : '#9A9388', lineHeight: 1.6 }}>
        Body Mass Index (BMI) estimates body fat from your height-to-weight ratio. It's a general
        screening tool for weight categories, not a direct measure of body composition.
      </Typography>
      <Button
        variant="contained"
        onClick={calculateBMI}
        disabled={bmiState.loading || !isValid}
        fullWidth
        size="large"
        sx={{ mb: 0, py: 1.5 }}
      >
        {bmiState.loading ? <CircularProgress size={24} sx={{ color: '#FAFAF7' }} /> : 'Calculate BMI'}
      </Button>
      {bmiState.result && (() => {
        const bmi = bmiState.result.bmi;
        const category = getCategory(bmi);
        return (
          <ResultCard label="Your BMI result">
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 2 }}>
              <Typography className="num" sx={{ fontWeight: 700, letterSpacing: '-0.03em', color: '#FAFAF7', fontSize: '3.5rem', lineHeight: 1 }}>
                {bmi.toFixed(1)}
              </Typography>
              <Typography className="num" sx={{ color: '#8A857C', fontSize: '0.875rem' }}>
                kg/m²
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 8, height: 8, backgroundColor: isDark ? '#FB923C' : '#F97316' }} />
              <Typography className="num" sx={{ fontWeight: 700, color: isDark ? '#FB923C' : '#F97316', fontSize: '0.875rem', letterSpacing: '0.04em' }}>
                {category.label}
              </Typography>
              <Typography className="num" sx={{ color: '#8A857C', fontSize: '0.75rem', ml: 'auto' }}>
                {category.range}
              </Typography>
            </Box>

            {/* Range bar: BMI bands 18.5 / 6.5 / 5 / open */}
            <Box sx={{ mt: 2, display: 'flex', gap: '2px' }}>
              <Box sx={{ height: 4, flex: 18.5, backgroundColor: 'rgba(255,255,255,0.1)' }} />
              <Box sx={{ height: 4, flex: 6.5, backgroundColor: isDark ? '#FB923C' : '#F97316' }} />
              <Box sx={{ height: 4, flex: 5, backgroundColor: 'rgba(255,255,255,0.1)' }} />
              <Box sx={{ height: 4, flex: 10, backgroundColor: 'rgba(255,255,255,0.1)' }} />
            </Box>

            <Typography className="num" sx={{ display: 'block', mt: 3, color: '#8A857C', fontSize: '0.6875rem', letterSpacing: '0.08em' }}>
              BASED ON WHO CLASSIFICATION
            </Typography>
          </ResultCard>
        );
      })()}
    </Box>
  );
};

export default BMICalculator;
