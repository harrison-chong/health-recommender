import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

// Gradient SVG for background effect
const GradientBlob = ({ color, size = 400, blur = 120 }: { color: string; size?: number; blur?: number }) => (
  <Box
    sx={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: `blur(${blur}px)`,
      opacity: 0.4,
      pointerEvents: 'none',
    }}
  />
);

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
        minHeight: '100vh',
        px: 3,
        position: 'relative',
        overflow: 'hidden',
        background: isDark
          ? 'linear-gradient(180deg, #09090B 0%, #0F0F12 50%, #09090B 100%)'
          : 'linear-gradient(180deg, #FAFAFA 0%, #F4F4F5 50%, #FAFAFA 100%)',
      }}
    >
      {/* Ambient gradient blobs */}
      <GradientBlob
        color={isDark ? '#6366F1' : '#818CF8'}
        size={500}
        blur={150}
      />
      <GradientBlob
        color={isDark ? '#22D3EE' : '#38BDF8'}
        size={400}
        blur={100}
        sx={{ top: '20%', right: '-10%' }}
      />
      <GradientBlob
        color={isDark ? '#4F46E5' : '#A5B4FC'}
        size={350}
        blur={80}
        sx={{ bottom: '25%', left: '-5%' }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          maxWidth: 560,
          width: '100%',
          textAlign: 'center',
          py: 8,
        }}
      >
        {/* Logo mark */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 4,
            p: 3,
            borderRadius: '24px',
            background: isDark
              ? 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(34,211,238,0.1) 100%)'
              : 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(14,165,233,0.05) 100%)',
            border: '1px solid',
            borderColor: isDark ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.15)',
          }}
        >
          {/* Abstract vitality symbol */}
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path
              d="M24 4C13 4 6 14 6 24C6 34 13 44 24 44C35 44 42 34 42 24"
              stroke={isDark ? '#818CF8' : '#6366F1'}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M24 14C18 14 14 20 14 24C14 28 18 34 24 34C30 34 34 28 34 24"
              stroke={isDark ? '#22D3EE' : '#0EA5E9'}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="24" cy="24" r="3" fill={isDark ? '#818CF8' : '#6366F1'} />
          </svg>
        </Box>

        {/* Brand */}
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: isDark ? '#6366F1' : '#4F46E5',
          }}
        >
          Vitality
        </Typography>

        {/* Title */}
        <Typography
          variant="h1"
          sx={{
            fontWeight: 600,
            letterSpacing: '-0.03em',
            mb: 2,
            color: isDark ? '#FAFAFA' : '#09090B',
            fontSize: { xs: '2.5rem', sm: '3rem' },
          }}
        >
          Your AI Health
          <br />
          <Box
            component="span"
            sx={{
              background: isDark
                ? 'linear-gradient(90deg, #818CF8 0%, #22D3EE 100%)'
                : 'linear-gradient(90deg, #6366F1 0%, #0EA5E9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Compass
          </Box>
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            mb: 5,
            lineHeight: 1.7,
            fontSize: '1.0625rem',
            color: isDark ? '#A1A1AA' : '#71717A',
            maxWidth: 440,
            mx: 'auto',
          }}
        >
          Personalised health insights powered by artificial intelligence.
          Calculate your metrics and get expert recommendations tailored to you.
        </Typography>

        {/* CTA Button */}
        <Button
          variant="contained"
          size="large"
          onClick={handleStart}
          sx={{
            py: 2,
            px: 5,
            fontSize: '1rem',
            fontWeight: 500,
            borderRadius: '12px',
            background: isDark
              ? 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)'
              : 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)',
            color: '#FFFFFF',
            boxShadow: isDark
              ? '0 4px 24px rgba(99,102,241,0.4)'
              : '0 4px 16px rgba(79,70,229,0.25)',
            '&:hover': {
              background: isDark
                ? 'linear-gradient(135deg, #818CF8 0%, #6366F1 100%)'
                : 'linear-gradient(135deg, #4338CA 0%, #3730A3 100%)',
              boxShadow: isDark
                ? '0 6px 32px rgba(99,102,241,0.5)'
                : '0 6px 20px rgba(79,70,229,0.35)',
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          Start Assessment
        </Button>

        {/* Footer badges */}
        <Box
          sx={{
            mt: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            flexWrap: 'wrap',
          }}
        >
          {['No sign-up required', 'Instant results', 'AI-powered'].map((badge) => (
            <Box
              key={badge}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: isDark ? '#6366F1' : '#4F46E5',
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: isDark ? '#71717A' : '#A1A1AA',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                }}
              >
                {badge}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;