import React from 'react';
import { Button, CircularProgress, Paper, Typography, Box, Chip, Grid, useTheme } from '@mui/material';

interface BMRCalculatorProps {
  bmrState: { result: { bmr: number; tdee: number; activity_level: string } | null; loading: boolean; error: string | null };
  activityLevel: string;
  calculateBMR: () => Promise<void>;
  validateCommonForm: () => boolean;
  hasBmrResult: boolean;
}

const BMRCalculator: React.FC<BMRCalculatorProps> = ({ bmrState, activityLevel, calculateBMR, validateCommonForm }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isValid = validateCommonForm();

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 3.5, color: isDark ? '#A1A1AA' : '#71717A', lineHeight: 1.6 }}>
        <strong style={{ color: isDark ? '#F4F4F5' : '#18181B' }}>Basal Metabolic Rate (BMR)</strong> is calories burned at complete rest. <strong style={{ color: isDark ? '#F4F4F5' : '#18181B' }}>Total Daily Energy Expenditure (TDEE)</strong> includes your activity level to estimate daily calorie needs.
      </Typography>
      <Button
        variant="contained"
        onClick={calculateBMR}
        disabled={bmrState.loading || !isValid}
        fullWidth
        size="large"
        sx={{
          mb: 3.5,
          py: 1.5,
          fontSize: '0.9375rem',
          fontWeight: 500,
        }}
      >
        {bmrState.loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Calculate BMR/TDEE'}
      </Button>
      {bmrState.result && (
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
            Your daily calorie needs
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 6 }}>
              <Typography variant="caption" sx={{ color: isDark ? '#71717A' : '#A1A1AA', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                BMR
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
                {bmrState.result.bmr.toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ color: isDark ? '#71717A' : '#A1A1AA', mt: 0.5 }}>
                calories/day at rest
              </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="caption" sx={{ color: isDark ? '#71717A' : '#A1A1AA', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                TDEE
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: isDark ? '#22D3EE' : '#0891B2',
                  mt: 0.5,
                }}
              >
                {bmrState.result.tdee.toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ color: isDark ? '#71717A' : '#A1A1AA', mt: 0.5 }}>
                calories with activity
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }}>
            <Chip
              label={bmrState.result.activity_level.replace('_', ' ')}
              size="small"
              sx={{
                backgroundColor: isDark ? 'rgba(34,211,238,0.15)' : 'rgba(14,165,233,0.1)',
                color: isDark ? '#22D3EE' : '#0891B2',
                fontWeight: 500,
                fontSize: '0.75rem',
              }}
            />
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default BMRCalculator;