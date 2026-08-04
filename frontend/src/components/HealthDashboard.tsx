import React, { useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

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
    <Box sx={{ maxWidth: 960, mx: 'auto', py: { xs: 3, md: 5 } }}>
      {/* Header */}
      <Box sx={{ mb: 5, textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{ fontWeight: 700, letterSpacing: '-0.02em', mb: 1.5, color: isDark ? '#F2F1EC' : '#15171A' }}
        >
          Health Assessment
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: isDark ? '#8A857C' : '#9A9388', maxWidth: 500, mx: 'auto' }}
        >
          Enter your measurements to calculate your metrics and get a workout and nutrition plan.
        </Typography>
      </Box>

      {/* Main container — flat paper panel, 2px radius, hairline border */}
      <Box
        sx={{
          borderRadius: '2px',
          backgroundColor: isDark ? '#1E1F22' : '#FFFFFF',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#E3E0D8',
        }}
      >
        {/* Tab strip — flat row, ink underline indicator */}
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            px: 1,
            gap: 0.5,
            borderBottom: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#E3E0D8',
            '&::-webkit-scrollbar': { height: 0 },
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as CalculatorTab)}
                sx={{
                  flex: '0 0 auto',
                  minWidth: 'max-content',
                  py: 1.5,
                  px: 2,
                  borderRadius: 0,
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.8125rem',
                  color: isActive ? (isDark ? '#F2F1EC' : '#15171A') : (isDark ? '#8A857C' : '#9A9388'),
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  borderBottom: '2px solid',
                  borderColor: isActive ? (isDark ? '#F2F1EC' : '#15171A') : 'transparent',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: isDark ? '#F2F1EC' : '#15171A',
                  },
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </Button>
            );
          })}
        </Box>

        {/* Content */}
        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <CommonForm
            form={healthForm.form}
            activityLevel={healthForm.activityLevel}
            handleChange={healthForm.handleChange}
            handleSelectChange={healthForm.handleSelectChange}
            validateCommonForm={healthForm.validateCommonForm}
          />
          {renderTabContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default HealthDashboard;