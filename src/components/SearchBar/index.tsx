import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Box, TextField, IconButton, InputAdornment } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import MyLocationRoundedIcon from '@mui/icons-material/MyLocationRounded'

interface Props {
  onSearch: (city: string) => void
  onLocate: () => void
  loading: boolean
}

export default function SearchBar({ onSearch, onLocate, loading }: Props) {
  const [query, setQuery] = useState('')

  const submit = () => {
    const t = query.trim()
    if (t) onSearch(t)
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit()
  }

  return (
    <Box sx={{ display: 'flex', gap: 1.5, width: '100%', maxWidth: 560, mx: 'auto' }}>
      {/* Text input */}
      <TextField
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Search for a city..."
        disabled={loading}
        size="medium"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Search button */}
      <IconButton
        onClick={submit}
        disabled={loading || !query.trim()}
        sx={{
          bgcolor: '#4fc3f7',
          color: '#000',
          width: 54,
          height: 54,
          borderRadius: '50%',
          flexShrink: 0,
          '&:hover': { bgcolor: '#81d4fa', transform: 'scale(1.05)' },
          '&.Mui-disabled': { bgcolor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' },
          transition: 'all 0.2s',
        }}
      >
        <SearchRoundedIcon />
      </IconButton>

      {/* Locate button */}
      <IconButton
        onClick={onLocate}
        disabled={loading}
        title="Use my location"
        sx={{
          bgcolor: 'rgba(255,255,255,0.1)',
          color: '#fff',
          width: 54,
          height: 54,
          borderRadius: '50%',
          flexShrink: 0,
          border: '1px solid rgba(255,255,255,0.15)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.2)', transform: 'scale(1.05)' },
          '&.Mui-disabled': { opacity: 0.4 },
          transition: 'all 0.2s',
        }}
      >
        <MyLocationRoundedIcon />
      </IconButton>
    </Box>
  )
}
