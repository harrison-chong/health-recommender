import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#f50057',
    },
    text: {
      primary: '#1a1a1a',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
          borderRadius: 24,
          backgroundColor: '#fafafa',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiFilledInput-root': {
            backgroundColor: 'white',
            borderRadius: 12,
            '&:hover': {
              borderColor: '#000',
            },
            '&.Mui-focused': {
              borderColor: '#000',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#000',
              },
            },
          },
          '& .MuiInputLabel-root': {
            color: '#555',
            '&.Mui-focused': {
              color: '#000',
            },
          },
          '& .MuiInputBase-input': {
            color: '#1a1a1a',
            '&::placeholder': {
              color: '#999',
              opacity: 1,
            },
          },
          // Global number input styling to hide spinners
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
        select: {
          '&:focus': {
            backgroundColor: 'white',
          },
        },
        icon: {
          color: '#555',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },
  },
});

export default theme;