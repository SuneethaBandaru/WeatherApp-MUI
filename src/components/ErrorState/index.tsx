import { Box, Typography, Button } from '@mui/material'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'

interface Props {
  message: string
  onRetry?: () => void
}

export default function ErrorState({ message, onRetry }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 6,
        px: 3,
        gap: 2,
        bgcolor: 'rgba(255,82,82,0.07)',
        borderRadius: 4,
        border: '1px solid rgba(255,82,82,0.2)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <ErrorOutlineRoundedIcon sx={{ color: '#ff5252', fontSize: 48, filter: 'drop-shadow(0 0 10px rgba(255,82,82,0.4))' }} />
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 0.5 }}>
          Something went wrong
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', maxWidth: 320 }}>
          {message}
        </Typography>
      </Box>
      {onRetry && (
        <Button
          variant="outlined"
          startIcon={<RefreshRoundedIcon />}
          onClick={onRetry}
          sx={{
            mt: 1,
            borderColor: 'rgba(255,82,82,0.4)',
            color: '#ff5252',
            borderRadius: '50px',
            '&:hover': { borderColor: '#ff5252', bgcolor: 'rgba(255,82,82,0.1)' },
          }}
        >
          Try Again
        </Button>
      )}
    </Box>
  )
}
