# Frontend Redesign — "Training Room" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reskin the React/MUI frontend from the generic "AI startup" indigo look into the "Training Room" identity — off-white wall, near-black ink, single burnt-orange signal, Space Grotesk + Space Mono, 2px corners, and a dark ink result card as the signature.

**Architecture:** All change is visual. The app shell (Layout, Sidebar, routes), state hooks, API services, and backend are untouched. A new `frontend/src/theme.ts` replaces the existing one; a small `ResultCard` component codifies the signature ink card; `index.html` swaps the font pipeline; the six calculators, CommonForm, Home, HealthDashboard, and Sidebar adopt the new tokens.

**Tech Stack:** React 18, TypeScript, Vite 7, MUI 7 (`@mui/material`), Emotion. Google Fonts for Space Grotesk + Space Mono.

**Verification note:** This project has **no test runner** (scripts are `dev` / `build` / `preview` only). Reskins are verified by the TypeScript build + manual visual check in `npm run dev`, not unit tests. Each task ends with `npx tsc --noEmit` (type-check) and a commit; the final task is a full visual pass in both themes.

**Design reference:** `docs/superpowers/specs/2026-08-04-frontend-redesign-design.md`. Read it first — every token below comes from it.

---

## File Structure

**Token / shared layer:**
- `frontend/index.html` — swap Inter Google Fonts link for Space Grotesk + Space Mono. (Modify)
- `frontend/src/theme.ts` — full rewrite: new palette, typography, 2px radii, flat components. (Modify)
- `frontend/src/components/common/ResultCard.tsx` — NEW. The signature dark ink result surface, theme-aware. One responsibility: render children on the ink panel.

**App shell:**
- `frontend/src/components/Sidebar.tsx` — new logo mark, ruled borders, flat active state. (Modify)
- `frontend/src/components/Layout.tsx` — wall background tokens. (Modify)

**Pages:**
- `frontend/src/components/Home.tsx` — delete gradient blobs/headline; new hero. (Modify)
- `frontend/src/components/HealthDashboard.tsx` — flat panel, ruled tab strip with ink underline. (Modify)

**Form:**
- `frontend/src/components/common/CommonForm.tsx` — flat inputs. (Modify)

**Calculators (all adopt ResultCard + flat button + Space Mono numbers):**
- `frontend/src/components/calculators/BMICalculator.tsx` (Modify)
- `frontend/src/components/calculators/BMRCalculator.tsx` (Modify)
- `frontend/src/components/calculators/BodyFatCalculator.tsx` (Modify)
- `frontend/src/components/calculators/MacrosCalculator.tsx` (Modify)
- `frontend/src/components/calculators/WorkoutRecommender.tsx` (Modify)
- `frontend/src/components/calculators/DietRecommender.tsx` (Modify)

**Index page meta:**
- `frontend/index.html` — title + description copy. (Modify, same file as fonts)

---

### Task 1: Swap the font pipeline and page meta

**Files:**
- Modify: `frontend/index.html`

- [ ] **Step 1: Replace the Google Fonts link and meta**

Open `frontend/index.html`. Replace the entire `<head>` contents (the `<title>`, `<meta name="description">`, and the `<link href="...Inter...">` line) with:

```html
    <title>Vitality — Health Recommender</title>
    <meta name="description" content="Calculate your health metrics and get workout and nutrition plans tailored to you." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
```

(The title "Vitality" is kept — it is the existing brand name. Only the marketing description changes to drop "AI-powered".)

- [ ] **Step 2: Type-check**

Run: `cd frontend && npx tsc --noEmit`
Expected: PASS (no TS errors; index.html is not type-checked).

- [ ] **Step 3: Commit**

```bash
git add frontend/index.html
git commit -m "feat(frontend): load Space Grotesk + Space Mono, drop AI-powered meta"
```

---

### Task 2: Rewrite the theme tokens

**Files:**
- Modify: `frontend/src/theme.ts` (full rewrite)

This is the foundation. Everything downstream reads from these tokens. The file exports `createLightTheme` and `createDarkTheme` (unchanged names — `ThemeContext.tsx` imports them by those names).

- [ ] **Step 1: Replace the entire file**

Overwrite `frontend/src/theme.ts` with:

```typescript
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
      root: { backgroundColor: p.paper, borderRadius: '2px', border: `1px solid ${p.rule}` },
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
```

Notes for the implementer:
- `success` is mapped to the orange `signal` deliberately — category status uses signal-orange, not green. Calculators that previously used hardcoded `#10B981` etc. are reworked in their own tasks.
- `MuiCssBaseline` injects `.num { font-family: Space Mono }` globally so any number wrapped in `className="num"` picks up the mono face without per-element styling.
- `primary.main = ink` means `<Button contained>` renders ink-on-paper (light) / paper-ink (dark) automatically — no gradient.

- [ ] **Step 2: Type-check**

Run: `cd frontend && npx tsc --noEmit`
Expected: PASS. (The existing files still reference `theme.palette.mode`, which is preserved.)

- [ ] **Step 3: Commit**

```bash
git add frontend/src/theme.ts
git commit -m "feat(frontend): rewrite theme — Training Room tokens, Space Grotesk/Mono, 2px radii"
```

---

### Task 3: Add the ResultCard (signature ink panel)

