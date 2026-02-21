import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import HealthForm from './HealthForm';

const HealthPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 300, mb: 2 }}>
          Health Calculator
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}>
          Calculate your health metrics and get personalised recommendations
        </Typography>
      </Box>

      <HealthForm />
    </Container>
  );
};

export default HealthPage;
