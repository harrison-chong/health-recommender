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
        maxWidth: 900,
        mx: 'auto',
        py: 3,
      }}
    >
      {/* Main container */}
      <Box
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          border: '1px solid',
          borderColor: isDark ? '#334155' : '#e2e8f0',
          boxShadow: isDark
            ? '0 4px 16px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        {/* Tab navigation */}
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            borderBottom: '1px solid',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
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
                  flex: '1 0 auto',
                  minWidth: 'max-content',
                  py: 2,
                  px: 3,
                  borderRadius: 0,
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.85rem',
                  color: isActive
                    ? (isDark ? '#60a5fa' : '#2563eb')
                    : (isDark ? '#94a3b8' : '#64748b'),
                  backgroundColor: isActive
                    ? (isDark ? '#1e293b' : '#ffffff')
                    : 'transparent',
                  borderBottom: '2px solid',
                  borderColor: isActive
                    ? (isDark ? '#3b82f6' : '#2563eb')
                    : 'transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    backgroundColor: isDark ? '#29354a' : '#f8fafc',
                    color: isDark ? '#cbd5e1' : '#334155',
                  },
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