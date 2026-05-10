import { useState, useCallback, useEffect } from 'react'
import { Box, Container, Typography, Fade, Chip, Stack } from '@mui/material'
import type { WeatherData, ForecastItem } from './utils/types'
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchWeatherByCoords,
  getConditionFromIcon,
  getBgGradient,
  isDayTime,
} from './utils/weatherApi'

import Header from './components/Header'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import WeatherDetails from './components/WeatherDetails'
import ForecastCard from './components/ForecastCard'
import LoadingState from './components/LoadingState'
import ErrorState from './components/ErrorState'

const POPULAR = ['Stockholm', 'Hyderabad', 'London', 'New York', 'Paris']

export default function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastCity, setLastCity] = useState('')

  const handleSearch = useCallback(async (city: string) => {
    setLoading(true)
    setError(null)
    setLastCity(city)
    try {
      const [w, f] = await Promise.all([fetchCurrentWeather(city), fetchForecast(city)])
      setWeather(w)
      setForecast(f)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
      setWeather(null)
      setForecast([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }
    setLoading(true)
    setError(null)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const city = await fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude)
          await handleSearch(city)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Could not get location weather.')
          setLoading(false)
        }
      },
      () => {
        setError('Location access denied. Please search manually.')
        setLoading(false)
      }
    )
  }, [handleSearch])

  // Load Stockholm on first mount as a demo
  useEffect(() => {
    handleSearch('Stockholm')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const bgGradient = weather
    ? getBgGradient(getConditionFromIcon(weather.icon), isDayTime(weather.sunrise, weather.sunset, weather.dt))
    : 'linear-gradient(135deg, #0d1b2a 0%, #1a2744 60%, #0d2137 100%)'

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: bgGradient,
        transition: 'background 1.2s ease',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.3)',
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      {/* Ambient glow orbs */}
      <Box sx={{
        position: 'fixed', top: '10%', left: '-5%',
        width: 350, height: 350, borderRadius: '50%',
        background: 'rgba(79,195,247,0.07)', filter: 'blur(90px)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'floatOrb 9s ease-in-out infinite',
        '@keyframes floatOrb': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-25px)' } },
      }} />
      <Box sx={{
        position: 'fixed', bottom: '5%', right: '-5%',
        width: 280, height: 280, borderRadius: '50%',
        background: 'rgba(255,138,101,0.06)', filter: 'blur(80px)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'floatOrb 11s ease-in-out infinite reverse',
      }} />

      {/* Page content */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Header />

        <Container maxWidth="md" sx={{ py: { xs: 3, sm: 5 }, px: { xs: 2, sm: 3 } }}>

          {/* Hero heading */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              sx={{ color: '#fff', fontWeight: 800, mb: 0.5, fontSize: { xs: '1.6rem', sm: '2rem' }, fontFamily: '"Sora",sans-serif' }}
            >
              What's the weather like?
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)', mb: 3 }}>
              Search a city or use your location
            </Typography>

            <SearchBar onSearch={handleSearch} onLocate={handleLocate} loading={loading} />

            {/* Popular city chips */}
            <Stack direction="row" flexWrap="wrap" sx={{ mt: 2.5, gap: '16px', justifyContent: "center" }}>
              {POPULAR.map((city) => (
                <Chip
                  key={city}
                  label={city}
                  size="small"
                  onClick={() => !loading && handleSearch(city)}
                  disabled={loading}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.78rem',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'rgba(79,195,247,0.15)',
                      borderColor: 'rgba(79,195,247,0.35)',
                      color: '#4fc3f7',
                      transform: 'translateY(-2px)',
                    },
                    '&.Mui-disabled': { opacity: 0.35 },
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Loading */}
          {loading && <LoadingState />}

          {/* Error */}
          {!loading && error && (
            <Fade in>
              <Box>
                <ErrorState message={error} onRetry={() => lastCity && handleSearch(lastCity)} />
              </Box>
            </Fade>
          )}

          {/* Results */}
          {!loading && !error && weather && (
            <Fade in timeout={600}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <WeatherCard data={weather} />
                <WeatherDetails data={weather} />
                {forecast.length > 0 && <ForecastCard forecast={forecast} />}
              </Box>
            </Fade>
          )}

        </Container>
      </Box>
    </Box>
  )
}
