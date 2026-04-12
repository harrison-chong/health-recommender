import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for React + TypeScript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/bmi': 'http://localhost:8000',
      '/bmr': 'http://localhost:8000',
      '/bodyfat': 'http://localhost:8000',
      '/macros': 'http://localhost:8000',
      '/workout': 'http://localhost:8000',
      '/diet': 'http://localhost:8000',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          router: ['react-router-dom']
        }
      }
    }
  }
});
