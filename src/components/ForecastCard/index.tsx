import { Box, Typography, Stack } from '@mui/material'
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded'
import type { ForecastItem } from '../../utils/types'
import { formatWeekday } from '../../utils/weatherApi'

interface Props {
  forecast: ForecastItem[]
}

export default function ForecastCard({ forecast }: Props) {
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, display: 'block', mb: 2 }}
      >
        5-Day Forecast
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
        {forecast.map((item, idx) => (
          <Box
            key={item.dt}
            sx={{
              flex: 1,
              bgcolor: idx === 0 ? 'rgba(79,195,247,0.1)' : 'rgba(255,255,255,0.07)',
              border: idx === 0 ? '1px solid rgba(79,195,247,0.3)' : '1px solid rgba(255,255,255,0.09)',
              backdropFilter: 'blur(20px)',
              borderRadius: 3,
              p: 2,
              display: 'flex',
              flexDirection: { xs: 'row', sm: 'column' },
              alignItems: 'center',
              justifyContent: { xs: 'space-between', sm: 'center' },
              gap: { xs: 2, sm: 1 },
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.11)',
                transform: 'translateY(-3px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              },
            }}
          >
            {/* Day */}
            <Typography
              variant="caption"
              sx={{
                color: idx === 0 ? '#4fc3f7' : 'rgba(255,255,255,0.55)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                fontSize: '0.7rem',
                minWidth: { xs: 36, sm: 'auto' },
              }}
            >
              {idx === 0 ? 'Tmrw' : formatWeekday(item.dt)}
            </Typography>

            {/* Icon */}
            <Box
              component="img"
              src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
              alt={item.description}
              sx={{ width: 48, height: 48, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))' }}
            />

            {/* Temps */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontFamily: '"Sora",sans-serif', fontSize: '0.95rem' }}>
                {item.tempMax}°
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                {item.tempMin}°
              </Typography>
            </Box>

            {/* Rain chance */}
            {item.pop > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                <WaterDropRoundedIcon sx={{ color: '#4fc3f7', fontSize: 13 }} />
                <Typography sx={{ color: '#4fc3f7', fontSize: '0.72rem', fontWeight: 700 }}>
                  {item.pop}%
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
