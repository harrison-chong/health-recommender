import React from 'react';
import { Button, CircularProgress, Typography, Box, Grid, FormControl, InputLabel, Select, MenuItem, useTheme } from '@mui/material';
import { MACROS_GOALS, DIET_TYPES } from '../../config';
import ResultCard from '../common/ResultCard';

interface MacrosCalculatorProps {
  macrosState: { result: { calories: number; protein_grams: number; carbs_grams: number; fats_grams: number; protein_percentage: number; carbs_percentage: number; fats_percentage: number } | null; loading: boolean; error: string | null };
  macrosGoal: string;
  dietType: string;
  calculateMacros: () => Promise<void>;
  handleSelectChange: (e: { target: { name: string; value: string } }) => void;
}

const MacrosCalculator: React.FC<MacrosCalculatorProps> = ({ macrosState, macrosGoal, dietType, calculateMacros, handleSelectChange }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const signal = isDark ? '#FB923C' : '#F97316';
  // Ink shades for the three macros — paper-side lighter, two darker greys. No rainbow.
  const macroShade = { protein: '#FAFAF7', carbs: signal, fats: '#8A857C' };

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 3.5, color: isDark ? '#8A857C' : '#9A9388', lineHeight: 1.6 }}>
        Calculate your <strong style={{ color: isDark ? '#F2F1EC' : '#15171A' }}>daily macronutrient targets</strong> from
        your TDEE, goal, and diet preference.
      </Typography>
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth size="medium">
            <InputLabel>Goal</InputLabel>
            <Select value={macrosGoal} onChange={handleSelectChange} name="macrosGoal" label="Goal">
              {MACROS_GOALS.map(goal => (
                <MenuItem key={goal.value} value={goal.value}>{goal.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth size="medium">
            <InputLabel>Diet Type</InputLabel>
            <Select value={dietType} onChange={handleSelectChange} name="dietType" label="Diet Type">
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
        sx={{ mb: 0, py: 1.5 }}
      >
        {macrosState.loading ? <CircularProgress size={24} sx={{ color: '#FAFAF7' }} /> : 'Calculate Macros'}
      </Button>
      {macrosState.result && (
        <ResultCard label="Your daily intake">
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 3 }}>
            <Typography className="num" sx={{ fontWeight: 700, letterSpacing: '-0.03em', color: '#FAFAF7', fontSize: '2.75rem', lineHeight: 1 }}>
              {macrosState.result.calories.toLocaleString()}
            </Typography>
            <Typography className="num" sx={{ color: '#8A857C', fontSize: '0.875rem' }}>kcal</Typography>
          </Box>

          {/* Proportional macro split bar */}
          <Box sx={{ display: 'flex', gap: '2px', mb: 2 }}>
            <Box sx={{ height: 8, flex: macrosState.result.protein_percentage, backgroundColor: macroShade.protein }} />
            <Box sx={{ height: 8, flex: macrosState.result.carbs_percentage, backgroundColor: macroShade.carbs }} />
            <Box sx={{ height: 8, flex: macrosState.result.fats_percentage, backgroundColor: macroShade.fats }} />
          </Box>

          <Grid container spacing={2}>
            {([
              { label: 'PROTEIN', grams: macrosState.result.protein_grams, pct: macrosState.result.protein_percentage, shade: macroShade.protein },
              { label: 'CARBS', grams: macrosState.result.carbs_grams, pct: macrosState.result.carbs_percentage, shade: macroShade.carbs },
              { label: 'FATS', grams: macrosState.result.fats_grams, pct: macrosState.result.fats_percentage, shade: macroShade.fats },
            ] as const).map((m) => (
              <Grid size={{ xs: 4 }} key={m.label}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, backgroundColor: m.shade }} />
                  <Typography className="num" sx={{ color: '#8A857C', fontSize: '0.6875rem', letterSpacing: '0.1em' }}>
                    {m.label}
                  </Typography>
                </Box>
                <Typography className="num" sx={{ fontWeight: 700, color: m.shade, fontSize: '1.5rem', lineHeight: 1 }}>
                  {m.grams}<Box component="span" sx={{ fontSize: '0.875rem', color: '#8A857C' }}>g</Box>
                </Typography>
                <Typography className="num" sx={{ color: '#8A857C', fontSize: '0.6875rem', mt: 0.5 }}>
                  {m.pct}%
                </Typography>
              </Grid>
            ))}
          </Grid>
        </ResultCard>
      )}
    </Box>
  );
};

export default MacrosCalculator;
