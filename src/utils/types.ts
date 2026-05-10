export interface WeatherData {
  city: string
  country: string
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  windDirection: number
  description: string
  icon: string
  visibility: number
  pressure: number
  sunrise: number
  sunset: number
  timezone: number
  dt: number
}

export interface ForecastItem {
  dt: number
  tempMax: number
  tempMin: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
  pop: number
}

export type WeatherCondition =
  | 'clear'
  | 'clouds'
  | 'rain'
  | 'drizzle'
  | 'thunderstorm'
  | 'snow'
  | 'mist'
  | 'default'
