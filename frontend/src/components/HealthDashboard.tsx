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
    <Box
      sx={{
        maxWidth: 960,
        mx: 'auto',
        py: 4,
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 5, textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 600,
            letterSpacing: '-0.025em',
            mb: 1.5,
            color: isDark ? '#FAFAFA' : '#09090B',
          }}
        >
          Health Assessment
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: isDark ? '#A1A1AA' : '#71717A',
            maxWidth: 500,
            mx: 'auto',
          }}
        >
          Enter your measurements to calculate your health metrics and receive AI-powered recommendations.
        </Typography>
      </Box>

      {/* Main container */}
      <Box
        sx={{
          borderRadius: '20px',
          overflow: 'hidden',
          backgroundColor: isDark ? '#18181B' : '#FFFFFF',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
          boxShadow: isDark
            ? '0 4px 24px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)'
            : '0 4px 16px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        {/* Tab navigation - pill style */}
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            p: 2,
            gap: 1,
            borderBottom: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            '&::-webkit-scrollbar': { height: 0 },
            backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
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
                  py: 1.25,
                  px: 2.5,
                  borderRadius: '10px',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.8125rem',
                  color: isActive
                    ? '#FFFFFF'
                    : (isDark ? '#A1A1AA' : '#71717A'),
                  backgroundColor: isActive
                    ? (isDark ? '#6366F1' : '#4F46E5')
                    : 'transparent',
                  boxShadow: isActive
                    ? (isDark
                        ? '0 2px 8px rgba(99,102,241,0.3)'
                        : '0 2px 8px rgba(79,70,229,0.2)')
                    : 'none',
                  '&:hover': {
                    backgroundColor: isActive
                      ? (isDark ? '#7C7FFF' : '#4338CA')
                      : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
                  },
                  transition: 'all 0.15s ease',
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