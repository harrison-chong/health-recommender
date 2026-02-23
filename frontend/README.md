# Frontend - Health Recommender

This is the React + TypeScript frontend for the Health Recommender application. It provides a web interface for calculating various health metrics (BMI, BMR, body fat, macros) and getting workout recommendations.

## Tech Stack

- **React 18** with TypeScript
- **Material-UI (MUI)** for UI components
- **React Router** for navigation
- **Vite** as the build tool
- **Axios** for HTTP requests
- **React Markdown** for rendering workout recommendations

## Project Structure

```typescript
frontend/src/
├── components/
│   ├── calculators/      # Individual calculator components
│   │   ├── BMICalculator.tsx
│   │   ├── BMRCalculator.tsx
│   │   ├── BodyFatCalculator.tsx
│   │   ├── MacrosCalculator.tsx
│   │   └── WorkoutRecommender.tsx
│   ├── common/           # Reusable shared components
│   │   └── CommonForm.tsx
│   ├── HealthDashboard.tsx    # Main orchestrator component
│   ├── Layout.tsx       # App layout with sidebar
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── Home.tsx         # Landing page
│   └── RecommendationCard.tsx # Display for workout recommendations
├── config/
│   └── index.ts         # Centralized constants (activity levels, diets, etc.)
├── contexts/
│   └── ThemeContext.tsx # Dark/light theme provider
├── hooks/
│   └── useHealthForm.ts # Custom hook managing form state & calculator logic
├── services/
│   └── healthApi.ts     # API service layer (axios)
├── types/
│   └── health.ts        # All TypeScript interfaces
├── theme.ts             # Theme configuration (MUI overrides)
├── App.tsx              # Root component with routing
├── main.tsx             # Entry point
└── vite-env.d.ts        # TypeScript declarations for Vite env vars
```

## Key Concepts

### Separation of Concerns

The codebase follows the **Single Responsibility Principle**:

- **`useHealthForm` hook**: Manages all form state, validation, and calculator logic
- **Calculator components**: Each handles only its UI and display
- **`CommonForm`**: Shared form fields used across calculators (age, weight, height, etc.)
- **`HealthDashboard`**: Orchestrates tabs, renders the active calculator, coordinates with the hook
- **`healthApi.ts`**: All API calls in one service layer using axios
- **`config/index.ts`**: Constants for dropdown options, calculator tabs, etc.

### State Management

The main state lives in `useHealthForm`:

```typescript
const {
  form,
  activityLevel,
  macrosGoal,
  dietType,
  bmiState,
  bmrState,
  bodyFatState,
  macrosState,
  recommendation,
  validateCommonForm,
  calculateBMI,
  calculateBMR,
  calculateBodyFat,
  calculateMacros,
  getWorkoutRecommendation,
} = useHealthForm();
```

### API Layer

All backend communication goes through [`services/healthApi.ts`](frontend/src/services/healthApi.ts:1):

```typescript
import { calculateBMI, calculateBMR, calculateBodyFat, calculateMacros, getWorkoutRecommendation } from '@/services/healthApi';
```

The API base URL is configured via Vite environment variable `VITE_API_BASE_URL` (default: `http://localhost:8000`).

### Types

All TypeScript interfaces are defined in [`types/health.ts`](frontend/src/types/health.ts:1):

- `HealthData` - Main form data structure
- `BMIResponse`, `BMRResponse`, `BodyFatResponse`, `MacrosResponse`, `WorkoutRecommendation`
- `CalculatorState<T>` - Generic state wrapper for calculator results
- `CommonFormValues`, `BodyFatMeasurements`, `MacrosValues`

### Theme

The theme configuration in [`theme.ts`](frontend/src/theme.ts:1) uses factory functions to generate light/dark themes:

```typescript
export const createLightTheme = () => createComponentOverrides(lightColors);
export const createDarkTheme = () => createComponentOverrides(darkColors);
```

This eliminates code duplication and makes theme customization easier.

## Running the Development Server

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Building for Production

```bash
npm run build
```

Output goes to `frontend/dist/`.

## Environment Variables

Create a `.env` file in the `frontend/` directory (optional):

```env
VITE_API_BASE_URL=http://localhost:8000
```

If not set, defaults to `http://localhost:8000`.

## Notes

- The `vite-env.d.ts` file is required for TypeScript to recognize `import.meta.env`. Do not delete it.
- The `DRAWER_WIDTH` constant is defined in `Sidebar.tsx` and used in `Layout.tsx`.
- All calculator components are independent; they read from the shared form state via `useHealthForm`.
