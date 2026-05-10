import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'

export default function Header() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: 'transparent',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'center', py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <WbSunnyRoundedIcon
            sx={{
              color: '#ffd166',
              fontSize: 35,
              filter: 'drop-shadow(0 0 8px rgba(255,209,102,0.7))',
            }}
          />
          <Typography
            variant="h5"
            sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}
          >
            Weather
            <Box component="span" sx={{ color: '#4fc3f7' }}>App</Box>
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