**Files:**
- Create: `frontend/src/components/common/ResultCard.tsx`

The signature: every result renders on a near-black panel in **both** themes. In light mode it's `#15171A` against the wall (full contrast); in dark mode it *lifts* to `#26282B` so it still reads as focal against the dark chrome.

- [ ] **Step 1: Create the component**

Create `frontend/src/components/common/ResultCard.tsx`:

```typescript
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
```

- [ ] **Step 2: Type-check**

Run: `cd frontend && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/common/ResultCard.tsx
git commit -m "feat(frontend): add ResultCard — signature dark ink result panel"
```

---

### Task 4: Rework the app shell — Sidebar and Layout

**Files:**
- Modify: `frontend/src/components/Sidebar.tsx`
- Modify: `frontend/src/components/Layout.tsx`

- [ ] **Step 1: Rewrite Sidebar**

Replace the entire contents of `frontend/src/components/Sidebar.tsx` with:

```typescript
import React from 'react';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
  useMediaQuery,
  useTheme,
  Drawer,
} from '@mui/material';
import {
  Home as HomeIcon,
  HealthAndSafety as HealthIcon,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme as useAppTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export const DRAWER_WIDTH = 240;

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const { mode, toggleTheme } = useAppTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = mode === 'dark';

  const ink = isDark ? '#F2F1EC' : '#15171A';
  const muted = isDark ? '#8A857C' : '#9A9388';
  const wall = isDark ? '#161719' : '#FAFAF7';
  const rule = isDark ? 'rgba(255,255,255,0.08)' : '#E3E0D8';

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Health Assessment', icon: <HealthIcon />, path: '/health' },
  ];

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: wall,
        borderRight: '1px solid',
        borderColor: rule,
      }}
    >
      {/* Logo — monospace mark, no gradient tile */}
      <Box sx={{ px: 3, py: 3, borderBottom: '1px solid', borderColor: rule }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            className="num"
            sx={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ink,
              color: wall,
              fontSize: '0.95rem',
              fontWeight: 700,
              borderRadius: '2px',
            }}
          >
            V
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 700, color: ink, letterSpacing: '-0.01em', fontSize: '1rem', lineHeight: 1 }}
            >
              Vitality
            </Typography>
            <Typography className="num" sx={{ color: muted, fontSize: '0.6875rem', letterSpacing: '0.1em', mt: 0.25 }}>
              HEALTH / METRICS
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <List sx={{ flex: 1, px: 1.5, py: 2 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={isSelected}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: '2px',
                  py: 1.25,
                  px: 2,
                  cursor: 'pointer',
                  borderLeft: '2px solid',
                  borderColor: isSelected ? ink : 'transparent',
                  backgroundColor: 'transparent',
                  color: isSelected ? ink : muted,
                  '&:hover': { backgroundColor: 'transparent', color: ink },
                  transition: 'color 0.15s ease',
                }}
              >
                <ListItemIcon
                  sx={{ color: 'inherit', minWidth: 40, '& .MuiSvgIcon-root': { fontSize: '1.2rem' } }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: isSelected ? 700 : 500, fontSize: '0.9rem', color: 'inherit' }}>
                      {item.text}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Theme toggle */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: rule }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1,
          }}
        >
          <Typography className="num" sx={{ color: muted, fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {mode} mode
          </Typography>
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`} placement="right">
            <IconButton
              onClick={toggleTheme}
              size="small"
              sx={{
                p: 1,
                borderRadius: '2px',
                color: muted,
                '&:hover': { backgroundColor: 'transparent', color: ink },
                '& .MuiSvgIcon-root': { fontSize: '1.1rem' },
              }}
            >
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, backgroundColor: wall },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, backgroundColor: wall },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
```

Note: `DRAWER_WIDTH` reduced from 260 → 240 for a tighter shell. It's imported by `Layout.tsx`, which is fine since the export name is unchanged.

- [ ] **Step 2: Update Layout to use the wall token**

In `frontend/src/components/Layout.tsx`, replace the `backgroundColor` value in the root `Box` `sx` so it reads off the theme rather than hardcoded zinc. Replace:

```typescript
        backgroundColor: isDark ? '#09090B' : '#FAFAFA',
```

with:

```typescript
        backgroundColor: isDark ? '#161719' : '#FAFAF7',
