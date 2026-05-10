import { Box, Typography, Chip } from '@mui/material'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import type { WeatherData } from '../../utils/types'
import { getConditionFromIcon, getBgGradient, isDayTime } from '../../utils/weatherApi'

interface Props {
  data: WeatherData
}

export default function WeatherCard({ data }: Props) {
  const condition = getConditionFromIcon(data.icon)
  const dayTime = isDayTime(data.sunrise, data.sunset, data.dt)
  const gradient = getBgGradient(condition, dayTime)

  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Box
      sx={{
        borderRadius: 4,
        background: gradient,
        p: { xs: 3, sm: 4 },
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.12)',
        transition: 'background 0.8s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -80,
          right: -80,
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.07)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Location + Date row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LocationOnRoundedIcon sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 20 }} />
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: '1rem', sm: '1.15rem' } }}>
            {data.city},&nbsp;
            <Box component="span" sx={{ color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>
              {data.country}
            </Box>
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', alignSelf: 'center' }}>
          {dateStr}
        </Typography>
      </Box>

      {/* Temp + Icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        <Box>
          <Typography
            sx={{
              fontSize: { xs: '5rem', sm: '6.5rem' },
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1,
              fontFamily: '"Sora", sans-serif',
              textShadow: '0 4px 24px rgba(0,0,0,0.25)',
            }}
          >
            {data.temperature}°
            <Box component="span" sx={{ fontSize: '2rem', fontWeight: 500, opacity: 0.65 }}>C</Box>
          </Typography>

          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mt: 0.5, textTransform: 'capitalize' }}>
            {data.description}
          </Typography>

          <Chip
            label={`Feels like ${data.feelsLike}°C`}
            size="small"
            sx={{
              mt: 1.5,
              bgcolor: 'rgba(255,255,255,0.15)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              fontWeight: 600,
              fontSize: '0.8rem',
            }}
          />
        </Box>

        <Box
          component="img"
          src={`https://openweathermap.org/img/wn/${data.icon}@4x.png`}
          alt={data.description}
          sx={{
            width: { xs: 100, sm: 130 },
            height: { xs: 100, sm: 130 },
            filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.3))',
            animation: 'floatIcon 5s ease-in-out infinite',
            '@keyframes floatIcon': {
              '0%,100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-10px)' },
            },
          }}
        />
      </Box>

      <Chip
        label={dayTime ? '☀️ Daytime' : '🌙 Night'}
        size="small"
        sx={{
          bgcolor: 'rgba(0,0,0,0.2)',
          color: 'rgba(255,255,255,0.8)',
          border: '1px solid rgba(255,255,255,0.12)',
          fontWeight: 600,
        }}
      />
    </Box>
  )
}
