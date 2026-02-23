import React, { useState } from 'react';
import { Box, Paper, Grid, Button, Typography } from '@mui/material';
import CommonForm from './common/CommonForm';
import BMICalculator from './calculators/BMICalculator';
import BMRCalculator from './calculators/BMRCalculator';
import BodyFatCalculator from './calculators/BodyFatCalculator';
import MacrosCalculator from './calculators/MacrosCalculator';
import WorkoutRecommender from './calculators/WorkoutRecommender';
import { CALCULATOR_TABS, type CalculatorTab } from '../config';

const HealthDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CalculatorTab>('bmi');

  const tabs = CALCULATOR_TABS;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'bmi':
        return <BMICalculator />;
      case 'bmr':
        return <BMRCalculator />;
      case 'bodyfat':
        return <BodyFatCalculator />;
      case 'macros':
        return <MacrosCalculator />;
      case 'workout':
        return <WorkoutRecommender />;
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
          <CommonForm />
          {renderTabContent()}
        </Box>
      </Paper>
    </Box>
  );
};

export default HealthDashboard;