```

(The `isDark` line above it, `const isDark = theme.palette.mode === 'dark';`, stays as-is.)

- [ ] **Step 3: Type-check**

Run: `cd frontend && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/Sidebar.tsx frontend/src/components/Layout.tsx
git commit -m "feat(frontend): rework Sidebar + Layout — monospace mark, ruled active state, wall tokens"
```

---

### Task 5: Rebuild the Home hero

**Files:**
- Modify: `frontend/src/components/Home.tsx`

Delete the gradient blobs, the gradient-clipped headline, and the "AI-powered" badges. The hero now shows what the product *does*: a sample stat readout on the ink card.

- [ ] **Step 1: Replace the entire file**

Overwrite `frontend/src/components/Home.tsx` with:

```typescript
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
```

- [ ] **Step 2: Type-check**

Run: `cd frontend && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/Home.tsx
git commit -m "feat(frontend): rebuild Home hero — ink sample card, drop gradients + AI badges"
```

---

### Task 6: Rework the HealthDashboard shell and tab strip

**Files:**
- Modify: `frontend/src/components/HealthDashboard.tsx`

Flat paper panel, ruled tab strip with ink underline indicator (replaces indigo pills), plain-language subtitle.

- [ ] **Step 1: Replace the `return ( ... )` JSX**

In `frontend/src/components/HealthDashboard.tsx`, replace everything from `return (` through the closing `);` before `export default HealthDashboard;` with:

```typescript
  return (
    <Box sx={{ maxWidth: 960, mx: 'auto', py: { xs: 3, md: 5 } }}>
      {/* Header */}
      <Box sx={{ mb: 5, textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{ fontWeight: 700, letterSpacing: '-0.02em', mb: 1.5, color: isDark ? '#F2F1EC' : '#15171A' }}
        >
          Health Assessment
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: isDark ? '#8A857C' : '#9A9388', maxWidth: 500, mx: 'auto' }}
        >
          Enter your measurements to calculate your metrics and get a workout and nutrition plan.
        </Typography>
      </Box>

      {/* Main container — flat paper panel, 2px radius, hairline border */}
      <Box
        sx={{
          borderRadius: '2px',
          backgroundColor: isDark ? '#1E1F22' : '#FFFFFF',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#E3E0D8',
        }}
      >
        {/* Tab strip — flat row, ink underline indicator */}
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            px: 1,
            gap: 0.5,
            borderBottom: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#E3E0D8',
            '&::-webkit-scrollbar': { height: 0 },
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as CalculatorTab)}
                sx={{
                  flex: '0 0 auto',
                  minWidth: 'max-content',
                  py: 1.5,
                  px: 2,
                  borderRadius: 0,
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.8125rem',
                  color: isActive ? (isDark ? '#F2F1EC' : '#15171A') : (isDark ? '#8A857C' : '#9A9388'),
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  borderBottom: '2px solid',
                  borderColor: isActive ? (isDark ? '#F2F1EC' : '#15171A') : 'transparent',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: isDark ? '#F2F1EC' : '#15171A',
                  },
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </Button>
            );
          })}
        </Box>

        {/* Content */}
        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <CommonForm
            form={healthForm.form}
            activityLevel={healthForm.activityLevel}
            handleChange={healthForm.handleChange}
            handleSelectChange={healthForm.handleSelectChange}
            validateCommonForm={healthForm.validateCommonForm}
          />
          {renderTabContent()}
        </Box>
      </Box>
    </Box>
  );
```

Leave the imports, `HealthDashboard` signature, `renderTabContent`, and the `activeTab`/`healthForm`/`theme`/`isDark`/`tabs` lines above `return` untouched — they are already correct.

- [ ] **Step 2: Type-check**

Run: `cd frontend && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/HealthDashboard.tsx
git commit -m "feat(frontend): flat dashboard panel + ruled ink-underline tab strip"
```

---

### Task 7: Flatten CommonForm inputs

**Files:**
- Modify: `frontend/src/components/common/CommonForm.tsx`

The theme's `MuiOutlinedInput` override already flattens inputs; this task just retitles the section header and removes the per-component zinc color overrides so inputs inherit theme tokens cleanly.

- [ ] **Step 1: Replace the header Typography colors**

In `frontend/src/components/common/CommonForm.tsx`, the section header and subtitle use hardcoded `isDark ? '#FAFAFA' : '#09090B'` / `isDark ? '#A1A1AA' : '#71717A'`. Replace those two `sx` color values so the block reads:

```typescript
      <Typography
        variant="h5"
        sx={{
          mb: 0.75,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: isDark ? '#F2F1EC' : '#15171A',
        }}
      >
        Basic Information
      </Typography>
      <Typography
        variant="body2"
        sx={{ mb: 3.5, color: isDark ? '#8A857C' : '#9A9388' }}
      >
        Enter your measurements to get started
      </Typography>
```

(The form fields themselves — the `TextField`/`FormControl` grid — need no changes; the theme override handles flat borders, wall fill, and 2px radius.)

- [ ] **Step 2: Type-check**

Run: `cd frontend && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/common/CommonForm.tsx
git commit -m "feat(frontend): align CommonForm header to Training Room tokens"
```

---

### Task 8: Rework BMICalculator onto ResultCard

**Files:**
- Modify: `frontend/src/components/calculators/BMICalculator.tsx`

Pattern for all six calculators: plain intro, flat contained button, `ResultCard` with Space Mono numbers + orange signal range marker. BMI is the template the other five follow.

- [ ] **Step 1: Replace the entire file**

Overwrite `frontend/src/components/calculators/BMICalculator.tsx` with:

```typescript
import React from 'react';
import { Button, CircularProgress, Typography, Box, useTheme } from '@mui/material';
import ResultCard from '../common/ResultCard';

interface BMICalculatorProps {
  bmiState: { result: { bmi: number } | null; loading: boolean; error: string | null };
  calculateBMI: () => Promise<void>;
  validateCommonForm: () => boolean;
}

