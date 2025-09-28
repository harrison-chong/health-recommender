import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/health');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h2" component="h1" sx={{ mb: 4, fontWeight: 300 }}>
          Welcome to Health Recommender
        </Typography>
        <Typography variant="body1" sx={{ mb: 6, color: 'text.secondary' }}>
          Your personalised health and fitness advisor.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleStart}
          sx={{
            px: 6,
            py: 2,
            fontSize: '1.1rem',
            borderRadius: 3,
            boxShadow: 3,
            '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' },
          }}
        >
          Start Health Assessment
        </Button>
      </Box>
    </Container>
  );
};

export default Home;