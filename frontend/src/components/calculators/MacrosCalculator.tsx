import React from 'react';
import { Button, CircularProgress, Paper, Typography, Box, Grid, FormControl, InputLabel, Select, MenuItem, useTheme } from '@mui/material';
import { MACROS_GOALS, DIET_TYPES } from '../../config';

interface MacrosCalculatorProps {
  macrosState: { result: { calories: number; protein_grams: number; carbs_grams: number; fats_grams: number; protein_percentage: number; carbs_percentage: number; fats_percentage: number } | null; loading: boolean; error: string | null };
  macrosGoal: string;
  dietType: string;
  calculateMacros: () => Promise<void>;
  handleSelectChange: (e: { target: { name: string; value: string } }) => void;
  hasBmrResult: boolean;
}

const MacrosCalculator: React.FC<MacrosCalculatorProps> = ({ macrosState, macrosGoal, dietType, calculateMacros, handleSelectChange }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const macroColors = {
    protein: { color: '#6366F1', bg: isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)' },
    carbs: { color: '#22D3EE', bg: isDark ? 'rgba(34,211,238,0.15)' : 'rgba(34,211,238,0.1)' },
    fats: { color: '#F59E0B', bg: isDark ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.1)' },
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 3.5, color: isDark ? '#A1A1AA' : '#71717A', lineHeight: 1.6 }}>
        Calculate your <strong style={{ color: isDark ? '#F4F4F5' : '#18181B' }}>daily macronutrient targets</strong> based on your TDEE, health goals, and dietary preferences.
      </Typography>
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth size="medium">
            <InputLabel>Goal</InputLabel>
            <Select
              value={macrosGoal}
              onChange={handleSelectChange}
              name="macrosGoal"
              label="Goal"
            >
              {MACROS_GOALS.map(goal => (
                <MenuItem key={goal.value} value={goal.value}>{goal.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth size="medium">
            <InputLabel>Diet Type</InputLabel>
            <Select
              value={dietType}
              onChange={handleSelectChange}
              name="dietType"
              label="Diet Type"
            >
              {DIET_TYPES.map(diet => (
                <MenuItem key={diet.value} value={diet.value}>{diet.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        onClick={calculateMacros}
        disabled={macrosState.loading}
        fullWidth
        size="large"
        sx={{
          mb: 3.5,
          py: 1.5,
          fontSize: '0.9375rem',
          fontWeight: 500,
        }}
      >
        {macrosState.loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Calculate Macros'}
      </Button>
      {macrosState.result && (
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
          <Typography variant="body2" sx={{ color: isDark ? '#A1A1AA' : '#71717A', mb: 1 }}>
            Your estimated daily intake
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 4, mt: 1 }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: isDark ? '#FAFAFA' : '#09090B',
                fontSize: '2.75rem',
              }}
            >
              {macrosState.result.calories.toLocaleString()}
            </Typography>
            <Typography variant="body1" sx={{ color: isDark ? '#A1A1AA' : '#71717A' }}>
              kcal
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Protein */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: '12px',
                  backgroundColor: macroColors.protein.bg,
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '3px', backgroundColor: macroColors.protein.color }} />
                  <Typography variant="caption" sx={{ color: isDark ? '#A1A1AA' : '#71717A', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Protein
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 600, color: macroColors.protein.color, mb: 0.5 }}>
                  {macrosState.result.protein_grams}g
                </Typography>
                <Typography variant="body2" sx={{ color: isDark ? '#71717A' : '#A1A1AA' }}>
                  {macrosState.result.protein_percentage}% of calories
                </Typography>
              </Box>
            </Grid>

            {/* Carbs */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: '12px',
                  backgroundColor: macroColors.carbs.bg,
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(34,211,238,0.2)' : 'rgba(34,211,238,0.15)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '3px', backgroundColor: macroColors.carbs.color }} />
                  <Typography variant="caption" sx={{ color: isDark ? '#A1A1AA' : '#71717A', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Carbs
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 600, color: macroColors.carbs.color, mb: 0.5 }}>
                  {macrosState.result.carbs_grams}g
                </Typography>
                <Typography variant="body2" sx={{ color: isDark ? '#71717A' : '#A1A1AA' }}>
                  {macrosState.result.carbs_percentage}% of calories
                </Typography>
              </Box>
            </Grid>

            {/* Fats */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: '12px',
                  backgroundColor: macroColors.fats.bg,
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(245,158,11,0.2)' : 'rgba(245,158,11,0.15)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '3px', backgroundColor: macroColors.fats.color }} />
                  <Typography variant="caption" sx={{ color: isDark ? '#A1A1AA' : '#71717A', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Fats
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 600, color: macroColors.fats.color, mb: 0.5 }}>
                  {macrosState.result.fats_grams}g
                </Typography>
                <Typography variant="body2" sx={{ color: isDark ? '#71717A' : '#A1A1AA' }}>
                  {macrosState.result.fats_percentage}% of calories
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default MacrosCalculator;