const BMICalculator: React.FC<BMICalculatorProps> = ({ bmiState, calculateBMI, validateCommonForm }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isValid = validateCommonForm();

  // Status uses the orange signal for the band you land in; ranges in mono.
  const getCategory = (bmi: number): { label: string; range: string } => {
    if (bmi < 18.5) return { label: 'UNDERWEIGHT', range: '< 18.5' };
    if (bmi < 25) return { label: 'NORMAL', range: '18.5 — 24.9' };
    if (bmi < 30) return { label: 'OVERWEIGHT', range: '25.0 — 29.9' };
    return { label: 'OBESE', range: '≥ 30.0' };
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 3.5, color: isDark ? '#8A857C' : '#9A9388', lineHeight: 1.6 }}>
        Body Mass Index (BMI) estimates body fat from your height-to-weight ratio. It's a general
        screening tool for weight categories, not a direct measure of body composition.
      </Typography>
      <Button
        variant="contained"
        onClick={calculateBMI}
        disabled={bmiState.loading || !isValid}
        fullWidth
        size="large"
        sx={{ mb: 0, py: 1.5 }}
      >
        {bmiState.loading ? <CircularProgress size={24} sx={{ color: '#FAFAF7' }} /> : 'Calculate BMI'}
      </Button>
      {bmiState.result && (() => {
        const bmi = bmiState.result.bmi;
        const category = getCategory(bmi);
        return (
          <ResultCard label="Your BMI result">
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 2 }}>
              <Typography className="num" sx={{ fontWeight: 700, letterSpacing: '-0.03em', color: '#FAFAF7', fontSize: '3.5rem', lineHeight: 1 }}>
                {bmi.toFixed(1)}
              </Typography>
              <Typography className="num" sx={{ color: '#8A857C', fontSize: '0.875rem' }}>
                kg/m²
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 8, height: 8, backgroundColor: isDark ? '#FB923C' : '#F97316' }} />
              <Typography className="num" sx={{ fontWeight: 700, color: isDark ? '#FB923C' : '#F97316', fontSize: '0.875rem', letterSpacing: '0.04em' }}>
                {category.label}
              </Typography>
              <Typography className="num" sx={{ color: '#8A857C', fontSize: '0.75rem', ml: 'auto' }}>
                {category.range}
              </Typography>
            </Box>

            {/* Range bar: BMI bands 18.5 / 6.5 / 5 / open */}
            <Box sx={{ mt: 2, display: 'flex', gap: '2px' }}>
              <Box sx={{ height: 4, flex: 18.5, backgroundColor: 'rgba(255,255,255,0.1)' }} />
              <Box sx={{ height: 4, flex: 6.5, backgroundColor: isDark ? '#FB923C' : '#F97316' }} />
              <Box sx={{ height: 4, flex: 5, backgroundColor: 'rgba(255,255,255,0.1)' }} />
              <Box sx={{ height: 4, flex: 10, backgroundColor: 'rgba(255,255,255,0.1)' }} />
            </Box>

            <Typography className="num" sx={{ display: 'block', mt: 3, color: '#8A857C', fontSize: '0.6875rem', letterSpacing: '0.08em' }}>
              BASED ON WHO CLASSIFICATION
            </Typography>
          </ResultCard>
        );
      })()}
    </Box>
  );
};

export default BMICalculator;
```

- [ ] **Step 2: Type-check**

Run: `cd frontend && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/calculators/BMICalculator.tsx
git commit -m "feat(frontend): BMI result on ink ResultCard with mono numbers + signal range"
```

---

### Task 9: Rework BMRCalculator onto ResultCard

**Files:**
- Modify: `frontend/src/components/calculators/BMRCalculator.tsx`

Two stats (BMR, TDEE) on the ink card, both in Space Mono. The sky/cyan accent is replaced by ink + signal.

- [ ] **Step 1: Replace the entire file**

Overwrite `frontend/src/components/calculators/BMRCalculator.tsx` with:

```typescript
import React from 'react';
import { Button, CircularProgress, Typography, Box, Grid, useTheme } from '@mui/material';
import ResultCard from '../common/ResultCard';

interface BMRCalculatorProps {
  bmrState: { result: { bmr: number; tdee: number; activity_level: string } | null; loading: boolean; error: string | null };
  activityLevel: string;
  calculateBMR: () => Promise<void>;
  validateCommonForm: () => boolean;
  hasBmrResult: boolean;
}

