import { createTheme, ThemeOptions } from '@mui/material/styles';

// Light theme - Clean, high contrast, professional
export const createLightTheme = () => {
  return createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#2563eb',
        light: '#3b82f6',
        dark: '#1d4ed8',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#0891b2',
        light: '#06b6d4',
        dark: '#0e7490',
      },
      background: {
        default: '#f8fafc',
        paper: '#ffffff',
      },
      text: {
        primary: '#0f172a',
        secondary: '#475569',
        disabled: '#94a3b8',
      },
      divider: '#e2e8f0',
      error: { main: '#dc2626' },
      success: { main: '#16a34a' },
    },
    shape: { borderRadius: 10 },
    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      h1: { fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.025em', color: '#0f172a' },
      h2: { fontSize: '1.875rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#0f172a' },
      h3: { fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.015em', color: '#1e293b' },
      h4: { fontSize: '1.25rem', fontWeight: 600, color: '#1e293b' },
      h5: { fontSize: '1.125rem', fontWeight: 600, color: '#334155' },
      h6: { fontSize: '1rem', fontWeight: 600, color: '#334155' },
      body1: { fontSize: '1rem', lineHeight: 1.6, color: '#334155' },
      body2: { fontSize: '0.875rem', lineHeight: 1.5, color: '#475569' },
      button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0' },
      caption: { fontSize: '0.75rem', fontWeight: 500, color: '#64748b' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            scrollbarColor: '#cbd5e1 transparent',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff',
            borderRadius: 12,
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff',
            borderRadius: 12,
            border: '1px solid #e2e8f0',
          },
        },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined', size: 'medium' },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#ffffff',
              borderRadius: 8,
              '& fieldset': {
                borderColor: '#cbd5e1',
              },
              '&:hover fieldset': {
                borderColor: '#94a3b8',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#2563eb',
                borderWidth: 2,
              },
            },
            '& .MuiInputLabel-root': {
              color: '#64748b',
              '&.Mui-focused': {
                color: '#2563eb',
              },
            },
            '& .MuiInputBase-input': {
              color: '#0f172a',
              padding: '12px 14px',
            },
            '& .MuiFormHelperText-root': {
              color: '#64748b',
              marginTop: 4,
            },
          },
        },
      },
      MuiSelect: {
        defaultProps: { variant: 'outlined', size: 'medium' },
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff',
            borderRadius: 8,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#cbd5e1',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#94a3b8',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2563eb',
              borderWidth: 2,
            },
          },
          select: {
            color: '#0f172a',
            padding: '12px 14px',
          },
          icon: {
            color: '#64748b',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '& fieldset': {
              borderColor: '#cbd5e1',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '10px 20px',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          },
          contained: {
            backgroundColor: '#2563eb',
            color: '#ffffff',
            '&:hover': { backgroundColor: '#1d4ed8' },
          },
          outlined: {
            borderColor: '#cbd5e1',
            color: '#334155',
            '&:hover': {
              borderColor: '#94a3b8',
              backgroundColor: '#f8fafc',
            },
          },
          text: {
            color: '#2563eb',
            '&:hover': { backgroundColor: '#eff6ff' },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.9rem',
            color: '#64748b',
            padding: '12px 16px',
            '&.Mui-selected': {
              color: '#2563eb',
              fontWeight: 600,
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            borderBottom: '1px solid #e2e8f0',
          },
          indicator: {
            backgroundColor: '#2563eb',
            height: 3,
            borderRadius: '3px 3px 0 0',
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontSize: '0.875rem',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: '#e2e8f0',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '&:hover': { backgroundColor: '#f1f5f9' },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: '#1e293b',
            borderRadius: 6,
            fontSize: '0.75rem',
            fontWeight: 500,
            color: '#ffffff',
          },
        },
      },
    },
  } as ThemeOptions);
};

// Dark theme - High contrast, accessible
export const createDarkTheme = () => {
  return createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#3b82f6',
        light: '#60a5fa',
        dark: '#2563eb',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#06b6d4',
        light: '#22d3ee',
        dark: '#0891b2',
      },
      background: {
        default: '#0f172a',
        paper: '#1e293b',
      },
      text: {
        primary: '#f8fafc',
        secondary: '#cbd5e1',
        disabled: '#64748b',
      },
      divider: '#334155',
      error: { main: '#f87171' },
      success: { main: '#4ade80' },
    },
    shape: { borderRadius: 10 },
    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      h1: { fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.025em', color: '#f8fafc' },
      h2: { fontSize: '1.875rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#f8fafc' },
      h3: { fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.015em', color: '#f1f5f9' },
      h4: { fontSize: '1.25rem', fontWeight: 600, color: '#f1f5f9' },
      h5: { fontSize: '1.125rem', fontWeight: 600, color: '#e2e8f0' },
      h6: { fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' },
      body1: { fontSize: '1rem', lineHeight: 1.6, color: '#cbd5e1' },
      body2: { fontSize: '0.875rem', lineHeight: 1.5, color: '#94a3b8' },
      button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0' },
      caption: { fontSize: '0.75rem', fontWeight: 500, color: '#64748b' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            scrollbarColor: '#475569 transparent',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#1e293b',
            borderRadius: 12,
            border: '1px solid #334155',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#1e293b',
            borderRadius: 12,
            border: '1px solid #334155',
          },
        },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined', size: 'medium' },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#1e293b',
              borderRadius: 8,
              '& fieldset': {
                borderColor: '#475569',
              },
              '&:hover fieldset': {
                borderColor: '#64748b',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3b82f6',
                borderWidth: 2,
              },
            },
            '& .MuiInputLabel-root': {
              color: '#94a3b8',
              '&.Mui-focused': {
                color: '#60a5fa',
              },
            },
            '& .MuiInputBase-input': {
              color: '#f8fafc',
              padding: '12px 14px',
            },
            '& .MuiFormHelperText-root': {
              color: '#94a3b8',
              marginTop: 4,
            },
          },
        },
      },
      MuiSelect: {
        defaultProps: { variant: 'outlined', size: 'medium' },
        styleOverrides: {
          root: {
            backgroundColor: '#1e293b',
            borderRadius: 8,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#475569',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#64748b',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3b82f6',
              borderWidth: 2,
            },
          },
          select: {
            color: '#f8fafc',
            padding: '12px 14px',
          },
          icon: {
            color: '#94a3b8',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '& fieldset': {
              borderColor: '#475569',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '10px 20px',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          },
          contained: {
            backgroundColor: '#2563eb',
            color: '#ffffff',
            '&:hover': { backgroundColor: '#1d4ed8' },
          },
          outlined: {
            borderColor: '#475569',
            color: '#e2e8f0',
            '&:hover': {
              borderColor: '#64748b',
              backgroundColor: '#334155',
            },
          },
          text: {
            color: '#60a5fa',
            '&:hover': { backgroundColor: '#1e293b' },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.9rem',
            color: '#94a3b8',
            padding: '12px 16px',
            '&.Mui-selected': {
              color: '#60a5fa',
              fontWeight: 600,
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            borderBottom: '1px solid #334155',
          },
          indicator: {
            backgroundColor: '#3b82f6',
            height: 3,
            borderRadius: '3px 3px 0 0',
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontSize: '0.875rem',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: '#334155',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '&:hover': { backgroundColor: '#334155' },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: '#0f172a',
            borderRadius: 6,
            fontSize: '0.75rem',
            fontWeight: 500,
            color: '#f8fafc',
            border: '1px solid #334155',
          },
        },
      },
    },
  } as ThemeOptions);
};