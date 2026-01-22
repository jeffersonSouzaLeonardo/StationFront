import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Station Admin
        </Typography>
        <IconButton color="inherit" component={Link} to="/fuel" aria-label="fuel">
          <LocalGasStationIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
