import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const ink = isDark ? '#F2F1EC' : '#15171A';
  const muted = isDark ? '#8A857C' : '#9A9388';
  const onInkMuted = '#8A857C';
  const signal = isDark ? '#FB923C' : '#F97316';

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
        py: 8,
      }}
    >
      <Box sx={{ position: 'relative', maxWidth: 640, width: '100%' }}>
        {/* Eyebrow */}
        <Typography
          className="num"
          sx={{
            color: signal,
            fontSize: '0.75rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            mb: 3,
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          Health metrics & training plans
        </Typography>

        {/* Headline */}
        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            letterSpacing: '-0.03em',
            mb: 3,
            color: ink,
            fontSize: { xs: '2.5rem', sm: '3.25rem', md: '3.75rem' },
            lineHeight: 1.05,
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          Know your numbers.
          <br />
          Train to them.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 5,
            lineHeight: 1.6,
            fontSize: '1.0625rem',
            color: muted,
            maxWidth: 480,
            textAlign: { xs: 'center', sm: 'left' },
            mx: { xs: 'auto', sm: 0 },
          }}
        >
          BMI, BMR, body fat, and macros — calculated from your measurements — then a
          workout and nutrition plan built around where you are today.
        </Typography>

        {/* Inline ink-card sample: shows what the product does */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            mb: 5,
            borderRadius: '2px',
            backgroundColor: '#15171A',
            color: '#FAFAF7',
            overflow: 'hidden',
            maxWidth: 460,
            mx: { xs: 'auto', sm: 0 },
          }}
        >
          <Box sx={{ p: 2.5, flex: 1 }}>
            <Typography className="num" sx={{ fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: onInkMuted, mb: 1 }}>
              BMI
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <Typography className="num" sx={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>
                22.4
              </Typography>
              <Typography className="num" sx={{ fontSize: '0.75rem', color: onInkMuted }}>kg/m²</Typography>
            </Box>
          </Box>
          <Box sx={{ p: 2.5, borderLeft: '1px solid rgba(255,255,255,0.08)', flex: 1 }}>
            <Typography className="num" sx={{ fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: onInkMuted, mb: 1 }}>
              TDEE
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <Typography className="num" sx={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>
                2,340
              </Typography>
              <Typography className="num" sx={{ fontSize: '0.75rem', color: onInkMuted }}>kcal</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleStart}
            sx={{ py: 1.5, px: 4, fontSize: '0.9375rem' }}
          >
            Start Assessment
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
