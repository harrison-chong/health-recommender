import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useTheme } from '@mui/material/styles';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const handleStart = () => {
    navigate('/health');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '85vh',
        px: 2,
      }}
    >
      {/* Main card */}
      <Box
        sx={{
          maxWidth: 480,
          width: '100%',
          p: 5,
          textAlign: 'center',
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          borderRadius: 3,
          border: '1px solid',
          borderColor: isDark ? '#334155' : '#e2e8f0',
          boxShadow: isDark
            ? '0 4px 24px rgba(0,0,0,0.4)'
            : '0 4px 16px rgba(0,0,0,0.08)',
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
            p: 2.5,
            borderRadius: '50%',
            backgroundColor: isDark ? '#1e3a5f' : '#eff6ff',
          }}
        >
          <AssessmentIcon
            sx={{
              fontSize: 40,
              color: isDark ? '#60a5fa' : '#2563eb',
            }}
          />
        </Box>

        {/* Title */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            letterSpacing: '-0.025em',
            mb: 1.5,
            color: isDark ? '#f8fafc' : '#0f172a',
          }}
        >
          Welcome
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            lineHeight: 1.7,
            color: isDark ? '#cbd5e1' : '#475569',
          }}
        >
          Your personal AI-powered health and fitness advisor. Get personalised
          workout recommendations and track your health metrics.
        </Typography>

        {/* CTA Button */}
        <Button
          variant="contained"
          size="large"
          onClick={handleStart}
          fullWidth
          sx={{
            py: 1.75,
            fontSize: '1rem',
            fontWeight: 600,
            borderRadius: 2,
            backgroundColor: '#2563eb',
            color: '#ffffff',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#1d4ed8',
            },
          }}
        >
          Start Assessment
        </Button>

        {/* Footer note */}
        <Typography
          variant="caption"
          sx={{
            mt: 3,
            display: 'block',
            color: isDark ? '#64748b' : '#94a3b8',
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          No sign-up required
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;