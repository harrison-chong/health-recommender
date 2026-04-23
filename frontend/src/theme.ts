import { createTheme, ThemeOptions } from '@mui/material/styles';

// AI Startup Inspired Color System
// Inspired by Anthropic/OpenAI: soft gradients, rich darks, vibrant accents

const commonTypography = {
  fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  h1: { fontSize: '3rem', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 },
  h2: { fontSize: '2.25rem', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.2 },
  h3: { fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.3 },
  h4: { fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.01em' },
  h5: { fontSize: '1rem', fontWeight: 600 },
  h6: { fontSize: '0.875rem', fontWeight: 600 },
  body1: { fontSize: '1rem', lineHeight: 1.6 },
  body2: { fontSize: '0.875rem', lineHeight: 1.5 },
  button: { textTransform: 'none' as const, fontWeight: 500, letterSpacing: 0 },
  caption: { fontSize: '0.75rem', fontWeight: 500 },
};

export const createLightTheme = (): ThemeOptions => {
  return createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#4F46E5',      // Indigo - elegant, AI-like
        light: '#6366F1',
        dark: '#4338CA',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#0EA5E9',      // Sky blue - fresh, modern
        light: '#38BDF8',
        dark: '#0284C7',
      },
      background: {
        default: '#FAFAFA',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#18181B',
        secondary: '#71717A',
        disabled: '#A1A1AA',
      },
      divider: 'rgba(0, 0, 0, 0.06)',
      error: { main: '#EF4444' },
      success: { main: '#10B981' },
      warning: { main: '#F59E0B' },
      info: { main: '#3B82F6' },
    },
    shape: { borderRadius: 12 },
    typography: {
      ...commonTypography,
      h1: { ...commonTypography.h1, color: '#09090B' },
      h2: { ...commonTypography.h2, color: '#09090B' },
      h3: { ...commonTypography.h3, color: '#18181B' },
      h4: { ...commonTypography.h4, color: '#18181B' },
      h5: { ...commonTypography.h5, color: '#27272A' },
      h6: { ...commonTypography.h6, color: '#3F3F46' },
      body1: { ...commonTypography.body1, color: '#52525B' },
      body2: { ...commonTypography.body2, color: '#71717A' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0,0,0,0.15) transparent',
            '::-webkit-scrollbar': { width: 6, height: 6 },
            '::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.15)', borderRadius: 3 },
            '::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            border: '1px solid rgba(0,0,0,0.04)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            border: '1px solid rgba(0,0,0,0.04)',
          },
        },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined', size: 'medium' },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#FAFAFA',
              borderRadius: 10,
              '& fieldset': { borderColor: 'rgba(0,0,0,0.08)' },
              '&:hover fieldset': { borderColor: 'rgba(0,0,0,0.15)' },
              '&.Mui-focused fieldset': { borderColor: '#4F46E5', borderWidth: 1.5 },
            },
            '& .MuiInputLabel-root': { color: '#71717A', '&.Mui-focused': { color: '#4F46E5' } },
            '& .MuiInputBase-input': { color: '#18181B', padding: '14px 16px' },
            '& .MuiFormHelperText-root': { color: '#71717A', marginTop: 6 },
          },
        },
      },
      MuiSelect: {
        defaultProps: { variant: 'outlined', size: 'medium' },
        styleOverrides: {
          root: {
            backgroundColor: '#FAFAFA',
            borderRadius: 10,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,0,0,0.08)' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,0,0,0.15)' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4F46E5', borderWidth: 1.5 },
          },
          select: { color: '#18181B', padding: '14px 16px' },
          icon: { color: '#71717A' },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            '& fieldset': { borderColor: 'rgba(0,0,0,0.08)' },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: '12px 24px',
            fontWeight: 500,
            fontSize: '0.9375rem',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          },
          contained: {
            backgroundColor: '#4F46E5',
            color: '#FFFFFF',
            '&:hover': { backgroundColor: '#4338CA' },
          },
          outlined: {
            borderColor: 'rgba(0,0,0,0.15)',
            color: '#18181B',
            '&:hover': { borderColor: 'rgba(0,0,0,0.25)', backgroundColor: 'rgba(0,0,0,0.02)' },
          },
          text: { color: '#4F46E5', '&:hover': { backgroundColor: 'rgba(79,70,229,0.05)' } },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.875rem',
            color: '#71717A',
            padding: '14px 20px',
            '&.Mui-selected': { color: '#4F46E5', fontWeight: 600 },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: { borderBottom: '1px solid rgba(0,0,0,0.06)' },
          indicator: { backgroundColor: '#4F46E5', height: 2.5, borderRadius: '2px 2px 0 0' },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: { borderRadius: 12, fontSize: '0.875rem' },
        },
      },
      MuiDivider: {
        styleOverrides: { root: { borderColor: 'rgba(0,0,0,0.06)' } },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: '#18181B',
            borderRadius: 8,
            fontSize: '0.75rem',
            fontWeight: 500,
            color: '#FFFFFF',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 8, fontWeight: 500 },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: { borderRadius: 4, height: 6 },
        },
      },
    },
  } as ThemeOptions);
};

