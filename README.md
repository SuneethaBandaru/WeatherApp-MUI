# WeatherApp 🌤️

A responsive weather app built with **React + TypeScript + MUI (Material UI)**.

## Features

- 🔍 **Search any city** to get real-time weather
- 📍 **Use your location** via Geolocation API
- 🌡️ Current temperature, feels like, description
- 💧 Humidity, wind speed & direction, visibility, pressure
- 🌅 Sunrise & sunset times
- 📅 5-day forecast with rain probability
- 🌙 Dynamic background that changes based on weather condition + time of day
- ✅ Fully responsive — works on mobile, tablet, desktop

## Folder Structure
src/
├── components/
│   ├── Header/         — App bar with logo
│   ├── SearchBar/      — Search input + locate button
│   ├── WeatherCard/    — Main current weather display
│   ├── WeatherDetails/ — Stat grid (humidity, wind, etc.)
│   ├── ForecastCard/   — 5-day forecast row
│   ├── LoadingState/   — Spinner while fetching
│   └── ErrorState/     — Error with retry button
├── utils/
│   ├── types.ts        — TypeScript interfaces
│   └── weatherApi.ts   — API calls + helper functions
├── App.tsx             — Root component with useState/useEffect
├── main.tsx            — MUI ThemeProvider entry
├── theme.ts            — MUI theme config
└── index.css           — Global resets

## Getting Started
npm install
npm run dev

App runs at `http://localhost:5173`

Git repo link : https://github.com/SuneethaBandaru/WeatherApp-MUI.git

Vercel live link : 


## API

Uses [OpenWeatherMap](https://openweathermap.org/) free tier.  
A demo API key is included. For production, replace it with your own key from [openweathermap.org/api](https://openweathermap.org/api).

npm create vite@latest WeatherApp

✔ Select a framework: › React
✔ Select a variant: › TypeScript
cd app2-weather
npm install
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
