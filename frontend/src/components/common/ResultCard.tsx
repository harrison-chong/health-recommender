import React, { ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';

interface ResultCardProps {
  children: ReactNode;
  label?: string;
}

// Signature surface: a near-black ink panel that holds every calculator result,
// in BOTH themes. Light theme → #15171A on the off-white wall (full contrast).
// Dark theme → lifts to #26282B so it stays focal against the dark chrome.
// Numbers inside should use className="num" for the Space Mono face.
const ResultCard: React.FC<ResultCardProps> = ({ children, label }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        mt: 3.5,
        p: { xs: 3, md: 4 },
        borderRadius: '2px',
        backgroundColor: isDark ? '#26282B' : '#15171A',
        color: '#FAFAF7',
        border: '1px solid',
        borderColor: isDark ? 'rgba(255,255,255,0.06)' : '#000000',
      }}
    >
      {label && (
        <Box
          className="num"
          sx={{
            fontSize: '0.6875rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#8A857C',
            mb: 2,
          }}
        >
          {label}
        </Box>
      )}
      {children}
    </Box>
  );
};

export default ResultCard;
