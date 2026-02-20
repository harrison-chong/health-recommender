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
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            width: '100%',
            maxWidth: 500,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 300,
                letterSpacing: '-0.02em',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Welcome
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              Your personal AI-powered health and fitness advisor. Get personalised workout
              recommendations and track your health metrics.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                py: 2,
              }}
            >
              <AssessmentIcon sx={{ fontSize: 48, color: 'primary.main' }} />
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
