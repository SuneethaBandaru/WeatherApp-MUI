import { Grid, Box, Typography } from '@mui/material'
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded'
import AirRoundedIcon from '@mui/icons-material/AirRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded'
import WbTwilightRoundedIcon from '@mui/icons-material/WbTwilightRounded'
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded'
import type { WeatherData } from '../../utils/types'
import { degToCompass, formatLocalTime } from '../../utils/weatherApi'

interface StatProps {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
  color: string
}

function StatCard({ icon, label, value, sub, color }: StatProps) {
  return (
    <Box
      sx={{
        bgcolor: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
        borderRadius: 3,
        border: '1px solid rgba(255,255,255,0.09)',
        p: { xs: 2, sm: 2.5 },
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.11)',
          transform: 'translateY(-3px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Box sx={{ color, p: 0.6, borderRadius: 1.5, bgcolor: `${color}25`, display: 'flex' }}>
          {icon}
        </Box>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.07em', fontSize: '0.68rem' }}>
          {label}
        </Typography>
      </Box>
      <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: '1rem', sm: '1.15rem' } }}>
        {value}
      </Typography>
      {sub && (
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>
          {sub}
        </Typography>
      )}
    </Box>
  )
}

interface Props {
  data: WeatherData
}

export default function WeatherDetails({ data }: Props) {
  const stats: StatProps[] = [
    {
      icon: <WaterDropRoundedIcon fontSize="small" />,
      label: 'Humidity',
      value: `${data.humidity}%`,
      sub: data.humidity > 70 ? 'High' : data.humidity < 30 ? 'Low' : 'Comfortable',
      color: '#4fc3f7',
    },
    {
      icon: <AirRoundedIcon fontSize="small" />,
      label: 'Wind',
      value: `${data.windSpeed} km/h`,
      sub: `Direction: ${degToCompass(data.windDirection)}`,
      color: '#81d4fa',
    },
    {
      icon: <VisibilityRoundedIcon fontSize="small" />,
      label: 'Visibility',
      value: `${data.visibility} km`,
      sub: data.visibility >= 10 ? 'Clear' : data.visibility >= 4 ? 'Moderate' : 'Poor',
      color: '#b39ddb',
    },
    {
      icon: <SpeedRoundedIcon fontSize="small" />,
      label: 'Pressure',
      value: `${data.pressure} hPa`,
      sub: data.pressure >= 1013 ? 'High pressure' : 'Low pressure',
      color: '#f48fb1',
    },
    {
      icon: <WbTwilightRoundedIcon fontSize="small" />,
      label: 'Sunrise',
      value: formatLocalTime(data.sunrise, data.timezone),
      color: '#ffd166',
    },
    {
      icon: <NightsStayRoundedIcon fontSize="small" />,
      label: 'Sunset',
      value: formatLocalTime(data.sunset, data.timezone),
      color: '#ff8a65',
    },
  ]

  return (
    <Box>
      <Typography
        variant="caption"
        sx={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, display: 'block', mb: 2 }}
      >
        Today's Details
      </Typography>
      <Grid container spacing={2}>
        {stats.map((s) => (
          <Grid item xs={6} sm={4} key={s.label}>
            <StatCard {...s} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