const BMRCalculator: React.FC<BMRCalculatorProps> = ({ bmrState, calculateBMR, validateCommonForm }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isValid = validateCommonForm();
  const signal = isDark ? '#FB923C' : '#F97316';

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 3.5, color: isDark ? '#8A857C' : '#9A9388', lineHeight: 1.6 }}>
        <strong style={{ color: isDark ? '#F2F1EC' : '#15171A' }}>Basal Metabolic Rate (BMR)</strong> is the
        calories you burn at complete rest. <strong style={{ color: isDark ? '#F2F1EC' : '#15171A' }}>Total Daily
        Energy Expenditure (TDEE)</strong> layers in your activity level to estimate daily calorie needs.
      </Typography>
      <Button
        variant="contained"
        onClick={calculateBMR}
        disabled={bmrState.loading || !isValid}
        fullWidth
        size="large"
        sx={{ mb: 0, py: 1.5 }}
      >
        {bmrState.loading ? <CircularProgress size={24} sx={{ color: '#FAFAF7' }} /> : 'Calculate BMR / TDEE'}
      </Button>
      {bmrState.result && (
        <ResultCard label="Your daily calorie needs">
          <Grid container spacing={4}>
            <Grid size={{ xs: 6 }}>
              <Typography className="num" sx={{ fontSize: '0.6875rem', letterSpacing: '0.12em', color: '#8A857C', mb: 1 }}>
                BMR
              </Typography>
              <Typography className="num" sx={{ fontWeight: 700, letterSpacing: '-0.02em', color: '#FAFAF7', fontSize: '2.25rem', lineHeight: 1 }}>
                {bmrState.result.bmr.toLocaleString()}
              </Typography>
              <Typography className="num" sx={{ color: '#8A857C', fontSize: '0.75rem', mt: 1 }}>
                cal/day at rest
              </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography className="num" sx={{ fontSize: '0.6875rem', letterSpacing: '0.12em', color: signal, mb: 1 }}>
                TDEE
              </Typography>
              <Typography className="num" sx={{ fontWeight: 700, letterSpacing: '-0.02em', color: signal, fontSize: '2.25rem', lineHeight: 1 }}>
                {bmrState.result.tdee.toLocaleString()}
              </Typography>
              <Typography className="num" sx={{ color: '#8A857C', fontSize: '0.75rem', mt: 1 }}>
                cal/day with activity
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <Typography className="num" sx={{ color: '#8A857C', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {bmrState.result.activity_level.replace('_', ' ')}
            </Typography>
          </Box>
        </ResultCard>
      )}
    </Box>
  );
};

export default BMRCalculator;
```

- [ ] **Step 2: Type-check**

Run: `cd frontend && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/calculators/BMRCalculator.tsx
git commit -m "feat(frontend): BMR/TDEE on ink ResultCard, mono numbers, signal TDEE"
```

---

### Task 10: Rework BodyFatCalculator onto ResultCard

**Files:**
- Modify: `frontend/src/components/calculators/BodyFatCalculator.tsx`

The form inputs (waist/neck/hip) stay as flat TextFields (theme handles them). Only the result panel changes.

- [ ] **Step 1: Replace the `result` block and update intro/button**

In `frontend/src/components/calculators/BodyFatCalculator.tsx`, make two edits.

First, the intro `<Typography>` and the `<Button>` — replace their `sx` colors and button label's spinner color. The intro `color` becomes `isDark ? '#8A857C' : '#9A9388'`; the button spinner `color` becomes `'#FAFAF7'`. (Find `color: isDark ? '#A1A1AA' : '#71717A'` in the intro and replace with `isDark ? '#8A857C' : '#9A9388'`; find `sx={{ color: '#fff' }}` in the spinner and replace with `sx={{ color: '#FAFAF7' }}`.)

Then replace the entire `{bodyFatState.result && ( <Paper ...> ... </Paper> )}` block with:

```typescript
      {bodyFatState.result && (
        <ResultCard label="Estimated body fat">
          <Grid container spacing={4}>
            <Grid size={{ xs: 7 }}>
              <Typography className="num" sx={{ fontSize: '0.6875rem', letterSpacing: '0.12em', color: '#8A857C', mb: 1 }}>
                BODY FAT
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <Typography className="num" sx={{ fontWeight: 700, letterSpacing: '-0.02em', color: '#FAFAF7', fontSize: '2.5rem', lineHeight: 1 }}>
                  {bodyFatState.result.body_fat_percentage.toFixed(1)}
                </Typography>
                <Typography className="num" sx={{ color: '#8A857C', fontSize: '0.875rem' }}>%</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 5 }}>
              <Typography className="num" sx={{ fontSize: '0.6875rem', letterSpacing: '0.12em', color: isDark ? '#FB923C' : '#F97316', mb: 1 }}>
                CATEGORY
              </Typography>
              <Typography sx={{ fontWeight: 600, color: isDark ? '#FB923C' : '#F97316', fontSize: '1.25rem', lineHeight: 1.2 }}>
                {bodyFatState.result.category}
              </Typography>
            </Grid>
          </Grid>
          <Typography className="num" sx={{ display: 'block', mt: 3, color: '#8A857C', fontSize: '0.6875rem', letterSpacing: '0.08em' }}>
            U.S. NAVY METHOD · ESTIMATION ONLY
          </Typography>
        </ResultCard>
      )}
```

Finally, update the import line at the top. Replace:

```typescript
import { Button, CircularProgress, Paper, Typography, Box, Grid, TextField, useTheme } from '@mui/material';
```

with:

```typescript
import { Button, CircularProgress, Typography, Box, Grid, TextField, useTheme } from '@mui/material';
import ResultCard from '../common/ResultCard';
```

- [ ] **Step 2: Type-check**

Run: `cd frontend && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/calculators/BodyFatCalculator.tsx
git commit -m "feat(frontend): body fat result on ink ResultCard, mono numbers, signal category"
```

---

### Task 11: Rework MacrosCalculator onto ResultCard

**Files:**
- Modify: `frontend/src/components/calculators/MacrosCalculator.tsx`

The three-colour macro cards (indigo/cyan/amber) collapse to ink + signal on the dark card. Macro split becomes a single proportional bar with a mono legend.

- [ ] **Step 1: Replace the entire file**

Overwrite `frontend/src/components/calculators/MacrosCalculator.tsx` with:

```typescript
import React from 'react';
import { Button, CircularProgress, Typography, Box, Grid, FormControl, InputLabel, Select, MenuItem, useTheme } from '@mui/material';
import { MACROS_GOALS, DIET_TYPES } from '../../config';
import ResultCard from '../common/ResultCard';

