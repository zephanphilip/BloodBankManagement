import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#b71c1c', // Blood red
    },
    secondary: {
      main: '#ffffff', // White
    },
  },
  typography: {
    h6: {
      fontWeight: 600,
    },
  },
})

function Navbar() {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Toolbar>
        <img
  src="https://images.unsplash.com/photo-1638272467190-4ff6f773315c?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  alt="Logo"
  style={{
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: '50%', // Makes the image round
    objectFit: 'cover', // Ensures the image covers the container without distortion
  }}
/>

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'secondary.main' }}
          >
            BloodBank
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user ? (
              <>
                <Typography
                  variant="body1"
                  sx={{ display: 'inline', marginRight: 5, color: 'secondary.main' }}
                >
                  {user.email}
                </Typography>
                <Button color="secondary" onClick={handleClick}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="secondary" component={Link} to="/login">
                  Login
                </Button>
                <Button color="secondary" component={Link} to="/signup">
                  Signup
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default Navbar
