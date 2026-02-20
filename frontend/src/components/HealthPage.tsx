import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import BMIForm from './BMIForm';
import HealthForm from './HealthForm';

const HealthPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 300, mb: 2 }}>
          Health Assessment
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, lineHeight: 1.6 }}>
          Get personalised health recommendations based on your current status and goals.
          Use the tools below to calculate your BMI and receive workout recommendations.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
        }}
      >
        <Box
          sx={{
            flexBasis: { xs: '100%', md: 'calc(50% - 16px)' },
            flexGrow: 1,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              height: '100%',
              minHeight: 500,
            }}
          >
            <BMIForm />
          </Paper>
        </Box>

        <Box
          sx={{
            flexBasis: { xs: '100%', md: 'calc(50% - 16px)' },
            flexGrow: 1,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              height: '100%',
              minHeight: 500,
            }}
          >
            <HealthForm />
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default HealthPage;
