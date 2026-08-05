import React from 'react';
import { Button, CircularProgress, Typography, Box, Grid, useTheme } from '@mui/material';
import ResultCard from '../common/ResultCard';

interface BMRCalculatorProps {
  bmrState: { result: { bmr: number; tdee: number; activity_level: string } | null; loading: boolean; error: string | null };
  activityLevel: string;
  calculateBMR: () => Promise<void>;
  validateCommonForm: () => boolean;
}

const BMRCalculator: React.FC<BMRCalculatorProps> = ({ bmrState, calculateBMR, validateCommonForm }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isValid = validateCommonForm();
  const signal = isDark ? '#FB923C' : '#F97316';

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 3.5, color: isDark ? '#8A857C' : '#9A9388', lineHeight: 1.6 }}>
        <strong style={{ color: isDark ? '#F2F1EC' : '#15171A' }}>Basal Metabolic Rate (BMR)</strong> is the
        calories you burn at complete rest. <strong style={{ color: isDark ? '#F2F1EC' : '#15171A' }}>Total Daily
        Energy Expenditure (TDEE)</strong> layers in your activity level to estimate daily calorie needs.
      </Typography>
      <Button
        variant="contained"
        onClick={calculateBMR}
        disabled={bmrState.loading || !isValid}
        fullWidth
        size="large"
        sx={{ mb: 0, py: 1.5 }}
      >
        {bmrState.loading ? <CircularProgress size={24} sx={{ color: '#FAFAF7' }} /> : 'Calculate BMR / TDEE'}
      </Button>
      {bmrState.result && (
        <ResultCard label="Your daily calorie needs">
          <Grid container spacing={4}>
            <Grid size={{ xs: 6 }}>
              <Typography className="num" sx={{ fontSize: '0.6875rem', letterSpacing: '0.12em', color: '#8A857C', mb: 1 }}>
                BMR
              </Typography>
              <Typography className="num" sx={{ fontWeight: 700, letterSpacing: '-0.02em', color: '#FAFAF7', fontSize: '2.25rem', lineHeight: 1 }}>
                {bmrState.result.bmr.toLocaleString()}
              </Typography>
              <Typography className="num" sx={{ color: '#8A857C', fontSize: '0.75rem', mt: 1 }}>
                cal/day at rest
              </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography className="num" sx={{ fontSize: '0.6875rem', letterSpacing: '0.12em', color: signal, mb: 1 }}>
                TDEE
              </Typography>
              <Typography className="num" sx={{ fontWeight: 700, letterSpacing: '-0.02em', color: signal, fontSize: '2.25rem', lineHeight: 1 }}>
                {bmrState.result.tdee.toLocaleString()}
              </Typography>
              <Typography className="num" sx={{ color: '#8A857C', fontSize: '0.75rem', mt: 1 }}>
                cal/day with activity
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <Typography className="num" sx={{ color: '#8A857C', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {bmrState.result.activity_level.replace('_', ' ')}
            </Typography>
          </Box>
        </ResultCard>
      )}
    </Box>
  );
};

export default BMRCalculator;
