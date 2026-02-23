import { createTheme, ThemeOptions } from '@mui/material/styles';

// Shared component overrides (no color-specific values)
const createComponentOverrides = (colors: any) => ({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: 12,
          border: '1px solid',
          borderColor: colors.cardBorder || (colors.mode === 'light' ? '#f0f0f0' : '#333333'),
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            backgroundColor: colors.inputBg,
            borderRadius: 8,
            '&:hover': {
              borderColor: colors.primary,
            },
            '&.Mui-focused': {
              borderColor: colors.primary,
            },
          },
          '& .MuiInputLabel-root': {
            color: colors.inputLabelColor,
            '&.Mui-focused': {
              color: colors.primary,
            },
          },
          '& .MuiInputBase-input': {
            color: colors.textPrimary,
            '&::placeholder': {
              color: colors.inputPlaceholder,
              opacity: 1,
            },
          },
          '& input[type=number]': {
            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
              '-webkit-appearance': 'none',
              margin: 0,
            },
            '-moz-appearance': 'textfield',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: colors.inputBg,
          borderRadius: 8,
          '&:hover': {
            borderColor: colors.primary,
          },
          '&.Mui-focused': {
            borderColor: colors.primary,
          },
        },
        select: {
          color: colors.textPrimary,
        },
        icon: {
          color: colors.secondary,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: colors.inputBg,
          borderRadius: 8,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: colors.inputBg,
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: `0 4px 12px ${colors.buttonHoverShadow}`,
          },
        },
        contained: {
          backgroundColor: colors.primary,
          color: colors.primaryText,
          '&:hover': {
            backgroundColor: colors.primaryHover,
          },
        },
        outlined: {
          borderColor: colors.primary,
          color: colors.primary,
          '&:hover': {
            borderColor: colors.primaryHover,
            backgroundColor: colors.buttonHoverBg,
          },
        },
        text: {
          color: colors.primary,
          '&:hover': {
            backgroundColor: colors.buttonHoverBg,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${colors.divider}`,
        },
        indicator: {
          backgroundColor: colors.primary,
          height: 2,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          color: colors.secondary,
          '&.Mui-selected': {
            color: colors.primary,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: `0 2px 8px ${colors.paperShadow}`,
          borderRadius: 12,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// Light theme colors configuration
const lightColors = {
  mode: 'light' as const,
  primary: '#000000',
  primaryHover: '#333333',
  secondary: '#666666',
  secondaryLight: '#999999',
  background: '#ffffff',
  paper: '#ffffff',
  textPrimary: '#000000',
  textSecondary: '#666666',
  textDisabled: '#999999',
  divider: '#e0e0e0',
  inputBg: '#ffffff',
  inputLabelColor: '#666666',
  inputPlaceholder: '#999999',
  primaryText: '#ffffff',
  buttonHoverBg: 'rgba(0,0,0,0.04)',
  buttonHoverShadow: 'rgba(0,0,0,0.15)',
  paperShadow: 'rgba(0,0,0,0.1)',
  cardBorder: '#f0f0f0',
};

// Dark theme colors configuration
const darkColors = {
  mode: 'dark' as const,
  primary: '#ffffff',
  primaryHover: '#cccccc',
  secondary: '#cccccc',
  secondaryLight: '#999999',
  background: '#121212',
  paper: '#1e1e1e',
  textPrimary: '#ffffff',
  textSecondary: '#cccccc',
  textDisabled: '#666666',
  divider: '#333333',
  inputBg: '#2d2d2d',
  inputLabelColor: '#cccccc',
  inputPlaceholder: '#999999',
  primaryText: '#000000',
  buttonHoverBg: 'rgba(255,255,255,0.08)',
  buttonHoverShadow: 'rgba(255,255,255,0.15)',
  paperShadow: 'rgba(0,0,0,0.3)',
  cardBorder: '#333333',
};

export const createLightTheme = () => {
  const colors = lightColors;
  return createTheme({
    palette: {
      mode: 'light',
      primary: { main: colors.primary, light: colors.secondary, dark: colors.primary, contrastText: colors.primaryText },
      secondary: { main: colors.secondary, light: colors.secondaryLight, dark: '#333333' },
      background: { default: colors.background, paper: colors.paper },
      text: { primary: colors.textPrimary, secondary: colors.textSecondary, disabled: colors.textDisabled },
      divider: colors.divider,
      error: { main: '#d32f2f', light: '#f44336', dark: '#b71c1c' },
      success: { main: '#388e3c', light: '#4caf50', dark: '#2e7d32' },
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
      h1: { fontSize: '3rem', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em' },
      h2: { fontSize: '2.5rem', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.01em' },
      h3: { fontSize: '2rem', fontWeight: 400, lineHeight: 1.3 },
      h4: { fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.3 },
      h5: { fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.4 },
      h6: { fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.4 },
      body1: { fontSize: '1rem', lineHeight: 1.6 },
      body2: { fontSize: '0.875rem', lineHeight: 1.6 },
      button: { textTransform: 'none', fontWeight: 500 },
    },
    ...createComponentOverrides(colors),
  } as ThemeOptions);
};

export const createDarkTheme = () => {
  const colors = darkColors;
  return createTheme({
    palette: {
      mode: 'dark',
      primary: { main: colors.primary, light: colors.primary, dark: colors.primary, contrastText: colors.primaryText },
      secondary: { main: colors.secondary, light: colors.secondaryLight, dark: '#999999' },
      background: { default: colors.background, paper: colors.paper },
      text: { primary: colors.textPrimary, secondary: colors.textSecondary, disabled: colors.textDisabled },
      divider: colors.divider,
      error: { main: '#f44336', light: '#ff7961', dark: '#ba1b1b' },
      success: { main: '#4caf50', light: '#80e27e', dark: '#367e39' },
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
      h1: { fontSize: '3rem', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em' },
      h2: { fontSize: '2.5rem', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.01em' },
      h3: { fontSize: '2rem', fontWeight: 400, lineHeight: 1.3 },
      h4: { fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.3 },
      h5: { fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.4 },
      h6: { fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.4 },
      body1: { fontSize: '1rem', lineHeight: 1.6 },
      body2: { fontSize: '0.875rem', lineHeight: 1.6 },
      button: { textTransform: 'none', fontWeight: 500 },
    },
    ...createComponentOverrides(colors),
  } as ThemeOptions);
};
