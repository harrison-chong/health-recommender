import React from 'react';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssessmentIcon from '@mui/icons-material/Assessment';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/health');
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          minHeight: '70vh',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            mb: 6,
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 300,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              mb: 4,
              color: 'text.primary',
            }}
          >
            Health Recommender
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              lineHeight: 1.6,
              maxWidth: 600,
              mx: 'auto',
              mb: 6,
            }}
          >
            Your personal AI-powered health and fitness advisor. Get personalized workout
            recommendations and track your health metrics.
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            width: '100%',
            maxWidth: 500,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AssessmentIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>
                  Personalized Assessments
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  BMI calculation and workout recommendations tailored to you
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              size="large"
              onClick={handleStart}
              fullWidth
              sx={{
                py: 2,
                fontSize: '1.1rem',
                borderRadius: 2,
              }}
            >
              Start Assessment
            </Button>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textAlign: 'center', display: 'block' }}
            >
              No sign-up required. Free to use.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
