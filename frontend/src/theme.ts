import { createTheme, ThemeOptions } from '@mui/material/styles';

// "Training Room" — off-white gym wall, dense near-black ink, one burnt-orange
// signal. Space Grotesk for UI, Space Mono for numbers. 2px corners, no shadows.
// Tokens are mirrored across light/dark; the dark result card is the signature.

const FONT_UI = '"Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const FONT_MONO = '"Space Mono", ui-monospace, Menlo, monospace';

// Numbers-as-product: any element with className "num" renders in the mono face.
const monoNumbersCss = {
  '.num, .num *': { fontFamily: `${FONT_MONO} !important` },
};

const typography = {
  fontFamily: FONT_UI,
  h1: { fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 },
  h2: { fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 },
  h3: { fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3 },
  h4: { fontSize: '1.25rem', fontWeight: 600 },
  h5: { fontSize: '1rem', fontWeight: 600 },
  h6: { fontSize: '0.875rem', fontWeight: 600 },
  body1: { fontSize: '1rem', lineHeight: 1.6 },
  body2: { fontSize: '0.875rem', lineHeight: 1.6 },
  button: { textTransform: 'none' as const, fontWeight: 600, letterSpacing: 0 },
  caption: { fontSize: '0.75rem', fontWeight: 500 },
  overline: {
    fontSize: '0.6875rem',
    fontWeight: 500,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
  },
};

// Shared component overrides keyed off a palette passed in.
const buildComponents = (p: {
  ink: string;
  onInk: string;
  paper: string;
  wall: string;
  rule: string;
  muted: string;
  signal: string;
  text: string;
  isDark: boolean;
}): ThemeOptions['components'] => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: { ...monoNumbersCss },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: { backgroundColor: p.paper, borderRadius: '2px', border: `1px solid ${p.rule}`, boxShadow: 'none' },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: { backgroundColor: p.paper, borderRadius: '2px', border: `1px solid ${p.rule}`, boxShadow: 'none' },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: '2px',
        backgroundColor: p.wall,
        '& .MuiOutlinedInput-notchedOutline': { borderColor: p.rule, borderWidth: '1px' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: p.muted },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: p.ink, borderWidth: '1px' },
        '& fieldset': { borderColor: p.rule },
      },
      input: { padding: '12px 14px' },
    },
  },
  MuiTextField: { defaultProps: { variant: 'outlined', size: 'medium' } },
  MuiSelect: {
    defaultProps: { variant: 'outlined', size: 'medium' },
    styleOverrides: {
      select: { padding: '12px 14px' },
      icon: { color: p.muted },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: { color: p.muted, fontWeight: 500, '&.Mui-focused': { color: p.ink } },
    },
  },
  MuiFormHelperText: {
    styleOverrides: { root: { color: p.muted, marginTop: '4px', marginLeft: 0 } },
  },
  MuiButton: {
    styleOverrides: {
      root: { borderRadius: '2px', padding: '10px 20px', fontWeight: 600, boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
      contained: {
        backgroundColor: p.ink,
        color: p.onInk,
        // #2A2D31 is a hand-derived darken of ink (#15171A); lift to a token if more hover states need it.
        '&:hover': { backgroundColor: p.isDark ? '#000000' : '#2A2D31' },
        '&.Mui-disabled': { backgroundColor: p.rule, color: p.muted },
      },
      outlined: {
        borderColor: p.rule,
        color: p.text,
        '&:hover': { borderColor: p.ink, backgroundColor: 'transparent' },
      },
      text: { color: p.ink, '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' } },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '0.875rem',
        color: p.muted,
        minHeight: 44,
        '&.Mui-selected': { color: p.ink, fontWeight: 700 },
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: { minHeight: 44 },
      indicator: { backgroundColor: p.ink, height: '2px' },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: { borderRadius: '2px', fontWeight: 600, fontFamily: FONT_MONO, fontSize: '0.75rem' },
    },
  },
  // severity (success/warning/error) colors are intentionally neutralized —
  // status uses the signal-orange token globally, never MUI's default green/red.
  MuiAlert: {
    styleOverrides: { root: { borderRadius: '2px', fontSize: '0.875rem', border: `1px solid ${p.rule}` } },
  },
  MuiDivider: {
    styleOverrides: { root: { borderColor: p.rule } },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: { backgroundColor: p.ink, color: p.onInk, borderRadius: '2px', fontSize: '0.75rem', fontWeight: 500 },
    },
  },
  MuiLinearProgress: {
    styleOverrides: { root: { borderRadius: 0, height: 4, backgroundColor: p.rule } },
  },
});

export const createLightTheme = (): ThemeOptions => {
  const p = {
    ink: '#15171A',
    onInk: '#FAFAF7',
    paper: '#FFFFFF',
    wall: '#FAFAF7',
    rule: '#E3E0D8',
    muted: '#9A9388',
    signal: '#F97316',
    text: '#15171A',
    isDark: false,
  };
  return createTheme({
    palette: {
      mode: 'light',
      primary: { main: p.ink, contrastText: p.onInk },
      secondary: { main: p.signal, contrastText: p.onInk },
      background: { default: p.wall, paper: p.paper },
      text: { primary: p.ink, secondary: p.muted, disabled: p.muted },
      divider: p.rule,
      error: { main: '#DC2626' },
      warning: { main: '#D97706' },
      info: { main: p.ink },
      success: { main: p.signal },
    },
    shape: { borderRadius: 2 },
    typography,
    components: buildComponents(p),
  } as ThemeOptions);
};

export const createDarkTheme = (): ThemeOptions => {
  const p = {
    ink: '#F2F1EC',
    onInk: '#15171A',
    paper: '#1E1F22',
    wall: '#161719',
    rule: 'rgba(255,255,255,0.08)',
    muted: '#8A857C',
    signal: '#FB923C',
    text: '#F2F1EC',
    isDark: true,
  };
  return createTheme({
    palette: {
      mode: 'dark',
      primary: { main: p.ink, contrastText: p.onInk },
      secondary: { main: p.signal, contrastText: p.onInk },
      background: { default: p.wall, paper: p.paper },
      text: { primary: p.ink, secondary: p.muted, disabled: p.muted },
      divider: p.rule,
      error: { main: '#F87171' },
      warning: { main: '#FBBF24' },
      info: { main: p.ink },
      success: { main: p.signal },
    },
    shape: { borderRadius: 2 },
    typography,
    components: buildComponents(p),
  } as ThemeOptions);
};