interface MacrosCalculatorProps {
  macrosState: { result: { calories: number; protein_grams: number; carbs_grams: number; fats_grams: number; protein_percentage: number; carbs_percentage: number; fats_percentage: number } | null; loading: boolean; error: string | null };
  macrosGoal: string;
  dietType: string;
  calculateMacros: () => Promise<void>;
  handleSelectChange: (e: { target: { name: string; value: string } }) => void;
  hasBmrResult: boolean;
}

const MacrosCalculator: React.FC<MacrosCalculatorProps> = ({ macrosState, macrosGoal, dietType, calculateMacros, handleSelectChange }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const signal = isDark ? '#FB923C' : '#F97316';
  // Ink shades for the three macros — paper-side lighter, two darker greys. No rainbow.
  const macroShade = { protein: '#FAFAF7', carbs: signal, fats: '#8A857C' };

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 3.5, color: isDark ? '#8A857C' : '#9A9388', lineHeight: 1.6 }}>
        Calculate your <strong style={{ color: isDark ? '#F2F1EC' : '#15171A' }}>daily macronutrient targets</strong> from
        your TDEE, goal, and diet preference.
      </Typography>
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth size="medium">
            <InputLabel>Goal</InputLabel>
            <Select value={macrosGoal} onChange={handleSelectChange} name="macrosGoal" label="Goal">
              {MACROS_GOALS.map(goal => (
                <MenuItem key={goal.value} value={goal.value}>{goal.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth size="medium">
            <InputLabel>Diet Type</InputLabel>
            <Select value={dietType} onChange={handleSelectChange} name="dietType" label="Diet Type">
              {DIET_TYPES.map(diet => (
                <MenuItem key={diet.value} value={diet.value}>{diet.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        onClick={calculateMacros}
        disabled={macrosState.loading}
        fullWidth
        size="large"
        sx={{ mb: 0, py: 1.5 }}
      >
        {macrosState.loading ? <CircularProgress size={24} sx={{ color: '#FAFAF7' }} /> : 'Calculate Macros'}
      </Button>
      {macrosState.result && (
        <ResultCard label="Your daily intake">
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 3 }}>
            <Typography className="num" sx={{ fontWeight: 700, letterSpacing: '-0.03em', color: '#FAFAF7', fontSize: '2.75rem', lineHeight: 1 }}>
              {macrosState.result.calories.toLocaleString()}
            </Typography>
            <Typography className="num" sx={{ color: '#8A857C', fontSize: '0.875rem' }}>kcal</Typography>
          </Box>

          {/* Proportional macro split bar */}
          <Box sx={{ display: 'flex', gap: '2px', mb: 2 }}>
            <Box sx={{ height: 8, flex: macrosState.result.protein_percentage, backgroundColor: macroShade.protein }} />
            <Box sx={{ height: 8, flex: macrosState.result.carbs_percentage, backgroundColor: macroShade.carbs }} />
            <Box sx={{ height: 8, flex: macrosState.result.fats_percentage, backgroundColor: macroShade.fats }} />
          </Box>

          <Grid container spacing={2}>
            {([
              { label: 'PROTEIN', grams: macrosState.result.protein_grams, pct: macrosState.result.protein_percentage, shade: macroShade.protein },
              { label: 'CARBS', grams: macrosState.result.carbs_grams, pct: macrosState.result.carbs_percentage, shade: macroShade.carbs },
              { label: 'FATS', grams: macrosState.result.fats_grams, pct: macrosState.result.fats_percentage, shade: macroShade.fats },
            ] as const).map((m) => (
              <Grid size={{ xs: 4 }} key={m.label}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, backgroundColor: m.shade }} />
                  <Typography className="num" sx={{ color: '#8A857C', fontSize: '0.6875rem', letterSpacing: '0.1em' }}>
                    {m.label}
                  </Typography>
                </Box>
                <Typography className="num" sx={{ fontWeight: 700, color: m.shade, fontSize: '1.5rem', lineHeight: 1 }}>
                  {m.grams}<Box component="span" sx={{ fontSize: '0.875rem', color: '#8A857C' }}>g</Box>
                </Typography>
                <Typography className="num" sx={{ color: '#8A857C', fontSize: '0.6875rem', mt: 0.5 }}>
                  {m.pct}%
                </Typography>
              </Grid>
            ))}
          </Grid>
        </ResultCard>
      )}
    </Box>
  );
};

export default MacrosCalculator;
```

- [ ] **Step 2: Type-check**

Run: `cd frontend && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/calculators/MacrosCalculator.tsx
git commit -m "feat(frontend): macros on ink ResultCard, proportional split bar, mono legend"
```

---

### Task 12: Rework WorkoutRecommender onto ResultCard

**Files:**
- Modify: `frontend/src/components/calculators/WorkoutRecommender.tsx`

The markdown recommendation renders on the ink card. Code spans inside the markdown (the old indigo inline `code`) become the orange signal. Form inputs stay flat (theme handles them).

- [ ] **Step 1: Update imports**

In `frontend/src/components/calculators/WorkoutRecommender.tsx`, replace the `@mui/material` import line:

```typescript
import { Button, CircularProgress, Paper, Typography, Box, Grid, TextField, MenuItem, useTheme } from '@mui/material';
```

with (drop `Paper`, add `ResultCard`):

```typescript
import { Button, CircularProgress, Typography, Box, Grid, TextField, MenuItem, useTheme } from '@mui/material';
import ResultCard from '../common/ResultCard';
```

- [ ] **Step 2: Replace intro + button colors**

In the same file, replace the intro `color: isDark ? '#A1A1AA' : '#71717A'` with `isDark ? '#8A857C' : '#9A9388'`, and the button spinner `sx={{ color: '#fff' }}` with `sx={{ color: '#FAFAF7' }}`. The button `sx` block currently has `mb: 3.5` — leave it.

- [ ] **Step 3: Replace the result block**

Replace the entire `{workoutState.result && ( <Paper ...> ... </Paper> )}` block (from `{workoutState.result && (` through its closing `)}`) with:

```typescript
      {workoutState.result && (
        <ResultCard label="Your workout plan">
          <Typography sx={{ mb: 3, fontWeight: 600, color: '#FAFAF7', fontSize: '1.125rem' }}>
            Personalised Workout Plan
          </Typography>
          <Box
            className="num"
            sx={{
              maxHeight: 420,
              overflow: 'auto',
              p: 3,
              borderRadius: '2px',
              backgroundColor: 'rgba(0,0,0,0.25)',
              border: '1px solid rgba(255,255,255,0.06)',
              '&::-webkit-scrollbar': { width: 6 },
              '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(255,255,255,0.15)' },
            }}
          >
            <ReactMarkdown
              components={{
                h1: ({ children }) => <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 700, color: '#FAFAF7' }}>{children}</Typography>,
                h2: ({ children }) => <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600, color: '#FAFAF7' }}>{children}</Typography>,
                h3: ({ children }) => <Typography variant="h6" component="h3" sx={{ mb: 1.5, mt: 2, fontWeight: 600, color: isDark ? '#FB923C' : '#F97316' }}>{children}</Typography>,
                p: ({ children }) => <Typography component="p" sx={{ mb: 1.5, lineHeight: 1.7, color: '#D4D2CC' }}>{children}</Typography>,
                strong: ({ children }) => <strong style={{ fontWeight: 700, color: '#FAFAF7' }}>{children}</strong>,
                em: ({ children }) => <em style={{ fontStyle: 'italic', color: '#8A857C' }}>{children}</em>,
                code: ({ children }) => (
                  <code style={{ backgroundColor: 'rgba(249,115,22,0.15)', padding: '0.15em 0.4em', borderRadius: '2px', fontFamily: '"Space Mono", monospace', fontSize: '0.85em', color: isDark ? '#FB923C' : '#F97316' }}>
                    {children}
                  </code>
                ),
                ul: ({ children }) => <Box component="ul" sx={{ mb: 2, pl: 3, '& li': { mb: 0.5 } }}>{children}</Box>,
                ol: ({ children }) => <Box component="ol" sx={{ mb: 2, pl: 3, '& li': { mb: 0.5 } }}>{children}</Box>,
                li: ({ children }) => <Typography component="li" sx={{ lineHeight: 1.6, color: '#D4D2CC' }}>{children}</Typography>,
                pre: ({ children }) => (
                  <Box component="pre" sx={{ backgroundColor: 'rgba(0,0,0,0.3)', p: 2, borderRadius: '2px', overflow: 'auto', mb: 2, border: '1px solid rgba(255,255,255,0.06)' }}>
                    {children}
                  </Box>
                ),
              }}
            >
              {workoutState.result.workout_recommendation}
            </ReactMarkdown>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="outlined"
              size="medium"
              onClick={copyWorkoutRecommendation}
              startIcon={<ContentCopy />}
              sx={{
                borderRadius: '2px',
                borderColor: 'rgba(255,255,255,0.2)',
                color: '#FAFAF7',
                '&:hover': { borderColor: '#FAFAF7', backgroundColor: 'rgba(255,255,255,0.05)' },
                px: 3,
                py: 1,
              }}
            >
              Copy to Clipboard
            </Button>
          </Box>
        </ResultCard>
      )}
