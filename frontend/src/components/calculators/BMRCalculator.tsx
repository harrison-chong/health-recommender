import React from 'react';
import { Button, CircularProgress, Paper, Typography, Box, Chip, Grid } from '@mui/material';
import { useHealthForm } from '../../hooks/useHealthForm';

const BMRCalculator: React.FC = () => {
  const { bmrState, activityLevel, calculateBMR, validateCommonForm } = useHealthForm();

  const isValid = validateCommonForm();

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        <strong>Basal Metabolic Rate (BMR)</strong> is the number of calories your body burns at complete rest. <strong>Total Daily Energy Expenditure (TDEE)</strong> estimates the total calories you burn daily including activity. TDEE is calculated based on your BMR and selected activity level.
      </Typography>
      <Button
        variant="contained"
        onClick={calculateBMR}
        disabled={bmrState.loading || !isValid}
        fullWidth
        size="large"
        sx={{ mb: 3 }}
      >
        {bmrState.loading ? <CircularProgress size={24} /> : 'Calculate BMR/TDEE'}
      </Button>
      {bmrState.result && (
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Your daily calorie needs
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" color="text.secondary">
                BMR (Basal Metabolic Rate)
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 300 }}>{bmrState.result.bmr.toLocaleString()}</Typography>
              <Typography variant="caption" color="text.secondary">calories/day</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" color="text.secondary">
                TDEE (Total Daily Energy Expenditure)
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 300 }}>{bmrState.result.tdee.toLocaleString()}</Typography>
              <Typography variant="caption" color="text.secondary">calories/day</Typography>
            </Grid>
          </Grid>
          <Chip
            label={bmrState.result.activity_level.replace('_', ' ')}
            size="small"
            sx={{ mt: 2 }}
            variant="outlined"
          />
        </Paper>
      )}
    </Box>
  );
};

export default BMRCalculator;
