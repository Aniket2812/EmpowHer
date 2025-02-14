import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF4D8D', // Bright pink
      light: '#FF80AB',
      dark: '#C51162',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FF80AB', // Light pink
      light: '#FFB2CC',
      dark: '#C94F7C',
      contrastText: '#fff',
    },
    background: {
      default: '#FFF5F8', // Very light pink
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem',
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.2,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '10px 24px',
          fontSize: '1rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(255, 77, 141, 0.2)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #FF4D8D 30%, #FF80AB 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #FF4D8D 40%, #FF80AB 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(255, 77, 141, 0.1)',
          },
        },
      },
    },
  },
});

export default theme;