export const createDarkTheme = (): ThemeOptions => {
  return createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#6366F1',      // Lighter indigo for dark mode
        light: '#818CF8',
        dark: '#4F46E5',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#22D3EE',     // Cyan accent
        light: '#67E8F9',
        dark: '#06B6D4',
      },
      background: {
        default: '#09090B',  // Rich black
        paper: '#18181B',    // Elevated surface
      },
      text: {
        primary: '#FAFAFA',
        secondary: '#A1A1AA',
        disabled: '#71717A',
      },
      divider: 'rgba(255, 255, 255, 0.06)',
      error: { main: '#F87171' },
      success: { main: '#34D399' },
      warning: { main: '#FBBF24' },
      info: { main: '#60A5FA' },
    },
    shape: { borderRadius: 12 },
    typography: {
      ...commonTypography,
      h1: { ...commonTypography.h1, color: '#FAFAFA' },
      h2: { ...commonTypography.h2, color: '#FAFAFA' },
      h3: { ...commonTypography.h3, color: '#F4F4F5' },
      h4: { ...commonTypography.h4, color: '#F4F4F5' },
      h5: { ...commonTypography.h5, color: '#E4E4E7' },
      h6: { ...commonTypography.h6, color: '#A1A1AA' },
      body1: { ...commonTypography.body1, color: '#D4D4D8' },
      body2: { ...commonTypography.body2, color: '#A1A1AA' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.1) transparent',
            '::-webkit-scrollbar': { width: 6, height: 6 },
            '::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3 },
            '::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#18181B',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#18181B',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.06)',
          },
        },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined', size: 'medium' },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#27272A',
              borderRadius: 10,
              '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
              '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
              '&.Mui-focused fieldset': { borderColor: '#6366F1', borderWidth: 1.5 },
            },
            '& .MuiInputLabel-root': { color: '#A1A1AA', '&.Mui-focused': { color: '#818CF8' } },
            '& .MuiInputBase-input': { color: '#FAFAFA', padding: '14px 16px' },
            '& .MuiFormHelperText-root': { color: '#A1A1AA', marginTop: 6 },
          },
        },
      },
      MuiSelect: {
        defaultProps: { variant: 'outlined', size: 'medium' },
        styleOverrides: {
          root: {
            backgroundColor: '#27272A',
            borderRadius: 10,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6366F1', borderWidth: 1.5 },
          },
          select: { color: '#FAFAFA', padding: '14px 16px' },
          icon: { color: '#A1A1AA' },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: '12px 24px',
            fontWeight: 500,
            fontSize: '0.9375rem',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          },
          contained: {
            backgroundColor: '#6366F1',
            color: '#FFFFFF',
            '&:hover': { backgroundColor: '#4F46E5' },
          },
          outlined: {
            borderColor: 'rgba(255,255,255,0.15)',
            color: '#FAFAFA',
            '&:hover': { borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.05)' },
          },
          text: { color: '#818CF8', '&:hover': { backgroundColor: 'rgba(99,102,241,0.1)' } },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.875rem',
            color: '#A1A1AA',
            padding: '14px 20px',
            '&.Mui-selected': { color: '#818CF8', fontWeight: 600 },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: { borderBottom: '1px solid rgba(255,255,255,0.06)' },
          indicator: { backgroundColor: '#6366F1', height: 2.5, borderRadius: '2px 2px 0 0' },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: { borderRadius: 12, fontSize: '0.875rem' },
        },
      },
      MuiDivider: {
        styleOverrides: { root: { borderColor: 'rgba(255,255,255,0.06)' } },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)' },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: '#27272A',
            borderRadius: 8,
            fontSize: '0.75rem',
            fontWeight: 500,
            color: '#FAFAFA',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 8, fontWeight: 500 },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: { borderRadius: 4, height: 6 },
        },
      },
    },
  } as ThemeOptions);
};