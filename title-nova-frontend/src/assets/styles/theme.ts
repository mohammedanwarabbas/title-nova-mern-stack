// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffd166',
      light: '#ffdc85',
      dark: '#e6bc5c'
    },
    secondary: {
      main: '#ef476f',
      light: '#f26c8c',
      dark: '#d63f63'
    },
    background: {
      default: '#1a1c24',
      paper: '#232734'
    },
    text: {
      primary: '#f0f0f0',
      secondary: '#a0a0a0'
    }
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
      background: 'linear-gradient(45deg, #ffd166 30%, #ef476f 90%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h6: {
      fontWeight: 400,
      opacity: 0.8
    }
  },
  shape: {
    borderRadius: 16
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          padding: '10px 24px'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(35, 39, 52, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 209, 102, 0.3)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffd166',
            },
          },
        }
      }
    }
  }
});

export default theme;
