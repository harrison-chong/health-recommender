import React from 'react';
import { Button, CircularProgress, Paper, Typography, Box, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useHealthForm } from '../../hooks/useHealthForm';
import { MACROS_GOALS, DIET_TYPES } from '../../config';

const MacrosCalculator: React.FC = () => {
  const { macrosState, macrosGoal, dietType, calculateMacros, handleSelectChange, hasBmrResult } = useHealthForm();

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Calculate your <strong>daily macronutrient targets</strong>. This estimates the grams of protein, carbohydrates, and fats you should aim to consume based on your TDEE, health goals, and dietary preferences.
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth size="small">
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
          <FormControl fullWidth size="small">
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
        sx={{ mb: 3 }}
      >
        {macrosState.loading ? <CircularProgress size={24} /> : 'Calculate Macros'}
      </Button>
      {macrosState.result && (
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Your estimated daily macronutrient intake targets
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" color="text.secondary">
                Total Daily Calories
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 300 }}>{macrosState.result.calories.toLocaleString()}</Typography>
              <Typography variant="caption" color="text.secondary">
                kilocalories (kcal)
              </Typography>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Protein
                <Typography variant="caption" display="block" component="div">
                  {macrosState.result.protein_percentage}% of total calories
                </Typography>
              </Typography>
              <Typography variant="h4">{macrosState.result.protein_grams}g</Typography>
              <Typography variant="caption" color="text.secondary">
                {macrosGoal === 'build_muscle' ? 'Higher for muscle growth' : macrosGoal === 'lose_weight' ? 'Moderate for preservation' : 'Standard intake'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Carbohydrates
                <Typography variant="caption" display="block" component="div">
                  {macrosState.result.carbs_percentage}% of total calories
                </Typography>
              </Typography>
              <Typography variant="h4">{macrosState.result.carbs_grams}g</Typography>
              <Typography variant="caption" color="text.secondary">
                {dietType === 'keto' ? 'Reduced for ketosis' : 'Primary energy source'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Fats
                <Typography variant="caption" display="block" component="div">
                  {macrosState.result.fats_percentage}% of total calories
                </Typography>
              </Typography>
              <Typography variant="h4">{macrosState.result.fats_grams}g</Typography>
              <Typography variant="caption" color="text.secondary">
                {dietType === 'keto' ? 'Higher for ketosis' : 'Essential for health'}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default MacrosCalculator;
