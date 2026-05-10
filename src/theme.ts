import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4fc3f7',
      light: '#8bf6ff',
      dark: '#0093c4',
      contrastText: '#000000',
    },
    secondary: {
      main: '#ff8a65',
      light: '#ffbb93',
      dark: '#c75b39',
      contrastText: '#000000',
    },
    background: {
      default: '#0d1b2a',
      paper: 'rgba(255,255,255,0.07)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.65)',
    },
    error: {
      main: '#ff5252',
    },
  },
  typography: {
    fontFamily: '"Nunito", "Sora", sans-serif',
    h1: { fontFamily: '"Sora", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Sora", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Sora", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Sora", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Sora", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Sora", sans-serif', fontWeight: 600 },
    body1: { fontFamily: '"Nunito", sans-serif' },
    body2: { fontFamily: '"Nunito", sans-serif' },
    caption: { fontFamily: '"Nunito", sans-serif', fontWeight: 600 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '50px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
            '&.Mui-focused fieldset': { borderColor: '#4fc3f7' },
          },
          '& .MuiInputBase-input': {
            color: '#ffffff',
            '&::placeholder': { color: 'rgba(255,255,255,0.45)', opacity: 1 },
          },
          '& .MuiInputAdornment-root .MuiSvgIcon-root': {
            color: 'rgba(255,255,255,0.5)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          textTransform: 'none',
          fontFamily: '"Nunito", sans-serif',
          fontWeight: 700,
          fontSize: '1rem',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: '"Nunito", sans-serif', fontWeight: 600 },
      },
    },
  },
})

export default theme
