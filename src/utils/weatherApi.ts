import type { WeatherData, ForecastItem, WeatherCondition } from './types'

const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'
const BASE = 'https://api.openweathermap.org/data/2.5'

export async function fetchCurrentWeather(city: string): Promise<WeatherData> {
  const res = await fetch(
    `${BASE}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  )
  if (!res.ok) {
    if (res.status === 404) throw new Error('City not found. Please check the spelling and try again.')
    throw new Error('Failed to fetch weather. Please try again.')
  }
 
  const d: any = await res.json()
  return {
    city: d.name,
    country: d.sys.country,
    temperature: Math.round(d.main.temp),
    feelsLike: Math.round(d.main.feels_like),
    humidity: d.main.humidity,
    windSpeed: Math.round(d.wind.speed * 3.6),
    windDirection: d.wind.deg ?? 0,
    description: d.weather[0].description,
    icon: d.weather[0].icon,
    visibility: Math.round((d.visibility ?? 0) / 1000),
    pressure: d.main.pressure,
    sunrise: d.sys.sunrise,
    sunset: d.sys.sunset,
    timezone: d.timezone,
    dt: d.dt,
  }
}

export async function fetchForecast(city: string): Promise<ForecastItem[]> {
  const res = await fetch(
    `${BASE}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  )
  if (!res.ok) throw new Error('Failed to fetch forecast.')
  
  const d: any = await res.json()

  const days: Record<string, ForecastItem> = {}
  
  d.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000)
    const key = date.toISOString().split('T')[0]
    const hour = date.getHours()
    const existing = days[key]
    if (!existing || Math.abs(hour - 12) < Math.abs(new Date(existing.dt * 1000).getHours() - 12)) {
      days[key] = {
        dt: item.dt,
        tempMax: Math.round(item.main.temp_max),
        tempMin: Math.round(item.main.temp_min),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        windSpeed: Math.round(item.wind.speed * 3.6),
        pop: Math.round((item.pop ?? 0) * 100),
      }
    }
  })
  return Object.values(days).slice(1, 6)
}

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<string> {
  const res = await fetch(
    `${BASE}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
  if (!res.ok) throw new Error('Could not get weather for your location.')
  
  const d: any = await res.json()
  return d.name as string
}

export function getConditionFromIcon(icon: string): WeatherCondition {
  const prefix = icon.slice(0, 2)
  if (prefix === '01') return 'clear'
  if (['02', '03', '04'].includes(prefix)) return 'clouds'
  if (prefix === '09') return 'drizzle'
  if (prefix === '10') return 'rain'
  if (prefix === '11') return 'thunderstorm'
  if (prefix === '13') return 'snow'
  if (prefix === '50') return 'mist'
  return 'default'
}

export function getBgGradient(condition: WeatherCondition, dayTime: boolean): string {
  if (!dayTime) return 'linear-gradient(135deg, #0f0c29 0%, #1a1a4e 60%, #24243e 100%)'
  const map: Record<WeatherCondition, string> = {
    clear:        'linear-gradient(135deg, #1565c0 0%, #1e88e5 50%, #42a5f5 100%)',
    clouds:       'linear-gradient(135deg, #37474f 0%, #607d8b 50%, #90a4ae 100%)',
    rain:         'linear-gradient(135deg, #1c2b3a 0%, #2e4a62 50%, #4a7096 100%)',
    drizzle:      'linear-gradient(135deg, #2c3e50 0%, #3d6b8e 100%)',
    thunderstorm: 'linear-gradient(135deg, #0d0d1a 0%, #1a1a3e 60%, #2c2c5a 100%)',
    snow:         'linear-gradient(135deg, #78909c 0%, #b0bec5 50%, #e0f7fa 100%)',
    mist:         'linear-gradient(135deg, #546e7a 0%, #78909c 50%, #b0bec5 100%)',
    default:      'linear-gradient(135deg, #1565c0 0%, #1e88e5 50%, #42a5f5 100%)',
  }
  return map[condition]
}

export function isDayTime(sunrise: number, sunset: number, dt: number): boolean {
  return dt >= sunrise && dt <= sunset
}

export function formatLocalTime(unix: number, timezone: number): string {
  const d = new Date((unix + timezone) * 1000)
  const h = d.getUTCHours().toString().padStart(2, '0')
  const m = d.getUTCMinutes().toString().padStart(2, '0')
  return `${h}:${m}`
}

export function formatWeekday(unix: number): string {
  return new Date(unix * 1000).toLocaleDateString('en-US', { weekday: 'short' })
}

export function degToCompass(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return dirs[Math.round(deg / 45) % 8]
}