```

- [ ] **Step 4: Type-check**

Run: `cd frontend && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/calculators/WorkoutRecommender.tsx
git commit -m "feat(frontend): workout plan on ink ResultCard, signal markdown accents"
```

---

### Task 13: Rework DietRecommender onto ResultCard

**Files:**
- Modify: `frontend/src/components/calculators/DietRecommender.tsx`

DietRecommender mirrors WorkoutRecommender exactly (same structure: intro, inputs, button, markdown result). Apply the same transformation. First read the file to confirm its prop names and structure match the Workout pattern — they should (it was added as a sibling), but verify before editing.

- [ ] **Step 1: Read the file to confirm structure**

Run: `cat frontend/src/components/calculators/DietRecommender.tsx`

Confirm: it imports `Paper` from `@mui/material`, has `dietState.result.diet_recommendation`, a `getDietRecommendation` handler, and a `copyDietRecommendation` handler, with the same indigo-tinted `Paper` result block and the same `ReactMarkdown` component map as WorkoutRecommender had before Task 12.

- [ ] **Step 2: Apply the same edits as Task 12**

Apply the exact same set of edits to `frontend/src/components/calculators/DietRecommender.tsx`:

(a) Update the `@mui/material` import: drop `Paper`. Add `import ResultCard from '../common/ResultCard';`.

(b) Intro `color` → `isDark ? '#8A857C' : '#9A9388'`; button spinner `sx={{ color: '#fff' }}` → `sx={{ color: '#FAFAF7' }}`.

(c) Replace the `{dietState.result && ( <Paper ...> ... </Paper> )}` block with the ink-card block from Task 12 Step 3, with these substitutions for the diet context:
- `<ResultCard label="Your workout plan">` → `<ResultCard label="Your nutrition plan">`
- The title `Personalised Workout Plan` → `Personalised Nutrition Plan`
- Every `workoutState.result.workout_recommendation` → `dietState.result.diet_recommendation`
- Every `copyWorkoutRecommendation` → `copyDietRecommendation`
- Keep the `ReactMarkdown` component map (h3 / code in signal orange, body text in `#D4D2CC`, etc.) identical to Task 12 Step 3.

