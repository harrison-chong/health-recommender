import React from 'react';
import { Button, CircularProgress, Paper, Typography, Box } from '@mui/material';

interface BMICalculatorProps {
  bmiState: { result: { bmi: number } | null; loading: boolean; error: string | null };
  calculateBMI: () => Promise<void>;
  validateCommonForm: () => boolean;
}

const BMICalculator: React.FC<BMICalculatorProps> = ({ bmiState, calculateBMI, validateCommonForm }) => {
  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const isValid = validateCommonForm();

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Body Mass Index (BMI) is a simple measure that uses height and weight to estimate body fat. It is used to screen for weight categories that may lead to health problems.
      </Typography>
      <Button
        variant="contained"
        onClick={calculateBMI}
        disabled={bmiState.loading || !isValid}
        fullWidth
        size="large"
        sx={{ mb: 3 }}
      >
        {bmiState.loading ? <CircularProgress size={24} /> : 'Calculate BMI'}
      </Button>
      {bmiState.result && (
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Your BMI result
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 300, mb: 1 }}>{bmiState.result.bmi.toFixed(1)}</Typography>
          <Typography variant="h6" color="text.secondary">
            {getBMICategory(bmiState.result.bmi)}
          </Typography>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Based on World Health Organization (WHO) classification
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default BMICalculator;
