import { Box, CircularProgress, Typography } from '@mui/material'

export default function LoadingState() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10, gap: 3 }}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          size={72}
          thickness={2}
          sx={{ color: '#4fc3f7', '& .MuiCircularProgress-circle': { strokeLinecap: 'round' } }}
        />
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>
          🌤️
        </Box>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 0.5 }}>
          Fetching weather…
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)' }}>
          Getting the latest conditions for you
        </Typography>
      </Box>
    </Box>
  )
}
