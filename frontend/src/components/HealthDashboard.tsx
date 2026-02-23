import React, { useState } from 'react';
import { Box, Paper, Grid, Button } from '@mui/material';
import CommonForm from './common/CommonForm';
import BMICalculator from './calculators/BMICalculator';
import BMRCalculator from './calculators/BMRCalculator';
import BodyFatCalculator from './calculators/BodyFatCalculator';
import MacrosCalculator from './calculators/MacrosCalculator';
import WorkoutRecommender from './calculators/WorkoutRecommender';
import DietRecommender from './calculators/DietRecommender';
import { CALCULATOR_TABS, type CalculatorTab } from '../config';
import { useHealthForm } from '../hooks/useHealthForm';

const HealthDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CalculatorTab>('bmi');
  const healthForm = useHealthForm();

  const tabs = CALCULATOR_TABS;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'bmi':
        return (
          <BMICalculator
            bmiState={healthForm.bmiState}
            calculateBMI={healthForm.calculateBMI}
            validateCommonForm={healthForm.validateCommonForm}
          />
        );
      case 'bmr':
        return (
          <BMRCalculator
            bmrState={healthForm.bmrState}
            activityLevel={healthForm.activityLevel}
            calculateBMR={healthForm.calculateBMR}
            validateCommonForm={healthForm.validateCommonForm}
            hasBmrResult={healthForm.hasBmrResult}
          />
        );
      case 'bodyfat':
        return (
          <BodyFatCalculator
            bodyFatState={healthForm.bodyFatState}
            form={{
              waist: healthForm.form.waist,
              neck: healthForm.form.neck,
              hip: healthForm.form.hip,
              gender: healthForm.form.gender,
            }}
            handleChange={healthForm.handleChange}
            calculateBodyFat={healthForm.calculateBodyFat}
            validateCommonForm={healthForm.validateCommonForm}
          />
        );
      case 'macros':
        return (
          <MacrosCalculator
            macrosState={healthForm.macrosState}
            calculateMacros={healthForm.calculateMacros}
            hasBmrResult={healthForm.hasBmrResult}
            macrosGoal={healthForm.macrosGoal}
            dietType={healthForm.dietType}
            handleSelectChange={healthForm.handleSelectChange}
          />
        );
      case 'workout':
        return (
          <WorkoutRecommender
            workoutState={healthForm.workoutState}
            form={{
              fitness_level: healthForm.form.fitness_level,
              occupation: healthForm.form.occupation,
              average_sleep_hours: healthForm.form.average_sleep_hours,
              goals: healthForm.form.goals,
            }}
            handleChange={healthForm.handleChange}
            validateCommonForm={healthForm.validateCommonForm}
            getWorkoutRecommendation={healthForm.getWorkoutRecommendation}
            copyWorkoutRecommendation={healthForm.copyWorkoutRecommendation}
          />
        );
      case 'diet':
        return (
          <DietRecommender
            dietState={healthForm.dietState}
            form={{
              fitness_level: healthForm.form.fitness_level,
              occupation: healthForm.form.occupation,
              average_sleep_hours: healthForm.form.average_sleep_hours,
              goals: healthForm.form.goals,
            }}
            handleChange={healthForm.handleChange}
            validateCommonForm={healthForm.validateCommonForm}
            getDietRecommendation={healthForm.getDietRecommendation}
            copyDietRecommendation={healthForm.copyDietRecommendation}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 2 }}>
      <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.default' }}>
          <Grid container>
            {tabs.map((tab) => (
              <Grid
                key={tab.id}
                size={{ xs: 6, sm: 3 }}
                component="div"
              >
                <Button
                  fullWidth
                  onClick={() => setActiveTab(tab.id as CalculatorTab)}
                  sx={{
                    py: 2,
                    borderBottom: 2,
                    borderColor: activeTab === tab.id ? 'primary.main' : 'transparent',
                    bgcolor: activeTab === tab.id ? 'background.paper' : 'transparent',
                    borderRadius: 0,
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    color: activeTab === tab.id ? 'primary.main' : 'text.secondary'
                  }}
                >
                  {tab.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ p: 4 }}>
          <CommonForm
            form={healthForm.form}
            activityLevel={healthForm.activityLevel}
            handleChange={healthForm.handleChange}
            handleSelectChange={healthForm.handleSelectChange}
            validateCommonForm={healthForm.validateCommonForm}
          />
          {renderTabContent()}
        </Box>
      </Paper>
    </Box>
  );
};

export default HealthDashboard;