(d) The `<Button variant="outlined">` "Copy to Clipboard" gets the same ink-card outlined style (`borderColor: 'rgba(255,255,255,0.2)'`, `color: '#FAFAF7'`).

- [ ] **Step 3: Type-check**

Run: `cd frontend && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/calculators/DietRecommender.tsx
git commit -m "feat(frontend): diet plan on ink ResultCard, signal markdown accents"
```

---

### Task 14: Full build and visual pass (both themes)

**Files:** None modified — verification only.

- [ ] **Step 1: Production build**

Run: `cd frontend && npm run build`
Expected: Build succeeds with no TS or Vite errors. (Vite runs `tsc` as part of build; a clean build is the type-safety gate.)

- [ ] **Step 2: Visual pass — light mode**

Run: `cd frontend && npm run dev` and open the printed localhost URL.

Check in **light mode** (toggle in sidebar if needed):
- Home: no gradient blobs; headline "Know your numbers. / Train to them."; ink sample card showing BMI 22.4 / TDEE 2,340 in Space Mono.
- Sidebar: "V" monospace mark, "HEALTH / METRICS" subtitle, active item has a 2px ink left-bar.
- Health Assessment: flat white panel, ruled tab strip with ink underline under the active tab.
- CommonForm inputs: flat, 2px corners, off-white fill, hairline border.
- Each calculator result: dark ink card, numbers in Space Mono, orange signal on the range/category/bar.
- No indigo (#4F46E5 / #6366F1) anywhere. No `#0EA5E9` sky blue.

- [ ] **Step 3: Visual pass — dark mode**

Toggle to dark mode. Confirm:
- Wall is `#161719`; result card lifts to a lighter ink panel (still clearly the focal element, not lost in the background).
- Numbers still in Space Mono; orange signal reads as `#FB923C`.
- The signature holds — the dark card is still distinguishable from the dark chrome.

- [ ] **Step 4: Responsive check**

Resize to ~375px wide. Confirm: sidebar collapses to the temporary drawer, the dashboard panel and result cards remain readable, the tab strip scrolls horizontally. No horizontal overflow on the result cards.

- [ ] **Step 5: Final commit if any fixups were needed**

If Steps 2–4 surfaced any issue, fix and commit with `fix(frontend): <what>`. If clean, no commit — the work is already committed per-task.

---

## Self-Review (completed by plan author)

**Spec coverage:**
- Palette (wall/ink/paper/rule/muted/signal) → Task 2. ✅
- Typography (Space Grotesk + Space Mono, `.num` hook) → Tasks 1, 2. ✅
- 2px radii, no shadows, hairline separation → Task 2 (theme) + Task 6 (dashboard panel). ✅
- Signature ink result card in both themes → Task 3 (component) + Tasks 8–13 (applied to all six calculators). ✅
- Sidebar: monospace mark, ruled borders, flat active state → Task 4. ✅
- Home: gradient blobs/headline deleted, sample stat hero, "AI-powered" removed → Task 5. ✅
- HealthDashboard: flat panel, ruled tab strip, plain subtitle → Task 6. ✅
- CommonForm: flat inputs, token colours → Task 7. ✅
- All six calculators reworked → Tasks 8–13. ✅
- Page meta "AI-powered" dropped → Task 1. ✅
- Quality floor: responsive + both themes verified → Task 14. ✅
- "No new dependencies / fonts via existing pipeline" → Task 1 uses the same Google Fonts link approach. ✅

**Placeholder scan:** None. Every step has exact code or exact find/replace targets. Task 13 reuses Task 12's code with named substitutions (not "similar to"). ✅

**Type consistency:** `ResultCard` props (`children`, optional `label`) match usage in Tasks 8–13. `createLightTheme`/`createDarkTheme` export names preserved for `ThemeContext.tsx`. `DRAWER_WIDTH` export preserved for `Layout.tsx`. Calculator prop interfaces unchanged (the reworks only touch rendering, not props). ✅

One deliberate scope note: the `.num` global CSS hook (Task 2) plus per-element `className="num"` (Tasks 3, 5, 8–13) is how Space Mono is applied to numbers without wrapping every value in a component — minimal code, consistent.
